const router = require('express').Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserModel = require('../Models/User')
const axios = require('axios')



router.post('/login',async (req,res)=>{
    try {      
        const email = req.body.email
        const password = req.body.password
      
        const userGetResponse = await  UserModel.findOne({email})
        if(userGetResponse == undefined) throw new Error('no user with this email')

        const passCheck =await bcrypt.compare(password, userGetResponse.password)
        if(!passCheck) throw new Error('wrong password')

        jwt.sign(
        {userGetResponse},
        'secretKey',
        {expiresIn:'10h'},
        (err,token)=>res.json({
            token,
            rule:userGetResponse.rule,
            user:{
                id:userGetResponse._id,
                firstname:userGetResponse.firstname,
                lastname:userGetResponse.lastname,
                email:userGetResponse.email,
                rule:userGetResponse.rule,
                addresses:userGetResponse.addresses,
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

       
        const userDoc= new UserModel({ password:passHash,email,firstname,lastname,addresses:[],rule:'costumer'}).save()
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
                    rule:userSave.rule,
                    addresses:userSave.addresses,
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

router.post('/update',async(req,res)=>{
    try {      
        const {id,addresses}=  req.body
        if (!id || addresses.lenght>0) throw new Error('SOMTHING_WENT_WRONG')
      
        const existingUser = await UserModel.findOne({ _id: id });
        if (!existingUser) throw new Error('INVALID_ID')


        const update = { addresses};
        const updateResponse = await existingUser.updateOne(update);
        const updatedDoc = await UserModel.findOne({_id:id});

        jwt.sign(
            {updatedDoc},
            'secretKey',
            {expiresIn:'10h'},
            (err,token)=>res.json({
                token,
                rule:updatedDoc.rule,
                user:{
                    id:updatedDoc._id ,
                    firstname:updatedDoc.firstname,
                    lastname:updatedDoc.lastname,
                    email:updatedDoc.email,
                    rule:updatedDoc.rule,
                    addresses:updatedDoc.addresses,
                }
        }))

    } catch (error) {
       console.log(error)
        if(error.message=="SOMTHING_WENT_WRONG"){
         res.statusMessage='SOMTHING_WENT_WRONG';
         res.sendStatus(403) 
        }
        if(error.message=="INVALID_ID"){
         res.statusMessage='INVALID_ID';
         res.sendStatus(403)  
        }
    }
})


module.exports = router