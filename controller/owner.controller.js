const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {OwnerModel} = require("../model/owners.model");
const {blacklistToken} = require("../model/blackList.model");

// register
const signUp = async (req, res) => {
    const {owner_name, email, password, phone, age, city} = req.body;
    try {
        const existingOwner = await OwnerModel.findOne({email});
        if(existingOwner) {
            res.status(400).json({message : "Owner Already Exists...!"})
        }
        const hashed = await bcrypt.hash(password, 10);
        const newOwner = new OwnerModel({owner_name, email, password : hashed, phone, age, city});
        await newOwner.save();
        res.status(200).json({message : "Owner Register Successfully..."});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

// login
const logIn = async (req, res) => {
    const {email, password} = req.body;
    try {
        const owner = await OwnerModel.findOne({email});
        if(!owner) {
            res.status(401).json({message : "Invalid E-mail..."})
        }
        const passMatch = await bcrypt.compare(password, owner.password);
        if(!passMatch) {
            res.status(401).json({message : "Invalid password.."})
        }
        const token = jwt.sign({owner_ID : owner._id}, process.env.SECRET, {expiresIn : "7d"});
        res.status(200).json({message : "logged in successfully", token : token})
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// logout 
const logOut = async (req, res) => {
    const token = req.header("Authorization");
    try {
        await blacklistToken(token);
        res.status(200).json({message : "owner Logged out successfully..."})
    } catch (error) {
        res.status(400).json({error : error.message});
    }
}

module.exports = {
    signUp, logIn, logOut
}
