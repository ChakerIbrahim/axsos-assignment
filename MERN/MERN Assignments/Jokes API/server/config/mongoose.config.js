const mongoose = require('mongoose')
const uri=
  "mongodb://chaker703_db_user:123@ac-hupovmq-shard-00-00.8o4djz2.mongodb.net:27017,ac-hupovmq-shard-00-01.8o4djz2.mongodb.net:27017,ac-hupovmq-shard-00-02.8o4djz2.mongodb.net:27017/?ssl=true&replicaSet=atlas-91dxf4-shard-0&authSource=admin&appName=Cluster0"
mongoose.connect(uri).then(()=> {
  console.log("database connected sucessfully")
}).catch((error)=>{
  console.log("database not connected");
})