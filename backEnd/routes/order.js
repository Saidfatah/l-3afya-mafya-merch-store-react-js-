const router = require('express').Router();
const {verifyToken} = require('../config/jwt.js')

const orders=[
    {
        id:1,
        owner:1,
        products_ids:[1],
        products:[
            {title:'product1',quantity:1},
            {title:'product2',quantity:1},
            {title:'product5',quantity:1},
        ],
        cost:145.5
    },
    {
        id:2,
        owner:3,
        products:[
            {title:'product1',quantity:2},
            {title:'product2',quantity:1},
        ],
        cost:50.5
    },
    {
        id:3,
        owner:3,
        products:[
            {title:'product1',quantity:2},
            {title:'product3',quantity:4},
        ],
        cost:490.5
    }
]



router.get('/',(req,res)=>{
     res.json(orders)
})
router.get('/:userid',(req,res)=>{
     res.json(orders.filter(order=>order.owner == req.params.userid))
})




module.exports = router