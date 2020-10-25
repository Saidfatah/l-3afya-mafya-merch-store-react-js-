const path = require('path')
const express= require('express')
const app = express()
const mongoose = require('mongoose')
const cors =require('cors')
const bodyParser = require('body-parser')
const userRoute= require('./backEnd/routes/user')
const imageExtRoute= require('./backEnd/routes/imageExt')
const productRoute= require('./backEnd/routes/product').router
const collectionRoute= require('./backEnd/routes/collection')
const cartRoute= require('./backEnd/routes/cart')
const orderRoute= require('./backEnd/routes/order')
const stripe= require('./backEnd/routes/stripePaymentProccesing')


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://admin:123456Imgamers@saidfatah.sfpyf.mongodb.net/afiyaMafiya?retryWrites=true&w=majority'
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true },
 async () => {
        try {

        } catch (error) {
            console.log(error)
        }

  })


app.use('/users',userRoute)
app.use('/product',productRoute)
app.use('/collection',collectionRoute)
app.use('/cart',cartRoute)
app.use('/order',orderRoute)
app.use('/image',imageExtRoute)
app.use('/stripe',stripe)


if(process.env.NODE_ENV == 'production'){
   app.use(express.static('/dist'))
   app.get('*',(req,res)=>{
       res.sendFile(path.resolve(__dirname,'dist','index.html'))
   })
}

const Port = process.env.PORT || 4000
app.listen(Port,  ()=> {
    console.log('Listening now');
});