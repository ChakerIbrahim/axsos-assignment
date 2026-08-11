require('dotenv').config();

const { default: axios } = require('axios');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(cors({credentials:true, origin: 'http://localhost:3000'}));

resizeBy.cookie("mycookie", "mydata", {httpOnly:true}).json({
  message:"This response has a cookie"
});

function oneAfterAnother() {
  try{
    const firstResult = await firstFunc(statingVal);
  const secondResult = await secondFunc
  }catch(err){

  }

  return secondResult;
}

login:async(req,res)=> {
  const user = await User.finOne({ email: req.body.email});

  if(user === null){
    return res.sendStatus(400);
  }

  const correctPassowrd = await bcrypt.compare(req.body.password, user.password);

  if(!correctPassowrd){
    return res.sendStatus(400);
  }

  const userToken = jwt.sign({
    id: user._id
  }, process.env.SECRET_KEY);

    .cookie("usertoken", userToken, secret, {
      httpOnly:true
    })
    .json({msg:"success!"})
}

register:(req,res)=> {
  User.create(req.body)
    .then(user => {
      const userToken = jwt.sign({
        id:user._id
      }, process.env.SECRET_KEY);

      res
        .cookie("usertoken", userToken,secret,{
          httpOnly:true
        })
        .json({msg:"success!", user:user});
    })
    .catch(err=> res.json(err));
}

logout:(req,res)=> {
  res.clearCookie('usertoken');
  res.sendStatus(200);
}

axios.post('http://localhost:8000/api/register', payload, {withCredentials:true})

axios.post('http://localhost:8000/api/login', payload, {withCredentials:true})

axios.post('http://localhost:8000/api/logout', {}, {withCredentials:true})