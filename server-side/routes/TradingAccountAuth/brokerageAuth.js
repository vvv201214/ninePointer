const express = require("express");
const router = express.Router();
require("../../db/conn");
const Brokerage = require("../../models/Trading Account/brokerageSchema");

router.post("/brokerage", (req, res)=>{
    const {brokerName, type, brokerageCharge, exchangeCharge, gst, sebiCharge, stampDuty, sst, createdOn, lastModified, createdBy, transaction, exchange, ctt, dpCharge, uId} = req.body;
    console.log(req.body);
    if(!brokerName || !type || !brokerageCharge || !exchangeCharge || !gst || !sebiCharge || !stampDuty || !sst || !createdOn || !lastModified || !createdBy || !transaction || !exchange || !ctt || !dpCharge || !uId){
        console.log("data nhi h pura");
        return res.status(422).json({error : "plz filled the field..."})
    }

    Brokerage.findOne({uId : uId})
    .then((dateExist)=>{
        if(dateExist){
            console.log("data already");
            return res.status(422).json({error : "date already exist..."})
        }
        const brokerage = new Brokerage({brokerName, type, brokerageCharge, exchangeCharge, gst, sebiCharge, stampDuty, sst, createdOn, lastModified, createdBy, transaction, exchange, ctt, dpCharge, uId});

        brokerage.save().then(()=>{
            res.status(201).json({massage : "data enter succesfully"});
        }).catch((err)=> res.status(500).json({error:"Failed to enter data"}));
    }).catch(err => {console.log(err, "fail")});
    
})

router.get("/readBrokerage", (req, res)=>{
    Brokerage.find((err, data)=>{
        if(err){
            return res.status(500).send(err);
        }else{
            return res.status(200).send(data);
        }
    }).sort({$natural:-1})
})

module.exports = router;