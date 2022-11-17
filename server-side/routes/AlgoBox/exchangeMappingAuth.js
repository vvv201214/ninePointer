const express = require("express");
const router = express.Router();
require("../../db/conn");
const ExchangeMapping = require("../../models/AlgoBox/ExchangeMappingSchema");

router.post("/exchangeMapping", (req, res)=>{
    const {ExchangeNameIncoming, IncomingExchangeCode, ExchangeNameOutgoing, OutgoingInstrumentCode, Status, lastModified, uId, createdBy, createdOn} = req.body;

    if(!ExchangeNameIncoming || !IncomingExchangeCode || !ExchangeNameOutgoing || !OutgoingInstrumentCode || !Status || !lastModified || !uId || !createdBy || !createdOn){
        console.log(req.body);
        console.log("data nhi h pura");
        return res.status(422).json({error : "plz filled the field..."})
    }

    ExchangeMapping.findOne({uId : uId})
    .then((dateExist)=>{
        if(dateExist){
            console.log("data already");
            return res.status(422).json({error : "date already exist..."})
        }
        const exchangeMapping = new ExchangeMapping({ExchangeNameIncoming, IncomingExchangeCode, ExchangeNameOutgoing, OutgoingInstrumentCode, Status, lastModified, uId, createdBy, createdOn});
        console.log("this is exchange mapping", typeof(exchangeMapping) , exchangeMapping);
        exchangeMapping.save().then(()=>{
            res.status(201).json({massage : "data enter succesfully"});
        }).catch((err)=> res.status(500).json({error:"Failed to enter data"}));
    }).catch(err => {console.log(err, "fail")});
})

router.get("/readExchangeMapping", (req, res)=>{
    ExchangeMapping.find((err, data)=>{
        if(err){
            return res.status(500).send(err);
        }else{
            return res.status(200).send(data);
        }
    }).sort({$natural:-1})
})

module.exports = router;