const path = require('path')
const express= require('express')
const app = express()
const user= require('./routes/users')
const cors =require('cors')
var fs = require('fs')
const bodyParser = require('body-parser')


app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.use('/users',user)




app.listen(4000,  ()=> {
    console.log('Listening now');
});