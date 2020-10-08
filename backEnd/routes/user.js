const router = require('express').Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserModel = require('../Models/User')
const axios = require('axios')

router.get('/',(req,res)=>{
    res.json(users.filter(user=>user.rule!='admin'))
})

router.get('/:id',(req,res)=>{

})

router.post('/login',async (req,res)=>{
    const email = req.body.email
    const password = req.body.password
  
    try {      
        const userGetPromise = await  UserModel.findOne({email})
        if(userGetPromise == undefined) throw new Error('no user with this email')

        const passCheck =await bcrypt.compare(password, userGetPromise.password)
        if(!passCheck) throw new Error('wrong password')

        jwt.sign(
        {userGetPromise},
        'secretKey',
        {expiresIn:'10h'},
        (err,token)=>res.json({
            token,
            rule:userGetPromise.rule,
            user:{
                id:userGetPromise._id,
                firstname:userGetPromise.firstname,
                lastname:userGetPromise.lastname,
                email:userGetPromise.email,
                rule:userGetPromise.rule
            }
        }))
  
    } catch (error) {
        console.log(error)
        res.sendStatus(404).send('no user ')
    }

})

router.post('/register',async(req,res)=>{
    const {email,password,firstname,lastname,token}=  req.body
    try {
        const secret="6Leex9QZAAAAAPrYIiEQmHIDkXpYNj83I3vElUgF"
        const capotchaResponse = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
        {}, 
        { headers: { "Content-Type": "application/x-www-form-urlencoded; charset=utf-8" }, },
        );
        if(capotchaResponse.data.succes == false ) throw new Error('ROBOT')

        const passHash=await bcrypt.hash(password,1);
        if(passHash == undefined) throw new Error('erro hassing password'); 
        
        const checkEmailExistsPromise= await UserModel.findOne({email:email})
        if( checkEmailExistsPromise !== null) throw new Error('EMAIL')

       
        const userDoc= new UserModel({ password:passHash,email,firstname,lastname,rule:'costumer'}).save()
        const userSave = await userDoc
        if(userSave._id == undefined) throw new Error('REGISTER')

        jwt.sign(
            {userSave},
            'secretKey',
            {expiresIn:'10h'},
            (err,token)=>res.json({
                token,
                rule:userSave.rule,
                user:{
                    id:userSave._id ,
                    firstname:userSave.firstname,
                    lastname:userSave.lastname,
                    email:userSave.email,
                    rule:userSave.rule
                }
        }))

    } catch (error) {
        if(error.message=="EMAIL"){
             res.statusMessage='EMAIL';
             res.sendStatus(403)
        }
        if(error.message=="REGISTER"){
             res.statusMessage='REGISTER';
             res.sendStatus(403)
        }
        if(error.message=="ROBOT"){
            res.statusMessage='ROBOT';
            res.sendStatus(403)
        }
       console.log(error)
    }
})


module.exports = router