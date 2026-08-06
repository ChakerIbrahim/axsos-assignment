const express = require("express");
const app = express();
const PORT = 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./config/mongoose.config");

const jokeRoutes = require("./routes/joke.routes");
jokeRoutes(app);

app.listen(PORT, () => {
  console.log("server is running");
});
