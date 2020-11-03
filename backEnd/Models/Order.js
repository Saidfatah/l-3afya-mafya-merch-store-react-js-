const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
        orders:[
           {      
                type: Schema.Types.ObjectId, 
                ref: 'Product'
           }
        ],
        orders_quantity:[],
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
