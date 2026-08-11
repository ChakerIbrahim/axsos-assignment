const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
UserSchame.pre('save', function(next){
  bcrypt.hash(this.password,10)
    .then(hash=> {
      this.password = hash;
      next();
    });
});

const UserSchame= new mongoose.Schema({
  UserSchame.virtual('confirmPassword')
    .get( ()=> this._confirmPassword)
    .set( value => this._confirmPassword = value);

  UserSchame.pre('validate', function(next){
    if(this.password !== this.confirmPassword){
      this.invalidate('confirmPassword', 'Password must match confirm passowr');
    }
    next();
  })

  firstName: {
    type: String,
    required:[true, "firstnames is required"]
  },
  lastName: {
    type:String,
    required:[true, "Last name is required"]
  },
  email: {
    type:String,
    required:[true, "Email is required"]
  },
  password: {
    type:String,
    required:[true, "Password is required"],
    minlength:[8, "Password must be 8 characters or longer"]
  }
},{timestamps:true});

validate: {
  validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
  message: "Please enter a valid email"
}

const payload ={
  id:UserSchame,_id
};

const userToken = jwt.sign(payload, process.env.SECRET_KEY);