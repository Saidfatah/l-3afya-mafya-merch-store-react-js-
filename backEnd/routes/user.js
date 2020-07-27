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
        firstname:'ali',
        lastname:'all',
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
    res.json(users.filter(user=>user.rule!='admin'))
})

router.get('/:id',(req,res)=>{
    res.json(users.filter(user=>user.id == req.params.id)[0])
})





router.post('/login',(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    //here ofcourse we dont just check for password using a straigh comparason but rather hash it and all the jazz 
    const user =users.filter(user=>user.email == email && user.password == password)[0]
    if(user != undefined){
        jwt.sign({user},'secretKey',{expiresIn:'10h'},(err,token)=>res.json({
            token,
            rule:user.rule,
            user:{
                id:user.id,
                firstname:user.firstname,
                lastname:user.lastname
            }
        }))
    }else
       res.sendStatus(400)
})
router.post('/register',(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    //create new user then send email withactivaton link that will be sent as a link you click brings you to a route that 
    //makes api call and activates your account
})


module.exports = router