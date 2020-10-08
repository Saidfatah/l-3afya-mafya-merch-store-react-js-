const router = require('express').Router();
const {verifyToken} = require('../config/jwt.js')
const CollectionModel = require('../Models/Collection')




router.get('/',async (req,res)=>{ 
    try {
        const colelctionPromse = await CollectionModel.find({}).populate('products')
        if(colelctionPromse[0] == undefined) throw new Error('no collections')

        res.json(colelctionPromse.map(c=>({...c._doc,id:c._id})))
    } catch (error) {
        res.sendStatus(400).send('no collections ')
    }
})


router.post('/create',verifyToken,(req,res)=>{
   
})
module.exports = router