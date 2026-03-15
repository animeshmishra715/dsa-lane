const express=require("express");
const router=express.Router();
const user=require("../models/User");

router.get("/",async(req,res)=>{
    const users=await user.find()
        .sort({reputation:-1})
        .limit(10);
    res.join(user);
});

module.exports=router;