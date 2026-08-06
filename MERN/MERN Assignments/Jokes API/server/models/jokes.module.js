const mongoose=require("mongoose")
const jokeSchema=new  mongoose.Schema({
  setup:
    {
      type:String
    },
    punchline: {
      type:String
    },
  },
    {
      timestamps: true,
    }
);

module.exports= mongoose.model("Joke", jokeSchema);