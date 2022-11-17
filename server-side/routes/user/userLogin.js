const express = require("express");
const router = express.Router();
require("../../db/conn");
const UserDetail = require("../../models/User/userDetailSchema");

router.post("/login", async (req, res)=>{
    const {userId, pass} = req.body;

    if(!userId || !pass){
        console.log("data nhi h pura");
        return res.status(422).json({error : "please fill all the field..."})
    }

    const userLogin = await UserDetail.findOne({email : userId})
    console.log(userLogin);
    if(!userLogin){
        return res.status(422).json({error : "invalid details"})
    }else{
        res.status(201).json({massage : "user login succesfully"});
    }
})


module.exports = router;