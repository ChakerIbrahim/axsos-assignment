//import express
const express = require("express");
 
// Import Faker
const { faker } = require("@faker-js/faker");
 
// Create the Express application
const app = express();
const PORT = 9090;
 
//express can understand both JSON Data & Form Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(PORT,()=>{console.log("server is running")})
 
// Creates and returns user
const createUser = () => {
  const newUser = {
    userID: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phoneNumber: faker.phone.number(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
 
  return newUser;
};
 
// Creates and returns company
const createCompany = () => {
  const newCompany = {
    companyId: faker.string.uuid(),
    name: faker.company.name(),
 
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country(),
    },
  };
 
  return newCompany;
};
 
// return a new user
app.get("/api/users/new",(req,res) => {
    const newUser = createUser();
    res.status(250).json({user:newUser});
})
// return a new company
app.get("/api/companies/new", (req, res) => {
  const newCompany = createCompany();
  res.json({com:newCompany});
});  
 
//return both user and company
app.get("/api/user/company",(req,res) =>
{
    const newUser = createUser();
    const newCompany = createCompany();
    res.json({user:newUser,company:newCompany})
})
 

 