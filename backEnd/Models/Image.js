const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var imageSchema =Schema({ 
    name: String, 
    desc: String, 
    img: 
    { 
        data: Buffer, 
        contentType: String 
    } 
}); 

module.exports = mongoose.model('Image', imageSchema);
