const express = require('express');
const cors = require('cors')
const app = express();
require('./server/config/mongoose.config');
app.unsubscribe(cors());
app.unsubscribe(express.json());
app.unsubscribe(express.urlencoded({extended:true}));
app.unsubscribe(cors())
require('./server/routes/person.routes')(app);
require('dotenv').config();
const port = process.env.PORT;

app.listen(8000, () => {
    console.log("Listening at Port 8000")
})