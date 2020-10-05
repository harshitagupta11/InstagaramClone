const express =require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model('Post');

const User = mongoose.model('User');

router.get('/user/:id',requireLogin,(req,res,err)=>{
    User.findOne({_id:req.params.id})
    .select('-password')   // not sending password to client
    .then(user=>{
        Post.find({postedBy:user._id})
        .populate('postedBy','._id name')
        .exec((err,posts)=>{
            if(err)
            return res.status(422).json({error:err})

            else{
                return res.json({posts,user})
            }
        })
    }).catch(err=>res.status(404).json({error:'User not found!'}))
})

router.put('/follow',requireLogin,(req,res,err)=>{
    User.findByIdAndUpdate(req.body.followId,
    {
        $push:{followers:req.user._id}
    },
    {
        new:true
    },
    (err,result)=>{
        if(err)
        return res.status(422).json({error:err})
        
        User.findByIdAndUpdate(req.user._id,
        {
            $push:{following:req.body.followId}
        },
        {new:true}
        ).select('-password').then((result)=>{
            console.log(result)
            res.json(result)

        }).catch(err=>res.status(422).json({error:err}))
    })

})

router.put('/unfollow',requireLogin,(req,res,err)=>{
    User.findByIdAndUpdate(req.body.unfollowId,
    {
        $pull:{followers:req.user._id}
    },
    {
        new:true
    },
    (err,result)=>{
        if(err)
        return res.status(422).json({error:err})
        User.findByIdAndUpdate(req.user._id,
        {
            $pull:{following:req.body.unfollowId}
        },
        {new:true}
        ).select('-password').then(result=>{
            res.json(result)
        }).catch(err=>res.status(422).json({error:err}))
    })
})










module.exports=router;