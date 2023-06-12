const mongoose = require('mongoose');

const hotelSchema = mongoose.Schema({
    owner_name: {type : String, required : true},
    email: {type : String, required : true, unique : true},
    password: {type : String, required : true},
    phone: {type : String, required : true},
    age: {type : Number, required : true},
    city: {type : String, required : true},
    owner_ID : {type : String}
})

const HotelModel = mongoose.model("hotel", hotelSchema);

module.exports = {
    HotelModel
}