const express = require('express')
const app =express();

const mongoose = require('mongoose');
const {MONGOURI}= require('./keys');
const PORT=5000;

mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true 
});
mongoose.connection.on('connected',()=>{
    console.log("mongoDb connected")
})

mongoose.connection.on('error',(err)=>{
    console.log("error:",err);
})
require('./models/user')
require('./models/post')
mongoose.model('User')
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

app.listen(PORT,()=>{
    console.log("server is running on port 5000");
})