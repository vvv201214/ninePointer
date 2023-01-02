const express = require("express");
const router = express.Router();
require("../../db/conn");
const CompanyTradeData = require("../../models/TradeDetails/liveTradeSchema");

router.get("/companylivetradedata", (req, res)=>{
    CompanyTradeData.find((err, data)=>{
        if(err){
            return res.status(500).send(err);
        }else{
            return res.status(200).send(data);
        }
    }).sort({$natural:-1})
})

router.get("/companylivetradedata/:id", (req, res)=>{
    console.log(req.params)
    const {id} = req.params
    CompanyTradeData.findOne({_id : id})
    .then((data)=>{
        return res.status(200).send(data);
    })
    .catch((err)=>{
        return res.status(422).json({error : "date not found"})
    })
})

router.get("/companylivetradedatatodaywithemail/:email", (req, res)=>{
    const {email} = req.params
    let date = new Date();
    let todayDate = `${(date.getFullYear())}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    console.log(todayDate);
    CompanyTradeData.find({order_timestamp: {$regex: todayDate}, userId: {$regex: email}, status: "COMPLETE"})
    .then((data)=>{
        (data).sort((a, b)=> {

            if (a.order_timestamp < b.order_timestamp) {
              return 1;
            }
            if (a.order_timestamp > b.order_timestamp) {
              return -1;
            }
            return 0;
          });
        data.reverse();
        return res.status(200).send(data);
    })
    .catch((err)=>{
        return res.status(422).json({error : "date not found"})
    })
})

module.exports = router;