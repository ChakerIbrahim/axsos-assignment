const UserController=require('../controllers/user.controller');
module.exports=app=>{
  
  app.get('/api/users', UserController.findAllUsers);
  app.get('/api/users/:id', UserController.finOneSingleUser);
  app.patch('/api/users/:id', UserController.updateExistingUser);
  app.post('/api/users', UserController.createNewUser);
  app.delete('/api/users/:id', UserController.deleteAnExistingUser);


}