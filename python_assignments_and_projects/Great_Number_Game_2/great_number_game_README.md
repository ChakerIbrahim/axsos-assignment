# 🎯 Django Great Number Game

A Django web application where the server picks a secret number between 1 and 100 and the user tries to guess it. Built to practice Django sessions, form handling, and redirects.

---

## 📋 Assignment Objectives

- Practice using **session** to store data about a client's history with the app
- Practice **clearing a session**
- Practice having the server use **data submitted via a form**

---

## ✨ Features

| Feature | Route | Description |
|---|---|---|
| Play the game | `/` | Server picks a random number; user submits guesses |
| Submit a guess | `/guess` (POST) | Checks guess; responds too high / too low / correct |
| Reset / play again | `/reset` | Clears session and starts a new game |
| Submit name | `/submit_name` (POST) | Winner submits their name to the leaderboard |
| Leaderboard | `/leaderboard` | Shows all winners sorted by fewest attempts |

---

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- pip

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/great-number-game.git
cd great-number-game

# 2. Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# 3. Install Django
pip install django

# 4. Run migrations (sets up session + leaderboard tables)
python manage.py migrate

# 5. Start the server
python manage.py runserver
```

Open `http://localhost:8000/` in your browser and start guessing!

---

## 📁 Project Structure

```
great_number_game/
│
├── manage.py
│
├── great_number_game/           # Project config
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
└── great_number_game_app/       # The game app
    ├── views.py                 # All game logic
    ├── urls.py                  # URL patterns
    └── templates/
        └── great_number_game_app/
            ├── index.html       # Main game page
            └── leaderboard.html # Winners leaderboard
```

---

## 🧠 How It Works — Step-by-Step Explanation

### Step 1 — Generate the secret number (only once per game)

```python
# views.py → index()
if 'secret_number' not in request.session:
    request.session['secret_number'] = random.randint(1, 100)
    request.session['attempts'] = 0
```

**Why check first?** Every page refresh calls `index()`. Without the check, a new random number would be generated on EVERY visit — meaning the target keeps changing. The session check ensures the number is generated ONLY once per game, then stored and reused for all subsequent guesses.

---

### Step 2 — Display the form

The template renders a `<form>` that POSTs the user's guess to `/guess`:

```html
<form method="POST" action="{% url 'guess' %}">
    {% csrf_token %}
    <input type="number" name="guess" min="1" max="100" required>
    <button type="submit">Submit</button>
</form>
```

`{% csrf_token %}` is required by Django for all POST forms — it prevents cross-site request forgery attacks.

---

### Step 3 — Check the guess

```python
# views.py → guess()
user_guess = int(request.POST.get('guess'))
secret = request.session.get('secret_number')
attempts += 1
request.session['attempts'] = attempts

if user_guess < secret:
    request.session['message'] = "Too low!"
    request.session['status'] = 'low'
elif user_guess > secret:
    request.session['message'] = "Too high!"
    request.session['status'] = 'high'
else:
    request.session['message'] = f"{secret} was the number!"
    request.session['status'] = 'correct'
    request.session['game_over'] = True
```

The result is stored in the session as a `message` + `status`, then the view redirects back to `/`. The `index` view reads and displays the message.

**Why redirect instead of render?** This is the **Post/Redirect/Get** pattern. If you render directly after a POST, refreshing the page re-submits the form. Redirecting to GET prevents that.

---

### Step 4 — Reset / Play Again

```python
def reset(request):
    request.session.flush()   # Wipes ALL session data
    return redirect('index')  # index() will generate a new secret number
```

`flush()` deletes the session from the database AND removes the session cookie. The next visit to `/` starts completely fresh.

---

## 🎯 Assignment Checklist

- [x] Create Django project called `great_number_game`
- [x] Root route picks a random number and displays the guessing form
- [x] `/guess` route checks the submission and shows too high / too low / correct
- [x] **Ninja Bonus**: Colored result box (red = wrong, green = correct)
- [x] **Ninja Bonus**: Keep guessing until correct
- [x] **Ninja Bonus**: Display number of attempts taken
- [x] **Sensei Bonus**: Limit to 5 guesses → "You Lose" message
- [x] **Sensei Bonus**: Winner submits name → leaderboard page with rankings

---

## 💡 Key Session Patterns Used

| Action | Code |
|---|---|
| Check key exists | `if 'secret_number' not in request.session:` |
| Store a value | `request.session['secret_number'] = random.randint(1, 100)` |
| Read a value | `request.session.get('secret_number')` |
| Delete one key | `del request.session['message']` |
| Clear everything | `request.session.flush()` |

---

## 🔄 Request Flow Diagram

```
Browser                          Django Server
  │                                   │
  │── GET /  ────────────────────────>│ index() → generate number if new
  │<─ 200 HTML (form) ───────────────│
  │                                   │
  │── POST /guess (guess=42) ────────>│ guess() → compare, store result
  │<─ 302 Redirect to / ─────────────│
  │                                   │
  │── GET /  ────────────────────────>│ index() → read result from session
  │<─ 200 HTML (Too low!) ───────────│
```

---

## 🛠 Built With

- [Django 4+](https://www.djangoproject.com/) — Python web framework
- Django Sessions Framework — Built-in per-visitor state storage
- SQLite — Default database for sessions and leaderboard
- Python `random` module — `random.randint(1, 100)` for the secret number
