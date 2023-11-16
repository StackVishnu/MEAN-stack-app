const mongoose = require('mongoose')

module.exports = mongoose.model('Employee', {
    fullName : {type:String},
    position : {type:String},
    location : {type:String},
    salary   : {type:Number}
})//By default this function will access the plural word of the database name (employee -> employees) even if it is not explicitly given. 
