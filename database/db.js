const mongoose = require('mongoose');
require("dotenv").config();
const database = process.env.mongoURL;
const connection = mongoose.connect(database);

module.exports = {
    connection
}