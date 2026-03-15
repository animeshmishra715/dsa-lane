const mongoose=require("mongoose");
const schema=new mongoose.Schema({
    name:String,
    level:String,
    topic:String
});
module.exports=mongoose.model("channel",schema);