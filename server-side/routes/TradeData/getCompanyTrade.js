const express = require("express");
const router = express.Router();
require("../../db/conn");
const CompanyTradeData = require("../../models/TradeDetails/orderIdSchema");

router.get("/companytradedata", (req, res)=>{
    CompanyTradeData.find((err, data)=>{
        if(err){
            return res.status(500).send(err);
        }else{
            return res.status(200).send(data);
        }
    }).sort({$natural:-1})
})

module.exports = router;