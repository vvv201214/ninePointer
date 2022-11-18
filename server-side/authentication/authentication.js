const jwt = require("jsonwebtoken");
const User = require("../models/User/userDetailSchema");

const Authenticate = async (req, res, next)=>{
    try{
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        console.log("token and verifyToken", token, verifyToken);
    } catch(err){
        res.status(401).send("Unauthorised")
        console.log(err);
    }
    next();
}

module.exports = Authenticate;