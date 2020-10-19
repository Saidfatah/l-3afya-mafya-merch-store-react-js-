const router = require('express').Router();
const { Error } = require('mongoose');
const {verifyToken} = require('../config/jwt.js')
const OrderModel = require('../Models/Order')




router.get('/',async (req,res)=>{
     try {
          const ordersGet =await OrderModel.find({}).populate('orders.product').exec()

          if(ordersGet[0] == undefined) throw new Error('no orders')
          res.json(ordersGet)

     } catch (error) {
       res.sendStatus(400).send('no orders')
     }
})
router.get('/:userid',async (req,res)=>{
     console.log(req.params.userId)
     try {
          const ref = OrderModel.find({clientId:req.params.userId})
          const clientId =await ref
          if(clientId == undefined) throw new Error('no orders for you ')
          const order =await ref.populate('orders.product').exec()
   
          if(order[0] == undefined) throw new Error('no orders')
          res.json(order)
   } catch (error) {
       res.sendStatus(400).send('NO_ORDERS')
   }
})


router.post('/',async (req,res)=>{
     console.log('api call made')
     try {
          if(req.body.order == undefined) throw new Error('UNDEFINED_DATA')
          
          console.log(req.body.order)
          const order = new OrderModel(req.body.order)
          const orderSaveResponse = await order.save()
          
          if(orderSaveResponse.id == undefined || orderSaveResponse==null)
              throw new Error('SOMETHNG_WENT_WRONG')
        
          res.send('POSTED WITH SUCCES')
   } catch (error) {
        console.log(error)
       if(error.message == "UNDEFINED_DATA") return  res.status(400).json('UNDEFINED_DATA')
       res.status(400).json('SAVE_FAILED')
   }
})




module.exports = router