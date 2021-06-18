const mongoose =require('mongoose');
const{ObjectId}= mongoose.Schema.Types
const userSchema = new mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
pic:{
    type:String,
    default:'https://res.cloudinary.com/myfirstinstaclone/image/upload/v1623991332/photo-1595152772835-219674b2a8a6_gbho7b.jpg'
},
followers:[{
    type:ObjectId,
    ref:'User'
}],
following:[{
    type:ObjectId,
    ref:'User'
}],

})

mongoose.model("User",userSchema);