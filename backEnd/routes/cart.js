const router = require('express').Router();
const {verifyToken} = require('../config/jwt.js')

const carts=[
    {
        userid:1,
        orders:[0,1,2]
    }
]


router.get('/:userid',(req,res)=>{
     res.json(carts.filter(cart=>cart.userid != req.params.userid))
})




module.exports = router
