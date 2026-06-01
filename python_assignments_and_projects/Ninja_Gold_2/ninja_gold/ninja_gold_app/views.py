import random
from datetime import datetime
from django.shortcuts import render, redirect


# Gold ranges for each location
LOCATIONS = {
    'farm':  {'min': 10, 'max': 20, 'type': 'earn'},
    'cave':  {'min': 10, 'max': 20, 'type': 'earn'},
    'house': {'min': 10, 'max': 20, 'type': 'earn'},
    'quest': {'min': 0,  'max': 50, 'type': 'random'},  # can earn OR lose
}


def index(request):
    """Root route: initialize session if needed, then render the main page."""

    # Initialize gold if first visit
    if 'gold' not in request.session:
        request.session['gold'] = 0

    # Initialize activity log if first visit
    if 'activities' not in request.session:
        request.session['activities'] = []

    # SENSEI BONUS: initialize win conditions if set
    win_conditions = {
        'goal':       request.session.get('goal', None),
        'max_moves':  request.session.get('max_moves', None),
        'moves_used': request.session.get('moves_used', 0),
    }

    context = {
        'gold':           request.session['gold'],
        'activities':     request.session['activities'],
        'win_conditions': win_conditions,
        'game_over':      request.session.get('game_over', False),
        'game_result':    request.session.get('game_result', None),
    }
    return render(request, 'ninja_gold_app/index.html', context)


def process_money(request):
    """
    POST route: receives the location from a hidden input,
    calculates gold earned/lost, updates session, redirects to /.
    """
    if request.method == 'POST':
        location = request.POST.get('location', '').lower()

        if location not in LOCATIONS:
            return redirect('index')

        loc = LOCATIONS[location]
        amount = random.randint(loc['min'], loc['max'])

        # Quest: 50/50 chance to earn or lose
        if loc['type'] == 'random':
            if random.random() < 0.5:
                # Earned
                request.session['gold'] += amount
                msg = f"You completed a quest and earned {amount} gold."
                color = 'green'
            else:
                # Lost
                request.session['gold'] -= amount
                msg = f"You failed a quest and lost {amount} gold. Ouch."
                color = 'red'
        else:
            request.session['gold'] += amount
            msg = f"You entered a {location} and earned {amount} gold."
            color = 'green'

        # Add timestamp to activity log
        timestamp = datetime.now().strftime("%B %d %Y %I:%M %p")
        activity = {'message': msg, 'color': color, 'time': timestamp}

        # Django requires explicit reassignment to detect session changes on lists
        activities = request.session.get('activities', [])
        activities.insert(0, activity)   # newest at top
        request.session['activities'] = activities

        # Track moves for SENSEI BONUS
        request.session['moves_used'] = request.session.get('moves_used', 0) + 1

        # SENSEI BONUS: check win/lose conditions
        _check_win_conditions(request)

    return redirect('index')


def process_money_url(request, location):
    """
    NINJA BONUS: Location passed in URL instead of hidden form field.
    GET /process_money/<location>
    """
    location = location.lower()
    if location not in LOCATIONS:
        return redirect('index')

    # Reuse logic by faking a POST
    request.method = 'POST'
    request.POST = request.POST.copy()
    request.POST['location'] = location
    return process_money(request)


def set_win_conditions(request):
    """SENSEI BONUS: User sets goal gold and max moves before starting."""
    if request.method == 'POST':
        try:
            goal = int(request.POST.get('goal', 100))
            max_moves = int(request.POST.get('max_moves', 10))
            request.session['goal'] = goal
            request.session['max_moves'] = max_moves
            request.session['moves_used'] = 0
            request.session['gold'] = 0
            request.session['activities'] = []
            request.session['game_over'] = False
            request.session['game_result'] = None
        except ValueError:
            pass
    return redirect('index')


def reset(request):
    """Clear the session and start fresh."""
    request.session.flush()
    return redirect('index')


# ── Helper ────────────────────────────────────────────────────────────────────

def _check_win_conditions(request):
    """SENSEI BONUS: Check if the player has won or lost."""
    goal = request.session.get('goal')
    max_moves = request.session.get('max_moves')
    moves_used = request.session.get('moves_used', 0)
    gold = request.session.get('gold', 0)

    if goal is None or max_moves is None:
        return  # No win conditions set

    if gold >= goal:
        request.session['game_over'] = True
        request.session['game_result'] = 'win'
    elif moves_used >= max_moves:
        request.session['game_over'] = True
        request.session['game_result'] = 'lose'
