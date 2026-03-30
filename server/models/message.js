const mongoose=require("mongoose");
const schema=new mongoose.Schema({
    userId:String,
    channelId:String,
    content:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
});
module.exports=mongoose.model("message",schema)