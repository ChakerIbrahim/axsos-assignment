// import everything the controller exported
const PlayerController = require('../controllers/player.controller');

// export a function that takes the express app and attaches routes to it
module.exports = (app) => {
    app.get('/api/players', PlayerController.findAllPlayers);
    app.get('/api/players/:id', PlayerController.findOnePlayer);
    app.post('/api/players', PlayerController.createPlayer);
    app.patch('/api/players/:id', PlayerController.updatePlayer);
    app.delete('/api/players/:id', PlayerController.deletePlayer);
};