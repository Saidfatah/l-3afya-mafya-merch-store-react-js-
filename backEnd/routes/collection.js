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


router.post('/create',async(req,res)=>{
    try {
        const checkTitlePromise= await  CollectionModel.findOne({title:req.body.title})
        if(checkTitlePromise != null) throw new Error('TITLE_EXISTS')

        const collection = new CollectionModel({...req.body})
        const saveCollectionPromise = await collection.save()
        if(saveCollectionPromise == undefined || saveCollectionPromise==null) throw new Error('SOMETHNG_WENT_WRONG')
       
        res.send('POSTED WITH SUCCES')

    } catch (error) {
        if(error.message =="TITLE_EXISTS") {
            console.log(error)
            res.status(403).send('TITLE_EXISTS')
        }
        if(error.message =="SOMETHNG_WENT_WRONG") res.status(403).send('SOMETHNG_WENT_WRONG')
  
    }
})

module.exports = router