const express = require("express");
const app = express();
const port = 8000;

app.use( express.json());
app.user( express.urlencoded({ extended:true}));
app.get("/api",(req,res) =>{
  res.json({message:"Hello World"});
});

const users = [
  { firstName: "Reimu", lastName: "Hakurei" },
  { firstName: "Marisa", lastName: "Kirisame" },
  {firstName: "Sanae", lastName:"Kochiya"},
  {firstName: "Sakuya", lastName:"Izayoi"},
  {firstName:"Momiiji", lastName:"Inubashiri"}
];

app.get("/api/users",(req,res) => {
  res.json( users);
});

app.post("/api/users", (req,res) => {
  console.log(req.body);

  user.pudh(req.body);

  res.json( {status:"ok"});
});

app.get("/api/users/:id", (req, res) => {
  console.log(req.params.id);

  res.json( users[req.params.id]);
});

app.patch("/api/users/:id", (req,res) =>{
  const id = req.params.id;

  users[id] = req.body;

  res.json( {status: "ok"});
});

app.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;

  users.splice(id, 1);
  res.json( {status:"ok"});
});

module.exports.greet = function() {
  console.log("Hello! We are exporting a function called Greet.");
};

module.exports.add = function(num1, num2) {
  console.log("The sum is", num1 + num2);
};

module.exports= {
  greet: function() {
    console.log("Hello!We are exporting a function called Greet.");
  },

  add: function(num1, num2) {
    console.log("The sum is:", num1+num2);
  }
}

const myCustomModule = require("./my_module");
myCustomModule.greet();
myCustomModule.add(5,7);


const {greet, add } = require("./my_module");
greet();
add(5,7);