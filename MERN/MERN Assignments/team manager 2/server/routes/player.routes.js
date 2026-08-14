const PlayerController = require("../controllers/player.controller");

module.exports = (app)=> {
  app.get("/api/health", (req,res)=> {
    return res.json({ message:"backend is healthy"});
  });

  app.get("/api/players", PlayerController.findPlayers);
  app.post("/api/players", PlayerController.createPlayer);
  app.get("/api/players/:id", PlayerController.getPlayerById);
  app.delete("/api/players/:id", PlayerController.deletePlayer);
  app.put("/api/players/:id", PlayerController.updatePlayer);
};