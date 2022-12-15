const express = require("express");
const router = express.Router();
require("../../db/conn");
const MockTradeDetails = require("../../models/mock-trade/mockTradeCompanySchema");
const MockTradeDetailsUser = require("../../models/mock-trade/mockTradeUserSchema");
const axios = require('axios');

router.post("/mocktradecompany", async (req, res)=>{

    let {exchange, symbol, buyOrSell, Quantity, Price, Product, OrderType,
         TriggerPrice, stopLoss, validity, variety, last_price, createdBy, userId,
          createdOn, uId, algoBox, order_id, instrumentToken, realTrade} = req.body
        console.log(req.body);
        console.log("in the company auth");
    const {algoName, transactionChange, instrumentChange
        , exchangeChange, lotMultipler, productChange, tradingAccount} = algoBox

    if(!exchange || !symbol || !buyOrSell || !Quantity || !Product || !OrderType || !validity || !variety || !last_price || !algoName || !transactionChange || !instrumentChange || !exchangeChange || !lotMultipler || !productChange || !tradingAccount || !instrumentToken){
        console.log(Boolean(exchange)); console.log(Boolean(symbol)); console.log(Boolean(buyOrSell)); console.log(Boolean(Quantity)); console.log(Boolean(Product)); console.log(Boolean(OrderType)); console.log(Boolean(validity)); console.log(Boolean(variety)); console.log(Boolean(last_price)); console.log(Boolean(algoName)); console.log(Boolean(transactionChange)); console.log(Boolean(instrumentChange)); console.log(Boolean(exchangeChange)); console.log(Boolean(lotMultipler)); console.log(Boolean(productChange)); console.log(Boolean(tradingAccount));
        console.log("data nhi h pura");
        return res.status(422).json({error : "please fill all the feilds..."})
    }

    if(buyOrSell === "SELL"){
        Quantity = "-"+Quantity;
    }

    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"
    let originalLastPrice;
    let a;
    try{
        // async function func(){
        
            let liveData = await axios.get(`${baseUrl}api/v1/getliveprice`)
            for(let elem of liveData.data){
                if(elem.instrument_token == instrumentToken){

                    originalLastPrice = elem.last_price;
                    console.log("originalLastPrice 38 line", originalLastPrice)
                }
            }
            
            // return originalLastPrice; 
            // originalLastPrice = await 
        // }

        //  a = func();


    } catch(err){
        return new Error(err);
    }


    MockTradeDetails.findOne({uId : uId})
    .then((dateExist)=>{
        if(dateExist){
            console.log("data already");
            return res.status(422).json({error : "date already exist..."})
        }
        const mockTradeDetails = new MockTradeDetails({
            status:"COMPLETE", uId, createdBy, average_price: originalLastPrice, Quantity, Product, buyOrSell, order_timestamp: createdOn,
            variety, validity, exchange, order_type: OrderType, symbol, placed_by: "ninepointer", userId,
             algoBox:{algoName, transactionChange, instrumentChange, exchangeChange, 
            lotMultipler, productChange, tradingAccount}, order_id, instrumentToken
        });

        console.log("mockTradeDetails comapny", mockTradeDetails);
        mockTradeDetails.save().then(()=>{
            // res.status(201).json({massage : "data enter succesfully"});
        }).catch((err)=> res.status(500).json({error:"Failed to enter data"}));
    }).catch(err => {console.log(err, "fail")});

    MockTradeDetailsUser.findOne({uId : uId})
    .then((dateExist)=>{
        if(dateExist){
            console.log("data already");
            return res.status(422).json({error : "date already exist..."})
        }
        const mockTradeDetailsUser = new MockTradeDetailsUser({
            status:"COMPLETE", uId, createdBy, average_price: originalLastPrice, Quantity, Product, buyOrSell, order_timestamp: createdOn,
            variety, validity, exchange, order_type: OrderType, symbol, placed_by: "ninepointer", userId,
            isRealTrade: realTrade, order_id, instrumentToken
        });

        console.log("mockTradeDetails", mockTradeDetailsUser);
        mockTradeDetailsUser.save().then(()=>{
            res.status(201).json({massage : "data enter succesfully"});
        }).catch((err)=> {
            // res.status(500).json({error:"Failed to enter data"})
        });
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



  