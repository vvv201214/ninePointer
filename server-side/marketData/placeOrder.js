const axios = require("axios")
const express = require("express");
const router = express.Router();
const getOrderData = require("./retrieveOrder");

router.post("/placeorder", (async (req, res)=>{

    const OrderId = require("../models/TradeDetails/orderIdSchema");
    const TradeData = require("../models/TradeDetails/allTradeSchema");
    const UserTradeData = require("../models/User/userTradeSchema");

    const {exchange, symbol, buyOrSell, Quantity, Price, Product, OrderType, TriggerPrice,
         stopLoss, validity, variety, uId, createdBy, createdOn, last_price, realBuyOrSell,
          realSymbol, realQuantity, instrument, realInstrument, apiKey, accessToken} = req.body;
        console.log("this is req.body", req.body);
    const api_key = apiKey;
    const access_token = accessToken;
    let auth = 'token ' + api_key + ':' + access_token;
    console.log("this is data ",req.body);

    let headers = {
        'X-Kite-Version':'3',
        'Authorization': auth,
        "content-type" : "application/x-www-form-urlencoded"
    }

    axios.post(`https://api.kite.trade/orders/${variety}`, new URLSearchParams({
        "tradingsymbol":realSymbol,
        "exchange":exchange,
        "transaction_type":realBuyOrSell,
        "order_type":OrderType,
        "quantity":realQuantity,
        "product":Product,
        "validity":validity,
        "price":Price,
        "trigger_price": TriggerPrice
    }), {headers : headers})
    .then(async (resp)=>{
        // let orderId = JSON.stringify(resp.data);
 
        console.log("its json data", JSON.stringify(resp.data));
        await getOrderData(apiKey, accessToken, res);
        const {status, data} = resp.data;
        let getOrderResp = await axios.get("http://localhost:5000/readorderdata");
        let getOrderDetails = getOrderResp.data;

        console.log(data.order_id);
        for(let elem of getOrderDetails){
            if(elem.order_id === data.order_id){
                console.log("inside 1st if", elem.exchange_timestamp);
                if(elem.exchange_timestamp === undefined){

                    const { order_id, placed_by, exchange_order_id, status, order_timestamp, exchange_timestamp
                        , variety, exchange, tradingsymbol, order_type, transaction_type, validity, product,
                        quantity, disclosed_quantity, price, average_price, filled_quantity, pending_quantity,
                        cancelled_quantity, market_protection, guid} = elem;

                    OrderId.findOne({createdOn : createdOn})
                    .then((dateExist)=>{
                        if(dateExist){
                            console.log("data already");
                            return res.status(422).json({error : "data already exist..."})
                        }
                        const orderid = new OrderId({order_id , status , uId, createdOn, createdBy, last_price,
                            average_price, quantity, realInstrument, product, transaction_type, 
                             order_timestamp , variety , validity , exchange , 
                              order_type , price , filled_quantity , pending_quantity 
                            , cancelled_quantity , guid , market_protection , disclosed_quantity , tradingsymbol 
                            , placed_by
                        });
                
                        orderid.save().then(()=>{
                        }).catch((err)=> res.status(500).json({error:"Failed to Trade"}));
                    }).catch(err => {console.log(err, "fail")});


                    UserTradeData.findOne({createdOn : createdOn})
                    .then((dateExist)=>{
                        if(dateExist){
                            console.log("data already");
                            return res.status(422).json({error : "data already exist..."})
                        }
                        console.log(instrument);
                        const userTradeData = new UserTradeData({order_id, status, uId, createdOn, 
                            createdBy, last_price, average_price, Quantity, symbol, Product, buyOrSell, 
                            validity, variety, order_timestamp, order_type, exchange});
                
                        console.log(instrument);
                        userTradeData.save().then(()=>{
                            res.status(201).json({massage : "Trade successfull"});
                        }).catch((err)=> res.status(500).json({error:"Failed to Trade"}));
                    }).catch(err => {console.log(err, "fail")});
                }else{
                    const { order_id, placed_by, exchange_order_id, status, order_timestamp, exchange_timestamp
                        , variety, exchange, tradingsymbol, order_type, transaction_type, validity, product,
                        quantity, disclosed_quantity, price, average_price, filled_quantity, pending_quantity,
                        cancelled_quantity, market_protection, guid} = elem
                    OrderId.findOne({createdOn : createdOn})
                    .then((dateExist)=>{
                        if(dateExist){
                            console.log("data already");
                            return res.status(422).json({error : "data already exist..."})
                        }
                        const orderid = new OrderId({order_id, status, uId, createdOn, createdBy, last_price,
                            average_price, quantity , realInstrument , product , transaction_type , 
                            exchange_order_id , order_timestamp , variety , validity , exchange , 
                            exchange_timestamp , order_type , price , filled_quantity , pending_quantity 
                            , cancelled_quantity , guid , market_protection , disclosed_quantity , tradingsymbol 
                            , placed_by
                        });
                
                        orderid.save().then(()=>{
                        }).catch((err)=> res.status(500).json({error:"Failed to Trade"}));
                    }).catch(err => {console.log(err, "fail")});


                    UserTradeData.findOne({createdOn : createdOn})
                    .then((dateExist)=>{
                        if(dateExist){
                            console.log("data already");
                            return res.status(422).json({error : "data already exist..."})
                        }
                        const userTradeData = new UserTradeData({order_id, status, uId, createdOn, 
                            createdBy, last_price, average_price, Quantity, symbol, Product, buyOrSell, 
                            validity, variety, order_timestamp, order_type, amount:(Quantity*last_price), exchange});
                
                        userTradeData.save().then(()=>{
                            res.status(201).json({massage : "Trade successfull"});
                        }).catch((err)=> res.status(500).json({error:"Failed to Trade"}));
                    }).catch(err => {console.log(err, "fail")});
                }

            }
        }

    }).catch((err)=>{
        console.log("error to getting order_id", err);
    })
}))



module.exports = router;