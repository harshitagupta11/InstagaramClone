const express =require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');

const Post = mongoose.model('Post');

router.get('/allposts',requireLogin,(req,res,err)=>{
    Post.find().populate("postedBy",'_id name').then((posts)=>{
        res.json({posts:posts})
    }).catch(err=>console.log(err))
})

router.get('/myposts',requireLogin,(req,res,err)=>{
    Post.find({postedBy:req.user._id}).
    then((myposts=>{
        res.json({myposts})
    })).catch(err=>console.log(err))
})

router.post('/createpost',requireLogin,(req,res,err)=>{
    const {title,body,photo}=req.body;
    if(!title|| !body || !photo){
        return res.status(422).json({error:'please add all the fields'})
    }
    //console.log(req.user)
    //res.send('ok')
    req.user.password=undefined
    const post = new Post({
        title,
        body,
        photo,
        postedBy:req.user,
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>console.log(err))
    

})
router.put('/like',requireLogin,(req,res,err)=>{
       Post.findByIdAndUpdate(req.body.postId,
        {$push:{likes:req.user._id}},
        {new:true}).exec((err,result)=>{
            if(err)
            return res.status(422).json({error:err})
            else
            return res.json(result)
        }) 
})

router.put('/unlike',requireLogin,(req,res,err)=>{
    Post.findByIdAndUpdate(req.body.postId,
     {$pull:{likes:req.user._id}},
     {new:true}).exec((err,result)=>{
         if(err)
         return res.status(422).json({error:err})
         else
         return res.json(result)
     }) 
})







module.exports=router;