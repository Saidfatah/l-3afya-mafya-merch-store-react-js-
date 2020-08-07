const path = require('path')
const express= require('express')
const app = express()
const cors =require('cors')
var fs = require('fs')
const bodyParser = require('body-parser')
const userRoute= require('./routes/user')
const imageExtRoute= require('./routes/imageExt')
const productRoute= require('./routes/product').router
const collectionRoute= require('./routes/collection')
const cartRoute= require('./routes/cart')
const orderRoute= require('./routes/order')
const stripe= require('./routes/stripePaymentProccesing')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.use('/users',userRoute)
app.use('/product',productRoute)
app.use('/collection',collectionRoute)
app.use('/cart',cartRoute)
app.use('/order',orderRoute)
app.use('/image',imageExtRoute)
app.use('/stripe',stripe)




app.listen(4000,  ()=> {
    console.log('Listening now');
});