const express = require("express");
const router = express.Router();
require("../../db/conn");
const UserTradeData = require("../../models/User/userTradeSchema");

router.get("/usertradedata", (req, res)=>{
    UserTradeData.find((err, data)=>{
        if(err){
            return res.status(500).send(err);
        }else{
            return res.status(200).send(data);
        }
    }).sort({$natural:-1})
})

module.exports = router;