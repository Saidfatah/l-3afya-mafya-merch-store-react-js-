const router = require('express').Router();
const jwt = require('jsonwebtoken')

const products= [
    {productId:0,hasSize:true,title:"Hands L",price:34,images:["img1.jpg","img2.jpg"]},
    {productId:1,hasSize:true,title:"skull T-Shirt",price:30,images:["img1.png","img2.png"]},
    {productId:2,hasSize:true,title:"skeleton T-Shirt",price:40,images:["img1.jpg","img2.jpg"]},
    {productId:3,hasSize:true,title:"skeleton hand T-Shirt",price:50,images:["img1.png","img2.png"]},
    {productId:4,hasSize:false,title:"mafya Dad Hat",price:"50",images:["img1.png","img2.png"]},
    {productId:5,hasSize:true,title:"L'3afya mafya T-Shirt (red)",price:50,images:["img1.png","img2.png"]},
    {productId:6,hasSize:true,title:"L'3afya mafya T-Shirt (block)",price:50,images:["img1.png","img2.png"]},
    {productId:7,hasSize:true,title:"L'3afya mafya logo T-Shirt (red)",price:48,images:["img1.png","img2.png"]},
    {productId:8,hasSize:true,title:"L'3afya mafya logo T-Shirt (black)",price:50,images:["img1.png","img2.png"]},
    {productId:9,hasSize:true,title:"l3afya mafya Logo Hoodie (red)",price:66,images:["img1.png","img2.png"]},
    {productId:10,hasSize:true,title:"l3afya mafya Logo Hoodie (block)",price:50,images:["img1.png","img2.png"]},
    {productId:11,hasSize:true,title:"l'3afya mafya Lighter",price:50,images:["img1.png","img2.png"]},
 ]

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
router.get('/',(req,res)=>{
    res.json(products)
})
router.get('/:id',(req,res)=>{
    res.json(products.filter(product=>product.productId == req.params.id)[0])
})
router.post('/create',verifyToken,(req,res)=>{
 
})

module.exports.products = products
module.exports.router = router
