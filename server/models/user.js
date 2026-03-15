const mongoose=require("mongoose");
const schema=new mongoose.Schema({
    username:String,
    level:String,
    reputation:Number,
    rating:Number
});

module.exports=mongoose.model("user",schema);