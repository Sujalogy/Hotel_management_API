const jwt = require("jsonwebtoken");
const { isTokenBlacklisted } = require("../model/blackList.model");
require("dotenv").config();

const auth = async(req,res,next) => {
    const token = req.header("Authorization");
    if(!token) {
        res.status(401).json({error : "Authentication required...!!"})
    }
    if(await isTokenBlacklisted(token)) {
        res.status(401).json({message : "please login again...!"})
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(decoded) {
            req.body.owner_ID = decoded.owner_id;
            next()
        } else {
            res.status(200).json({message : "Authentication fails..."})
        }
    })
}

module.exports = {
    auth
}