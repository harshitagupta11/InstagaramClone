const express =require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');

const Post = mongoose.model('Post');

mongoose.set('useFindAndModify', false);
router.get('/allposts',requireLogin,(req,res,err)=>{
    Post.find().populate("postedBy",'_id name')
    .populate("comments.postedBy")
    
    .then((posts)=>{
        //console.log(posts)
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
        {new:true}).populate("comments.postedBy")
        .exec((err,result)=>{
            if(err)
            return res.status(422).json({error:err})
            else
            return res.json(result)
        }) 
})

router.put('/unlike',requireLogin,(req,res,err)=>{
    Post.findByIdAndUpdate(req.body.postId,
     {$pull:{likes:req.user._id}},
     {new:true}).populate("comments.postedBy")
     .exec((err,result)=>{
         console.log(result)
         if(err)
         return res.status(422).json({error:err})
         else
         return res.json(result)
     }) 
})

router.put('/comment',requireLogin,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy")
    .populate("postedBy",'_id name')
    .exec((err,result)=>{
        //console.log(result)
        if(err){
            
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})


router.delete('/delete/:postId',requireLogin,(req,res,err)=>{
    Post.findOne({_id:req.params.postId}).populate('postedBy','_id')
    .exec((err,post)=>{
        if(err|| !post){
            
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString()===req.user._id.toString()){
            post.remove()
            .then(result=>res.json(result))
            .catch(err=>console.log(err))
        }
    })
})

router.delete('/deletecomment/:postId/:commentId',requireLogin,(req,res,err)=>{
    Post.findByIdAndUpdate(req.params.postId,
        {$pull:{comments:{_id:req.params.commentId}}},
     {new:true}).populate('comments.postedBy').populate('postedBy')
    .exec((err,post)=>{
        if(err|| !post){
            
            return res.status(422).json({error:err})
        }
        else{
            console.log(post)
            return res.json(post)
        }      
        })
    })


module.exports=router;