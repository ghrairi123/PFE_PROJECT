const mongoose = require('mongoose')

var City = mongoose.model('city',
{
    name : {type:String},
    
},'city')

module.exports = { City}