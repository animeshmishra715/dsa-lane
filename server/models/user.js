const mongoose=require("mongoose");
const schema=new mongoose.Schema({
    username:String,
    level:String,
    reputation:Number,
    rating:Number
});

module.export=mongoose.model("user",schema);