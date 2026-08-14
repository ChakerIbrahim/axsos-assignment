# Team Manager — MERN

Team roster plus RSVP status across a 3-game series.

## Run

MongoDB must be running, or set an Atlas URI in `server/.env`.

Terminal 1:
```bash
cd server
npm install
npm start
```

Terminal 2:
```bash
cd client
npm install
npm run dev
```

## Routes

| Path | Page |
|---|---|
| `/` | redirects to `/players/list` |
| `/players/list` | roster, with delete |
| `/players/new` | add a player |
| `/status/game/1` | RSVP status for game 1 (also `/2`, `/3`) |

## API

| Method | Endpoint |
|---|---|
| GET | `/api/players` |
| POST | `/api/players` |
| GET | `/api/players/:id` |
| PUT | `/api/players/:id` |
| DELETE | `/api/players/:id` |

## Player schema

| Field | Type | Rules |
|---|---|---|
| `name` | String | required, min 3 characters |
| `position` | String | optional |
| `game1` | String | defaults to "Undecided" |
| `game2` | String | defaults to "Undecided" |
| `game3` | String | defaults to "Undecided" |

## Requirements covered

- List page showing all players with name and position
- Add page, redirects to the list on success
- Delete removes the row with no page refresh
- Backend validation on name (required, min 3)
- Extra challenge: frontend validation too — the Add button stays disabled until the name is long enough
- Bonus: confirmation dialog before deleting, naming the player
- Bonus: Player Status page — three games, three statuses, colour-coded
