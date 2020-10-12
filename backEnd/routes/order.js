const router = require('express').Router();
const {verifyToken} = require('../config/jwt.js')
const OrderModel = require('../Models/Order')




router.get('/',async (req,res)=>{
     try {
          const ordersGet =await OrderModel.find({}).populate('clientId').populate('orders.product').exec()
          console.log(ordersGet)
          if(ordersGet[0] == undefined) throw new Error('no orders')
          res.json(ordersGet)

     } catch (error) {
       console.log(error)
       res.sendStatus(400).send('no orders')
     }
})
router.get('/:userid',async (req,res)=>{
     console.log(req.params.userId)
     try {
          const ref = OrderModel.find({clientId:req.params.userId})
          const clientId =await ref
          if(clientId == undefined) throw new Error('no orders for you ')
          const order =await ref.populate('clientId').populate('orders.product').exec()
   
          if(order[0] == undefined) throw new Error('no orders')
          res.json(order)
   } catch (error) {
       res.sendStatus(400).send('NO_ORDERS')
   }
})




module.exports = router