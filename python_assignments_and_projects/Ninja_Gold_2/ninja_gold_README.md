# ⚔️ Django Ninja Gold

A Django mini-game where a ninja earns (or loses!) gold by visiting different locations. Built to practice Django sessions, forms, and POST route handling.

---

## 📋 Assignment Objectives

- Practice **passing data to a template**
- Practice **using forms** with hidden inputs
- Practice **using the Django session**

---

## 🎮 How to Play

Your ninja starts with **0 gold**. Visit locations by clicking "Find Gold!":

| Location | Gold Range | Notes |
|---|---|---|
| 🌾 Farm | +10 to +20 | Always earns |
| 🗻 Cave | +10 to +20 | Always earns |
| 🏠 House | +10 to +20 | Always earns |
| ⚔️ Quest | ±0 to ±50 | 50/50 earn or lose! |

Each visit logs an activity with a timestamp. Gold and activities persist in your session until you reset.

---

## ✨ Features

| Feature | Route | Method |
|---|---|---|
| Main game page | `/` | GET |
| Process a location visit | `/process_money` | POST |
| **Ninja Bonus**: location in URL | `/process_money/<location>` | GET |
| **Sensei Bonus**: set win conditions | `/set_win_conditions` | POST |
| Reset game | `/reset` | GET |

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/your-username/ninja-gold.git
cd ninja-gold

# 2. Create and activate virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# 3. Install Django
pip install django

# 4. Run migrations (required for session storage)
python manage.py migrate

# 5. Start the server
python manage.py runserver
```

Visit `http://localhost:8000/` to start playing!

---

## 📁 Project Structure

```
ninja_gold/
│
├── manage.py
│
├── ninja_gold/                  # Project config
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
└── ninja_gold_app/              # Game app
    ├── views.py                 # All game logic
    ├── urls.py                  # URL patterns
    └── templates/
        └── ninja_gold_app/
            └── index.html       # Main game template
```

---

## 🧠 How It Works — Step-by-Step Explanation

### Step 1 — Session initialization in `index()`

```python
def index(request):
    if 'gold' not in request.session:
        request.session['gold'] = 0

    if 'activities' not in request.session:
        request.session['activities'] = []
```

Every time the page loads, we check if session keys exist. If they don't (first visit or after reset), we initialize them. This is the same pattern from the Counter assignment — **always check before using**.

---

### Step 2 — Four location forms with hidden inputs

Each card on the page is its own `<form>` that POSTs to `/process_money`:

```html
<form method="POST" action="/process_money">
    {% csrf_token %}
    <input type="hidden" name="location" value="farm">
    <button type="submit">Find Gold!</button>
</form>
```

The key is the **hidden input** — it sends the location name to the server invisibly. The user only sees the button; the server receives `location=farm` in `request.POST`.

---

### Step 3 — `process_money` view calculates gold

```python
LOCATIONS = {
    'farm':  {'min': 10, 'max': 20, 'type': 'earn'},
    'cave':  {'min': 10, 'max': 20, 'type': 'earn'},
    'house': {'min': 10, 'max': 20, 'type': 'earn'},
    'quest': {'min': 0,  'max': 50, 'type': 'random'},
}

def process_money(request):
    location = request.POST.get('location')
    loc = LOCATIONS[location]
    amount = random.randint(loc['min'], loc['max'])

    if loc['type'] == 'random':
        if random.random() < 0.5:
            request.session['gold'] += amount   # Earned quest
        else:
            request.session['gold'] -= amount   # Failed quest
    else:
        request.session['gold'] += amount       # Farm/Cave/House always earn
```

`random.randint(10, 20)` picks a number between 10 and 20 inclusive.
`random.random()` returns a float between 0.0 and 1.0 — less than 0.5 means 50% chance.

---

### Step 4 — Activity log stored in session

```python
activities = request.session.get('activities', [])
activities.insert(0, {'message': msg, 'color': color, 'time': timestamp})
request.session['activities'] = activities  # ← REQUIRED reassignment!
```

**Critical Django detail:** When you mutate a list or dict that's already in the session, Django doesn't automatically detect the change. You must reassign it (`request.session['activities'] = activities`) to tell Django the session has been modified and needs saving.

---

### Step 5 — Post-Redirect-Get pattern

```python
return redirect('index')   # After processing, always redirect
```

After every POST to `/process_money`, the view redirects to `/` (GET). This prevents re-submitting the form if the user refreshes the page.

---

### Ninja Bonus — Location in URL instead of hidden field

```python
# urls.py
path('process_money/<str:location>', views.process_money_url, name='process_money_url'),

# views.py
def process_money_url(request, location):
    # GET /process_money/farm  →  same as POST with location=farm
```

Instead of a form POST, the location is part of the URL itself. Django captures `<str:location>` and passes it directly as a function argument.

---

### Sensei Bonus — Win conditions

The player optionally sets a **gold goal** and **max moves** before starting. After each move, the game checks:

```python
if gold >= goal:
    game_over, result = True, 'win'
elif moves_used >= max_moves:
    game_over, result = True, 'lose'
```

If won → green banner. If out of moves → red banner. Buttons are disabled when `game_over` is `True`.

---

## 💡 Key Session Patterns Used

| Action | Code |
|---|---|
| Initialize | `if 'gold' not in request.session: request.session['gold'] = 0` |
| Read | `request.session.get('gold', 0)` |
| Modify integer | `request.session['gold'] += amount` |
| Modify list | reassign: `request.session['activities'] = updated_list` |
| Clear everything | `request.session.flush()` |

---

## 🔄 Request Flow

```
Browser                              Django Server
  │                                       │
  │── GET /  ──────────────────────────>  │  index() → render page with gold + activities
  │<─ 200 HTML ────────────────────────  │
  │                                       │
  │── POST /process_money (loc=farm) ──>  │  process_money() → calc gold, update session
  │<─ 302 Redirect to / ───────────────  │
  │                                       │
  │── GET /  ──────────────────────────>  │  index() → render updated gold + new activity
  │<─ 200 HTML ────────────────────────  │
```

---

## 🛠 Built With

- [Django 4+](https://www.djangoproject.com/)
- Django Sessions Framework
- SQLite (session storage)
- Python `random` module
