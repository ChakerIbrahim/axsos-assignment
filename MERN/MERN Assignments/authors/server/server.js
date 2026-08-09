require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./config/mongoose.config");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({origin: "http://localhost:5173"}));
app.use(express.json());

require("./routes/author.routes")(app);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
