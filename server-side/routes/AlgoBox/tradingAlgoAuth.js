const express = require("express");
const router = express.Router();
require("../../db/conn");
const TradingAlgo = require("../../models/AlgoBox/tradingAlgoSchema");

router.post("/tradingalgo", (req, res)=>{
    const {algoName, transactionChange, instrumentChange, status, exchangeChange, lotMultipler, productChange, tradingAccount, lastModified, uId, createdBy, createdOn} = req.body;

    if(!algoName || !transactionChange || !instrumentChange || !status || !exchangeChange || !lotMultipler || !productChange || !tradingAccount || !lastModified || !uId || !createdBy || !createdOn){
        console.log(req.body);
        console.log("data nhi h pura");
        return res.status(422).json({error : "plz filled the field..."})
    }

    TradingAlgo.findOne({uId : uId})
    .then((dateExist)=>{
        if(dateExist){
            console.log("data already");
            return res.status(422).json({error : "date already exist..."})
        }
        const tradingAlgo = new TradingAlgo({algoName, transactionChange, instrumentChange, status, exchangeChange, lotMultipler, productChange, tradingAccount, lastModified, uId, createdBy, createdOn});

        tradingAlgo.save().then(()=>{
            res.status(201).json({massage : "data enter succesfully"});
        }).catch((err)=> res.status(500).json({error:"Failed to enter data"}));
    }).catch(err => {console.log(err, "fail")});
})

router.get("/readtradingAlgo", (req, res)=>{

    TradingAlgo.find((err, data)=>{
        if(err){
            return res.status(500).send(err);
        }else{
            return res.status(200).send(data);
        }
    }).sort({$natural:-1})
})

router.get("/readtradingAlgo/:id", (req, res)=>{
    console.log(req.params)
    const {id} = req.params
    TradingAlgo.findOne({_id : id})
    .then((data)=>{
        return res.status(200).send(data);
    })
    .catch((err)=>{
        return res.status(422).json({error : "date not found"})
    })
})


module.exports = router;