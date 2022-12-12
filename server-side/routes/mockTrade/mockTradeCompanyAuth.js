const express = require("express");
const router = express.Router();
require("../../db/conn");
const MockTradeDetails = require("../../models/mock-trade/mockTradeCompanySchema");

router.post("/mocktradecompany", (req, res)=>{

    let {exchange, symbol, buyOrSell, Quantity, Price, Product, OrderType,
         TriggerPrice, stopLoss, validity, variety, last_price, createdBy, userId,
          createdOn, uId, algoBox} = req.body

    const {algoName, transactionChange, instrumentChange
        , exchangeChange, lotMultipler, productChange, tradingAccount} = algoBox

    if(!exchange || !symbol || !buyOrSell || !Quantity || !Product || !OrderType || !validity || !variety || !last_price || !algoName || !transactionChange || !instrumentChange || !exchangeChange || !lotMultipler || !productChange || !tradingAccount){
        console.log(Boolean(exchange)); console.log(Boolean(symbol)); console.log(Boolean(buyOrSell)); console.log(Boolean(Quantity)); console.log(Boolean(Product)); console.log(Boolean(OrderType)); console.log(Boolean(validity)); console.log(Boolean(variety)); console.log(Boolean(last_price)); console.log(Boolean(algoName)); console.log(Boolean(transactionChange)); console.log(Boolean(instrumentChange)); console.log(Boolean(exchangeChange)); console.log(Boolean(lotMultipler)); console.log(Boolean(productChange)); console.log(Boolean(tradingAccount));
        console.log("data nhi h pura");
        return res.status(422).json({error : "please fill all the feilds..."})
    }

    if(buyOrSell === "SELL"){
        Quantity = "-"+Quantity;
    }
    MockTradeDetails.findOne({uId : uId})
    .then((dateExist)=>{
        if(dateExist){
            console.log("data already");
            return res.status(422).json({error : "date already exist..."})
        }
        const mockTradeDetails = new MockTradeDetails({
            status:"COMPLETE", uId, createdBy, average_price: last_price, Quantity, Product, buyOrSell, order_timestamp: createdOn,
            variety, validity, exchange, order_type: OrderType, symbol, placed_by: "ninepointer", userId,
             algoBox:{algoName, transactionChange, instrumentChange, exchangeChange, 
            lotMultipler, productChange, tradingAccount}
        });


        mockTradeDetails.save().then(()=>{
            res.status(201).json({massage : "data enter succesfully"});
        }).catch((err)=> res.status(500).json({error:"Failed to enter data"}));
    }).catch(err => {console.log(err, "fail")});
})

router.get("/readmocktradecompany", (req, res)=>{
    MockTradeDetails.find((err, data)=>{
        if(err){
            return res.status(500).send(err);
        }else{
            return res.status(200).send(data);
        }
    }).sort({$natural:-1})
})

router.get("/readmocktradecompany/:id", (req, res)=>{
    console.log(req.params)
    const {id} = req.params
    MockTradeDetails.findOne({_id : id})
    .then((data)=>{
        return res.status(200).send(data);
    })
    .catch((err)=>{
        return res.status(422).json({error : "date not found"})
    })
})

module.exports = router;
