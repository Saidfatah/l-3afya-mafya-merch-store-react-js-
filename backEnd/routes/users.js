const router = require('express').Router();
const jwt = require('jsonwebtoken')

const users = [
    {
        id:0 , 
        firstname:'said',
        lastname:'fatah',
        order:[],
        email:"said_designer@outlook.com",
        password:"123456",
        rule:'admin'
    },
    {
        id:1 , 
        firstname:'said',
        lastname:'fatah',
        order:[],
        email:"ali@ali.com",
        password:"123456",
        rule:'costumer'

    },
    {
        id:2 , 
        firstname:'moad',
        lastname:'jemaa',
        order:[],
        email:"moad2019@hotmail.com",
        password:"123456",
        rule:'costumer'

    },
    {
        id:3 , 
        firstname:'imad',
        lastname:'chara',
        order:[],
        email:"imad@imad.com",
        password:"123456",
        rule:'costumer'

    }
]

router.get('/',(req,res)=>{
    res.send('heyy user')
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


router.post('/login',(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    console.log('post ')
    //here ofcourse we dont just check for password using a straigh comparason but rather hash it and all the jazz 
    const user =users.filter(user=>user.email == email && user.password == password)[0]
    if(user != undefined){
        jwt.sign({user},'secretKey',{expiresIn:'10h'},(err,token)=>res.json({token,rule:user.rule}))
    }else
       res.sendStatus(400)
})



module.exports = router