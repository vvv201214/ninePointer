const express = require("express");
const router = express.Router();
require("../../db/conn");
const MockTradeDetails = require("../../models/mock-trade/mockTradeUserSchema");

router.post("/mocktradeuser", (req, res)=>{

    const {exchange, symbol, buyOrSell, Quantity, Price, Product, OrderType,
         TriggerPrice, stopLoss, validity, variety, last_price, createdBy, userId,
          createdOn, uId, isRealTrade, algoBox} = req.body

    const {algoName, transactionChange, instrumentChange
        , exchangeChange, lotMultipler, productChange, tradingAccount} = algoBox

    if(!exchange || !symbol || !buyOrSell || !Quantity || !Product || !OrderType || !validity || !variety || !last_price || !algoName || !transactionChange || !instrumentChange || !exchangeChange || !lotMultipler || !productChange || !tradingAccount){
        console.log(exchange); console.log(symbol); console.log(buyOrSell); console.log(Quantity); console.log(Product); console.log(OrderType); console.log(validity); console.log(variety); console.log(last_price); console.log(algoName); console.log(transactionChange); console.log(instrumentChange); console.log(exchangeChange); console.log(lotMultipler); console.log(productChange); console.log(tradingAccount);
        console.log("data nhi h pura");
        return res.status(422).json({error : "please fill all the feilds..."})
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
            isRealTrade, algoBox:{algoName, transactionChange, instrumentChange, exchangeChange, 
            lotMultipler, productChange, tradingAccount}
        });

        mockTradeDetails.save().then(()=>{
            res.status(201).json({massage : "data enter succesfully"});
        }).catch((err)=> res.status(500).json({error:"Failed to enter data"}));
    }).catch(err => {console.log(err, "fail")});
})

router.get("/readmocktradeuser", (req, res)=>{
    MockTradeDetails.find((err, data)=>{
        if(err){
            return res.status(500).send(err);
        }else{
            return res.status(200).send(data);
        }
    }).sort({$natural:-1})
})

router.get("/readmocktradeuser/:id", (req, res)=>{
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
