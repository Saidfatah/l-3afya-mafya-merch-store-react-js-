const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
         hasSize:Boolean,
         sizes:[],
         character:[],
         price:Number,
         images:[],
         title:String,
    }
)
module.exports = mongoose.model('Product', ProductSchema);