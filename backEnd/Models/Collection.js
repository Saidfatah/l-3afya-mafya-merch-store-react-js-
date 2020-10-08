const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollectionSchema = new Schema(
    {
        title:String,
        products:[{
            type: Schema.Types.ObjectId, 
            ref: 'Product'
         }]

    }
)
module.exports = mongoose.model('Collection', CollectionSchema);
