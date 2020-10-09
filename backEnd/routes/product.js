const router = require('express').Router();
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const ProductModel = require('../Models/Product') 
const upload= require('../config/multer')

const newProduct=({character,title,sizes,price})=>{
     let hasSize = true
     if(sizes.length<1)hasSize=false
     return {
        productId:products.length,
        hasSize,
        sizes,
        character,
        price,
        images:["img1.png","img2.png"],
        title,
     }
 }

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



router.get('/limit',async(req,res)=>{
    const limit = req.params.limit ; 
    try {
        const colelctionPromse = await ProductModel.find({}).sort({'date':-1}).limit(limit).exec()
        console.log(colelctionPromse)
    } catch (error) {
        console.log(error)
        res.sendStatus(400).send('no products found ')
    }
})

router.get('/',async(req,res)=>{
    try {
        const ProductsPromise = await ProductModel.find({})
        if(ProductsPromise[0] == undefined) throw new Error('no products')

        const mapedProducts= ProductsPromise.map(p=>({...p._doc,productId:p._id}))
        mapedProducts.forEach(p=>delete p.__v)

        res.json(mapedProducts)
    } catch (error) {
        console.log(error)
        res.sendStatus(400).send('no products found ')
    }
})
router.get('/:id',async (req,res)=>{
    try {
        const productsPromise = await ProductModel.findOne({_id:req.params.id})
        if(productsPromise == undefined) throw new Error('no products')
        const productMaped= {...productsPromise._doc,productId:productsPromise._id}
        delete  productMaped.__v;
        console.log(productMaped)
         res.json(productMaped)
    } catch (error) {
        console.log(error)
        res.sendStatus(400).send('no products found ')
    }
})


router.post('/create',verifyToken,async (req,res)=>{
        const {title}=req.body
        //check if exists a product with the same title 
        try {
            const checkTitlePromise= await  ProductModel.findOne({title:title})
            if(checkTitlePromise != null) throw new Error('EXISTS')

            const product = new ProductModel({...req.body,hasSize:req.body.sizes >0})
            const saveProductPromise = await product.save()
            if(saveProductPromise == undefined || saveProductPromise==null)
                 throw new Error('SOMETHNG_WENT_WRONG')
            res.send(200).send('POSTED WITH SUCCES')
        } catch (error) {
            if(error.message =="EXISTS") res.status(403).send('EXISTS')
            if(error.message =="SOMETHNG_WENT_WRONG") res.status(403).send('SOMETHNG_WENT_WRONG')
        }
})

router.post('/uploadImages/:title',(req,res)=>{
         upload(req,res,(err)=>{
             if(err) return console.log(err)
             if(res.file != undefined)
             {
                 res.send('file uploaded')
             }
             else
             {
                 res.send('no file selected')
             }    
         })
})

module.exports.router = router
