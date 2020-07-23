const path = require('path')
const express= require('express')
const app = express()
const cors =require('cors')
var fs = require('fs')


app.use(cors())
const Imagesdir = path.join(__dirname, 'images/products');
app.use(express.static(Imagesdir));


var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};



app.post('/login',(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    //here ofcourse we dont just check for password using a straigh comparason but rather hash it and all the jazz 
    const user =users.filter(user=>user.username == username && user.password == password)[0]
    if(user != undefined){
        jwt.sign({user},'secretKey',{expiresIn:'10h'},(err,token)=>res.json({token,rule:user.rule}))
    }else
       res.sendStatus(400)
})
const verifyToken = (req,res,next)=>{
    const bearerHeader = req.headers['authorization']
    if( bearerHeader  !== 'undefined'){
       const token = bearerHeader.split(' ')[1]
       req.token=token
       next()
    }else
    {
       res.sendStatus(403)
    }
}

app.listen(4000,  ()=> {
    console.log('Listening now');
});