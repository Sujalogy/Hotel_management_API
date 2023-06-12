const mongoose = require('mongoose');

const blacklistedSchema = new mongoose.Schema({
    token : {type : String, required : true, unique: true}
});

const BlacklistedToken = mongoose.model("BlacklistedToken", blacklistedSchema);

const blacklistToken = async(token) => {
    await BlacklistedToken.create({token});
}

const isTokenBlacklisted = async (token) => {
    const blacklistedToken = await BlacklistedToken.findOne({token});
    return blacklistedToken !== null;
}

module.exports = {
    blacklistToken,isTokenBlacklisted
}