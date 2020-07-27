const router = require('express').Router();
const {verifyToken} = require('../config/jwt.js')

const {products} =require('./product')
let collections= [
    {id:0,title:"L'3AFYA MAFYA LOGO",products:[7,8,9,10,5,6]},
    {id:1,title:"New",products:products.slice(Math.max(products.length - 5, 1)).map(p=>p.productId)},
    {id:2,title:"skeleton",products:[0,1,2,3]},
 ]

router.get('/',(req,res)=>{ res.json(collections)})
router.get('/:id',(req,res)=>{ res.json(collections[0])})

router.post('/create',verifyToken,(req,res)=>{
   
})
module.exports = router