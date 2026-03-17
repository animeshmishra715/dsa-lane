const express=require("express");
const router=express.Router();
const bcrypt=require("bcrypt");
const User =require("../models/user");

//SIGNUP
router.post("/signup",(req,res)=>{
    const {username,email,password}=req.body;
    bcrypt.hash(password,10)
        .then((hashedPassword)=>{
            const user =new User({
                username,
                email,
                password:hashedPassword
            });
            return user.save();
        })

    .then(()=>{
        res.json({message:"User Created"});
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({error:"Server error"});
    });
});


//LOGIN
router.post("/login",(req,res)=>{
    const {email,password} = req.body;

    User.findOne({email})
        .then((user)=>{

            if(!user){
                return res.status(400).json({error:"User not found"});
            }

            bcrypt.compare(password,user.password)
                .then((match)=>{

                    if(!match){
                        return res.status(400).json({error:"Incorrect password"});
                    }

                    res.json({
                        message:"Login successful",
                        username:user.username,
                        level:user.level
                    });

                });

        })
        .catch((err)=>{
            console.log(err);
            res.status(500).json({error:"Server error"});
        });

})
module.exports=router;







