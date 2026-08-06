const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({

  first_name:
  type: String,
  required:[true, "First name is required"],
  minLength:[6, "First name must be at least 6 charcaters long"]
  },
  last_name: {
    type: String,
    required:[true, "Last name is required"],
    maxLength:[20, "Last name must be at least 6 chacaters long"]

  },
  age: {
    type:Number,
    min:[1, "You must be at least 1 or older to register"],
    max: [150, "You must be at most 149 years old to register"]
  },
  email:{ type:String, required:[true, "Email is required"]}
  {timestamps:true}



  const User = mongoose.model('User', UserSchema)
});
const User = mongoose.model('User, UserSchema');
module.exports = User;

const UserSchema = new mongoose,Schema({
  fname:String,
  lname:String,
  email:String,
  password:String,
  bankAccounts:[BankAccountSchema]
}),
{timestamps:true}


const TransactionSchema = new mongoose.Schema({
  amount: {type:Number, required:true},
  vender: {type:String, required:true}
}),
{timestamps:{createdAt:true}}
);

const BankAccountSchema = new mongoose.Schema({
  accountType: {type:String, required:true},
  balance:{type:Number, default:0},
  transactions: [TransactionSchema]
},
{timestamps:true}
);