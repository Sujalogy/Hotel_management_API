const { HotelModel } = require("../model/hotels.model");

/**
 * @swagger : '2.0'
 * info: 
 *  title: Hotel Management API
 *  version: 1.0.0
 * paths:
 *  /signup:
 *    post:
 *      summary: Register
 */

// get all hotels with search functionality
const getHotel = async (req, res) => {
    const {hotel_name, rating, page = 1, limit =  10} = req.query;
    const query = {};
    try {
        if(hotel_name) {
            query.hotel_name = { $regex : hotel_name, $options: "i"};
        }
        if(rating) {
            query.rating = rating; 
        }
        const hotels = await HotelModel.find(query)
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}

// post a new hotel or add
const addHotel = async(req, res) => {
    const {hotel_name, location, rating, serve_food} = req.body;
    try {
        const newHotel = new HotelModel({
            owner_ID : req.owner.owner_ID,
            hotel_name,
            location,
            rating,
            serve_food
        });
        await newHotel.save();
        res.status(200).json({message : "Hotel created successfully..."})
    } catch (error) {
        res.status(400).json({error : error.message});
    }
};

// get a single hotel
const getOneHotel = async(req, res) => {
    try {
        const hotel = await HotelModel.findById(req.params.id);
        if(!hotel) {
            res.status(200).json({message : "Hotel Not Found"});
        }
        res.status(200).json({hotel});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

//update a single whole hotel with put

const updateWholeHotel = async(req, res) => {
    const {hotel_name, location, rating, serve_food} = req.body;
    try {
        const hotel = await HotelModel.findById(req.params.id);
        if(!hotel) {
            res.status(404).json({message : "Hotel Not Found"})
        }
        if(hotel.owner.toString() !== req.owner.owner_ID) {
            res.status(403).json({message : "Unauthorized access"});
        }
        hotel.hotel_name = hotel_name;
        hotel.location = location;
        hotel.rating = rating;
        hotel.serve_food = serve_food;
        await hotel.save();
        res.status(200).json({message : "Hotel updates successfully..."})
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

//update a single parts hotel with patch

const updateHotel = async(req, res) => {
    const updates = req.body;
    try {
        const hotel = await HotelModel.findById(req.params.id);
        if(!hotel) {
            res.status(404).json({message : "Hotel Not Found"})
        }
        if(hotel.owner.toString() !== req.owner.owner_ID) {
            res.status(403).json({message : "Unauthorized access"});
        }
        Object.keys(updates).forEach((key) => {
            hotel[key] = updates[key];
        });
        await hotel.save();
        res.status(200).json({message : "Hotel updates successfully..."})
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

//delete a single hotel

const deleteHotel = async(req, res) => {
    try {
        const hotel = await HotelModel.findById(req.params.id);
        if(!hotel) {
            res.status(404).json({message : "Hotel Not Found"})
        }
        if(hotel.owner.toString() !== req.owner.owner_ID) {
            res.status(403).json({message : "Unauthorized access"});
        }
        await hotel.remove();
        res.status(200).json({message : "Hotel deleted successfully..."})
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getHotel,addHotel,getOneHotel,updateHotel,deleteHotel,updateWholeHotel
}