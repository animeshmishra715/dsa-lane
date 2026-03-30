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
    codeforcesHandle:{
        type:String,
        default:""
    },
    leetcodeUsername:{
        type:String,
        default:""
    },
    rating:{
        type:Number,
        default:0
    },
    level:{
        type:String,
        default: "Starter",
    },
    reputation:{
        type:Number,
        default:0
    },
});

module.exports=mongoose.model("user",schema);