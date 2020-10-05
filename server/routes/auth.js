const express =require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bycrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET}=require('../keys')
const requireLogin=require('../middleware/requireLogin')

//signup route

router.post('/signup',(req,res,err)=>{
    const{name,email,password}=req.body

    if(!name|| !email|| !password){
       return  res.status(422).json({error:'Please fill all the fields!'})
    }
    
    User.findOne({email:email}).then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:'User already exists!'})
        }
        bycrpt.hash(password,12)
        .then(hashedpassword=>{
                const user= new User({
                    name:name,
                    email:email,
                    password:hashedpassword
                })
                user.save()
                .then(user=>{res.json({message:"User Registered Successfully!"})})
                .catch(err=>console.log(err))
            }).catch(err=>console.log(err))
        }
               
        )
        
})

//signin route

router.post('/signin',(req,res,err)=>{
    const{email,password}=req.body;
    if(!email || !password){
        return  res.status(422).json({error:'Please fill all the fields!'})
     }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            res.json({error:'Invalid Email or password!'})
        }
        else{
        bycrpt.compare(password,savedUser.password)
        //doMatch is boolean value
        .then(doMatch=>{
            if(doMatch){
                //res.json({message:'Successfully Signed In!'})
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,name,email,followers,following}=savedUser
                res.json({token,user:{_id,name,email,followers,following}})
            }
            else{
                res.json({error:'Invalid Email or password!'})
            }
        })
        .catch(err=>console.log(err))
    }

    }).catch(err=>console.log(err)) 

})
module.exports=router