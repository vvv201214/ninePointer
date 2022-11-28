const express = require("express");
const router = express.Router();
require("../../db/conn");
const InstrumentAlgo = require("../../models/AlgoBox/instrumentMappingSchema");

router.post("/instrumentAlgo", (req, res)=>{
    const {InstrumentNameIncoming, IncomingInstrumentCode, InstrumentNameOutgoing, OutgoingInstrumentCode, Status, lastModified, uId, createdBy, createdOn} = req.body;

    if(!InstrumentNameIncoming || !IncomingInstrumentCode || !InstrumentNameOutgoing || !OutgoingInstrumentCode || !Status || !lastModified || !uId || !createdBy || !createdOn){
        console.log(req.body);
        console.log("data nhi h pura");
        return res.status(422).json({error : "plz filled the field..."})
    }

    InstrumentAlgo.findOne({uId : uId})
    .then((dateExist)=>{
        if(dateExist){
            console.log("data already");
            return res.status(422).json({error : "date already exist..."})
        }
        const instrumentAlgo = new InstrumentAlgo({InstrumentNameIncoming, IncomingInstrumentCode, InstrumentNameOutgoing, OutgoingInstrumentCode, Status, lastModified, uId, createdBy, createdOn});

        instrumentAlgo.save().then(()=>{
            res.status(201).json({massage : "data enter succesfully"});
        }).catch((err)=> res.status(500).json({error:"Failed to enter data"}));
    }).catch(err => {console.log(err, "fail")});
})

router.get("/readInstrumentAlgo", (req, res)=>{
    InstrumentAlgo.find((err, data)=>{
        if(err){
            return res.status(500).send(err);
        }else{
            return res.status(200).send(data);
        }
    }).sort({$natural:-1})
})

router.get("/readInstrumentAlgo/:id", (req, res)=>{
    console.log(req.params)
    const {id} = req.params
    InstrumentAlgo.findOne({_id : id})
    .then((data)=>{
        return res.status(200).send(data);
    })
    .catch((err)=>{
        return res.status(422).json({error : "date not found"})
    })
})

module.exports = router;