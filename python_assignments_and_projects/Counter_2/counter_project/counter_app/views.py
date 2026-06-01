from django.shortcuts import render, redirect


def index(request):
    # Check if 'counter' key exists in session
    if 'counter' not in request.session:
        request.session['counter'] = 0  # Initialize session

    # Check if 'visits' key exists in session (SENSEI BONUS: track page visits separately)
    if 'visits' not in request.session:
        request.session['visits'] = 0

    # Increment counter and visits on each page load
    request.session['counter'] += 1
    request.session['visits'] += 1

    context = {
        'counter': request.session['counter'],
        'visits': request.session['visits'],
    }
    return render(request, 'counter_app/index.html', context)


def destroy_session(request):
    # Clear the entire session
    request.session.flush()
    return redirect('index')


def increment_by_two(request):
    # NINJA BONUS: Increment counter by 2
    if 'counter' not in request.session:
        request.session['counter'] = 0
    request.session['counter'] += 2
    return redirect('index')


def custom_increment(request):
    # SENSEI BONUS: Increment by user-specified amount
    if request.method == 'POST':
        try:
            amount = int(request.POST.get('amount', 1))
            if 'counter' not in request.session:
                request.session['counter'] = 0
            request.session['counter'] += amount
        except ValueError:
            pass  # Ignore invalid input
    return redirect('index')
