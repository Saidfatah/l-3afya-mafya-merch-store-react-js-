
const router = require('express').Router();
const {v4} = require('uuid')
const Stripe = require('stripe');
const { Error } = require('mongoose');
const stripe = new Stripe('sk_test_51HCsVhLkAIHmcekis6IrzbzdZKJ592SZKIHQmpmq8c4nX2wBT7Ccqjo5pAhqEXjhW9Zt2cOJ3b3qUCwrhwOZEP2y00fVfOhkdu')


router.post("/payment_intent",async(req,res)=>{
    try {
        const {amount}=req.body
        if(amount == undefined ) throw new Error('UNDEFIND_DATA')

        const paymentIntent = await stripe.paymentIntents.create(
            {
                amount:req.body.amount,
                currency:'usd'
            }
        )
        res.status(200).send(paymentIntent.client_secret)
    } catch (e) {
        res.status(500).json({statusCode:500,message:e.message})
    }

})

module.exports = router