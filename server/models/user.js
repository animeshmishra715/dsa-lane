const mongoose=require("mongoose");
const schema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    level:{
        type:String,
        default: "Starter",
    },
    reputation:{
        type:String,
        default:0
    },





});

module.exports=mongoose.model("user",schema);