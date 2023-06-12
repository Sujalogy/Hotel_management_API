const express = require("express");
const { getHotel, addHotel, getOneHotel, updateHotel, deleteHotel, updateWholeHotel } = require("../controller/hotel.controller");
const hotelRouter = express.Router();

hotelRouter.route("/").get(getHotel).post(addHotel);
hotelRouter.route("/:id").get(getOneHotel)
hotelRouter.route("/update/:id").put(updateWholeHotel).patch(updateHotel)
hotelRouter.route("/delete/:id").delete(deleteHotel)

module.exports = {
    hotelRouter
}