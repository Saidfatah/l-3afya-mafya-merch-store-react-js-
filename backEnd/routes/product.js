const router = require('express').Router();
const jwt = require('jsonwebtoken')
const upload= require('../config/multer')
const products= [
    {
        productId:0,
        hasSize:true,
        sizes:[
             "S",
             "M",
              "L",
              "XL",
              "2X",
              "3X",
            ],
         character:["100% cotton jersey","6 oz/sqyd","Preshrunk"],
         price:34,
         images:["img1.png","img2.png"],
         title:"Hands L",
     },
    {
        productId:1,
        hasSize:true,
        sizes:[
             "S",
             "M",
             "L",
             "XL",
             "2X",
             "3X",
            ],
         character:["100% cotton jersey","6 oz/sqyd","Preshrunk"],
         price:30,
         images:["img1.png","img2.png"],
         title:"skull T-Shirt",
    },
    {
        productId:2,
        hasSize:true,
        sizes:[
             "S",
             "M",
             "L",
             "XL",
             "2X",
             "3X",
            ],
            character:["100% cotton jersey","6 oz/sqyd","Preshrunk"],
            price:40,
            images:["img1.png","img2.png"],
            title:"skeleton T-Shirt",
    },
    {
        productId:3,
        hasSize:true,
        sizes:[
             "S",
             "M",
             "L",
             "XL",
             "2X",
             "3X",
            ],
            character:["100% cotton jersey","6 oz/sqyd","Preshrunk"],
            price:50,
            images:["img1.png","img2.png"],
            title:"skeleton hand T-Shirt",
     },
     {
         productId:4,
         hasSize:false
         ,sizes:[],
         character:["100% Cotton","One size fits all","Adjustable fastener with a metal clasp","Curved peak"],
         price:"50",
         images:["img1.png","img2.png"],
         title:"mafya Dad Hat",
     },
    {
        productId:5,
        hasSize:true,
        sizes:[
             "S",
             "M",
             "L",
             "XL",
             "2X",
             "3X",
            ],
            character:["100% cotton jersey","6 oz/sqyd","Preshrunk"],
            price:50,
            images:["img1.png","img2.png"],
            title:"L'3afya mafya T-Shirt (red)",
    },
    {
        productId:6,
        hasSize:true,
        sizes:[
             "S",
                   "M",
                   "L",
                   "XL",
                   "2X",
                   "3X",
                ],
                character:["100% cotton jersey","6 oz/sqyd","Preshrunk"],
                price:50,
                images:["img1.png","img2.png"],
                title:"L'3afya mafya T-Shirt (block)",
     }, 
    {
        productId:7,
        hasSize:true,
        sizes:[
             "S",
                   "M",
                   "L",
                   "XL",
                   "2X",
                   "3X",
                ],
                character:["100% cotton jersey","6 oz/sqyd","Preshrunk"],
                price:48,
                images:["img1.png","img2.png"],
                title:"L'3afya mafya logo T-Shirt (red)",
    },  
    {
        productId:8,
        hasSize:true,
        sizes:[
             "S",
                   "M",
                   "L",
                   "XL",
                   "2X",
                   "3X",
                ],
                character:["100% cotton jersey","6 oz/sqyd","Preshrunk"],
                price:50,
                images:["img1.png","img2.png"],
                title:"L'3afya mafya logo T-Shirt (black)",
    },
    {
        productId:9,
        hasSize:true,
        sizes:[
             "S",
                   "M",
                   "L",
                   "XL",
                   "2X",
                   "3X",
                ],
                character:["10 oz 70% cotton 30% polyester","Fleece lined hood","Heavy gauge drawcord with metal eyelets"],
                price:66,
                images:["img1.png","img2.png"],
                title:"l3afya mafya Logo Hoodie (red)",
    },
     {
        productId:10,
        hasSize:true,
        sizes:[
               "S",
             "M",
             "L",
             "XL",
             "2X",
             "3X",
         ],
        character:["10 oz 70% cotton 30% polyester","Fleece lined hood","Heavy gauge drawcord with metal eyelets"],
        price:50,
        images:["img1.png","img2.png"],
        title:"l3afya mafya Logo Hoodie (block)",
    },
    {
     productId:11,
     hasSize:false,
     sizes:[
             "S",
                   "M",
                   "L",
                   "XL",
                   "2X",
                   "3X",
      ],
      character:["Please note that this item is classified as a hazardous material by various federal agencies and may not be re-shipped or mailed except in an approved container. ","Official BIC lighter.","Domestic (U.S.) Shipping Only"],
      price:50,
      images:["img1.png","img2.png"],
      title:"l'3afya mafya Lighter",
     }
 ]
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
router.get('/',(req,res)=>{
    res.json(products)
})
router.get('/:id',(req,res)=>{
    res.json(products.filter(product=>product.productId == req.params.id)[0])
})
// 
router.post('/create',verifyToken,(req,res)=>{
        console.log(req.body)
        //check if exists a product with the same title 
        // products.push({...res.body, productId:products.length})
        console.log(newProduct(req.body))
        res.json('succes')
})
router.post('/uploadImages/:title',(req,res)=>{
         upload(req,res,(err)=>{
             if(err) console.log(err)
             else{ 
                 if(res.file != undefined)
                 {
                     res.send('file uploaded')
                 }
                 else
                 {
                     res.send('no file selected')
                 }
             }
         })
      
})

module.exports.products = products
module.exports.router = router
