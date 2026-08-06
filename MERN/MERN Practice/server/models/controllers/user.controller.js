const User = require('../models/user.model');
module.exports.findAllUsers = (req, res) => {
  User.find()
    .then((allDaUsers) => {
      res.json({users:allDaUsers})
    })
    .catch(err) => {
      res.json(err)
    });
}
User.find({name:'Jessica'})
  .then(usersNamedJessica=>{

  })
  .catch(err=> res.json(err))

module.exports.findOneSingleUser=(req,res)=>{
  User.findOne({_id: req.params.id})
    .then((oneSingleUser) => {
      res.json({user:oneSingleUser})
    })
    .catch(err)=> {
      res.json(err)
    };
}
User.findOne({_id:'5d34d361db64c9267ed91f73'})
  .then(user=> {

  })
  .catch(err=> res.json(err));

module.exports.createNewUser = (req,res)=> {
  User.create(req.body)
    .then((newlyCreatedUser)=> {
      res.json({user:newlyCreatedUser})
    })
    .catch(err) => {
      res.json(err)
    }
}
const bob = new User(req.body);

bob.save()
  .then(newUser=> {

  })
  .catch(err=> res.json(err));

  const {userData} = req.body;
  User.create(userData)
    .then(newUser=> {

    })
    .catch(err=> res.json(err));

module.exports.updateExistingUser=(req,res)=> {
  User.findOneAndUpdate(
    {_id:req.params.id},
    req.body,
    {new:true, runValidators:true}
  )
  .then((updatedUser)=> {
    res.json({user:updatedUser})
  })
  .catch((err)=> {
    res.json(err)
  });
}

module.exports.deleteAnAxistingUser=(req,res)=>{
  User.deleteOne({_id:req.params.id})
    .then((result)=>{
      res.json({result:result})
    })
    .catch((err)=>{
      res.json(err)
    });
}

User.deleteMany({})
  .then(result=>{

  })
  .catch(err=> res.json(err))

  User.updateOne({name:'Bob Ross'}, {
    name:'Ross Bob',
    $push:{ pets: { name: 'Sprinkles', type: 'Chubby Unicorn'}}
  })
  .then(result=> {

  })
  .catch(err=> res.json(err));

  User.findOne({name: 'Bob Ross'}
      .then(user=> {
        user.name='Rob Boss';
        user.pets.push({name:'Sprinkles', type:'Chubby Unicorn'});
        return user.save();
      })
      .then(result=> res.json(result))
      .catch(err=> res.json(err));
  )

  User.exists({name:req.body.name})
    .then(userExists=> {
      if(userExists){
        return Promise.reject('Error');
      }
      return User.create(req.body);
    })
    .then(saveResult=> res.json(saveResult))
    .catch(err=> res.json(err));