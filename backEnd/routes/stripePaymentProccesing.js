
const router = require('express').Router();
const {v4} = require('uuid')
const stripe = require('stripe')('sk_test_51HCsVhLkAIHmcekis6IrzbzdZKJ592SZKIHQmpmq8c4nX2wBT7Ccqjo5pAhqEXjhW9Zt2cOJ3b3qUCwrhwOZEP2y00fVfOhkdu')

router.post("/checkout",async(req,res)=>{
    let error ;
    let status ;
    try {
        const {product,token}=req.body
        const idempotencyKey= v4()
        const customer = await stripe.customers.create(
            {
                email:token.email ,
                source:token.id,
            },
            {
              maxNetworkRetries: 5, 
            }
        )
        console.log(product.products.map(t=>t+' and '))

        const charge = await stripe.charges.create(
            {
                amount:product.amount ,
                currency:"usd",
                customer:customer.id,
                receipt_email:token.email,
                description:`purchased  ${product.products.map(t=>t+' and ')}`,
                shipping:{
                    name:token.card.name,
                    address:{
                        line1:token.card.address_line1,
                        line2:token.card.address_line2,
                        city:token.card.address_city,
                        country:token.card.address_country,
                        postal_code:token.card.address_zip
                    }
                    

                }

            }
            ,{
                idempotencyKey
            }
           );
           console.log(charge)
           status='succes'
    } catch (e) {
        console.log(e)
          error=e
         status='faillure'
    }
    res.json({error,status})
})

module.exports = router