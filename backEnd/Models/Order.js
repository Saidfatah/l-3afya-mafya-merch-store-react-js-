const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
        orders:[
           {
               product :{
                type: Schema.Types.ObjectId, 
                ref: 'Product'
               },
               quantity:Number,
           }
        ],
        clientId : {
            type: Schema.Types.ObjectId, 
            ref: 'User'
        },
        date:Date,
        cost:Number,
        billing_details:{}

    }
)
module.exports = mongoose.model('Order', OrderSchema);
