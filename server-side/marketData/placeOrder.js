const axios = require("axios")
const express = require("express");
const router = express.Router();
const getOrderData = require("./retrieveOrder");
const BrokerageDetail = require("../models/Trading Account/brokerageSchema");


router.post("/placeorder", (async (req, res)=>{
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"
    const CompanyTradeData = require("../models/TradeDetails/liveTradeSchema");
    const TradeData = require("../models/TradeDetails/allTradeSchema");

    let {exchange, symbol, buyOrSell, Quantity, Price, Product, OrderType,
        TriggerPrice, stopLoss, validity, variety, last_price, createdBy,
         createdOn, uId, algoBox, order_id, instrumentToken, realTrade, realBuyOrSell, realQuantity, apiKey, accessToken, userId} = req.body
       console.log(req.body);
       console.log("in the company auth");
    const {algoName, transactionChange, instrumentChange
       , exchangeChange, lotMultipler, productChange, tradingAccount} = algoBox

       const brokerageDetailBuy = await BrokerageDetail.find({transaction:"BUY"});
       const brokerageDetailSell = await BrokerageDetail.find({transaction:"SELL"});

    const api_key = apiKey;
    const access_token = accessToken;
    let auth = 'token ' + api_key + ':' + access_token;
    console.log("this is data ",req.body);

    let headers = {
        'X-Kite-Version':'3',
        'Authorization': auth,
        "content-type" : "application/x-www-form-urlencoded"
    }
    let orderData;
    if(variety === "amo"){
        orderData = new URLSearchParams({
            "tradingsymbol":symbol,
            "exchange":exchange,
            "transaction_type":realBuyOrSell,
            "order_type":OrderType,
            "quantity":realQuantity,
            "product":Product,
            "validity":validity,
            "price":Price,
            "trigger_price": TriggerPrice
        })
    } else if(variety === "regular"){
        orderData = new URLSearchParams({
            "tradingsymbol":symbol,
            "exchange":exchange,
            "transaction_type":realBuyOrSell,
            "order_type":OrderType,
            "quantity":realQuantity,
            "product":Product,
            "validity":validity
        })
    }

    axios.post(`https://api.kite.trade/orders/${variety}`, orderData, {headers : headers})
    .then(async (resp)=>{

        console.log("its json data", JSON.stringify(resp.data));
        const order_Id = resp.data.data.order_id
        console.log("order_id", resp.data.data.order_id);
        await getOrderData(apiKey, accessToken, res, order_Id);
        const {status, data} = resp.data;
        let getOrderResp = await axios.get(`${baseUrl}api/v1/readorderdata`);
        let getOrderDetails = getOrderResp.data;
        console.log("now i am in placeorder");
        console.log("this is order-id", data.order_id);


        TradeData.findOne({order_id : data.order_id})
        .then((data)=>{
            console.log("i am receiving data", data)
            if(data.exchange_timestamp === undefined){
                console.log("in the if condition of exchange", data.exchange_timestamp);
                let { order_id, placed_by, exchange_order_id, status, order_timestamp, exchange_timestamp
                    , variety, exchange, tradingsymbol, order_type, transaction_type, validity, product,
                    quantity, disclosed_quantity, price, average_price, filled_quantity, pending_quantity,
                    cancelled_quantity, market_protection, guid } = data;
                    if(transaction_type === "SELL"){
                        quantity = -quantity;
                    }


                    function buyBrokerage(totalAmount){
                        let brokerage = Number(brokerageDetailBuy[0].brokerageCharge);
                        // let totalAmount = Number(Details.last_price) * Number(quantity);
                        let exchangeCharge = totalAmount * (Number(brokerageDetailBuy[0].exchangeCharge) / 100);
                        // console.log("exchangeCharge", exchangeCharge, totalAmount, (Number(brokerageDetailBuy[0].exchangeCharge)));
                        let gst = (brokerage + exchangeCharge) * (Number(brokerageDetailBuy[0].gst) / 100);
                        let sebiCharges = totalAmount * (Number(brokerageDetailBuy[0].sebiCharge) / 100);
                        let stampDuty = totalAmount * (Number(brokerageDetailBuy[0].stampDuty) / 100);
                        // console.log("stampDuty", stampDuty);
                        let sst = totalAmount * (Number(brokerageDetailBuy[0].sst) / 100);
                        let finalCharge = brokerage + exchangeCharge + gst + sebiCharges + stampDuty + sst;
                        return finalCharge;
                    }
                
                    function sellBrokerage(totalAmount){
                        let brokerage = Number(brokerageDetailSell[0].brokerageCharge);
                        // let totalAmount = Number(Details.last_price) * Number(quantity);
                        let exchangeCharge = totalAmount * (Number(brokerageDetailSell[0].exchangeCharge) / 100);
                        let gst = (brokerage + exchangeCharge) * (Number(brokerageDetailSell[0].gst) / 100);
                        let sebiCharges = totalAmount * (Number(brokerageDetailSell[0].sebiCharge) / 100);
                        let stampDuty = totalAmount * (Number(brokerageDetailSell[0].stampDuty) / 100);
                        let sst = totalAmount * (Number(brokerageDetailSell[0].sst) / 100);
                        let finalCharge = brokerage + exchangeCharge + gst + sebiCharges + stampDuty + sst;
                
                        return finalCharge
                    }
                
                    let brokerageCompany;
                
                    if(transaction_type === "BUY"){
                        brokerageCompany = buyBrokerage(Math.abs(Number(realQuantity)) * average_price);
                    } else{
                        brokerageCompany = sellBrokerage(Math.abs(Number(realQuantity)) * average_price);
                    }
                

                CompanyTradeData.findOne({order_id : order_id})
                .then((dateExist)=>{
                    if(dateExist){
                        console.log("data already");
                        return res.status(422).json({error : "data already exist..."})
                    }
                    const companyTradeData = new CompanyTradeData({
                        // order_id , status , uId, createdOn, createdBy, real_last_price,
                        // average_price, Quantity:quantity, realInstrument, Product:product, buyOrSell:transaction_type, 
                        //  order_timestamp , variety , validity , exchange , 
                        //   order_type , price , filled_quantity , pending_quantity 
                        // , cancelled_quantity , guid , market_protection , disclosed_quantity , symbol:tradingsymbol 
                        // , placed_by, userId, realBrokerage, realAmount, tradeBy
                        disclosed_quantity, price, 
                        filled_quantity, pending_quantity, cancelled_quantity, market_protection, guid,
                        status, uId, createdBy, average_price, Quantity: quantity, 
                        Product:product, buyOrSell:transaction_type, order_timestamp: order_timestamp,
                        variety, validity, exchange, order_type: order_type, symbol:tradingsymbol, placed_by: placed_by, userId,
                         algoBox:{algoName, transactionChange, instrumentChange, exchangeChange, 
                        lotMultipler, productChange, tradingAccount}, order_id, instrumentToken, brokerage: brokerageCompany,
                        tradeBy: createdBy, isRealTrade: realTrade, amount: (Number(quantity)*average_price)
            
                    });
                    console.log("this is CompanyTradeData", companyTradeData);
                    companyTradeData.save().then(()=>{
                    }).catch((err)=> res.status(500).json({error:"Failed to Trade company side"}));
                }).catch(err => {console.log(err, "fail")});

            }else{
                let { order_id, placed_by, exchange_order_id, status, order_timestamp, exchange_timestamp
                    , variety, exchange, tradingsymbol, order_type, transaction_type, validity, product,
                    quantity, disclosed_quantity, price, average_price, filled_quantity, pending_quantity,
                    cancelled_quantity, market_protection, guid} = data

                    if(transaction_type === "SELL"){
                        quantity = -quantity;
                    }


                    function buyBrokerage(totalAmount){
                        let brokerage = Number(brokerageDetailBuy[0].brokerageCharge);
                        // let totalAmount = Number(Details.last_price) * Number(quantity);
                        let exchangeCharge = totalAmount * (Number(brokerageDetailBuy[0].exchangeCharge) / 100);
                        // console.log("exchangeCharge", exchangeCharge, totalAmount, (Number(brokerageDetailBuy[0].exchangeCharge)));
                        let gst = (brokerage + exchangeCharge) * (Number(brokerageDetailBuy[0].gst) / 100);
                        let sebiCharges = totalAmount * (Number(brokerageDetailBuy[0].sebiCharge) / 100);
                        let stampDuty = totalAmount * (Number(brokerageDetailBuy[0].stampDuty) / 100);
                        // console.log("stampDuty", stampDuty);
                        let sst = totalAmount * (Number(brokerageDetailBuy[0].sst) / 100);
                        let finalCharge = brokerage + exchangeCharge + gst + sebiCharges + stampDuty + sst;
                        return finalCharge;
                    }
                
                    function sellBrokerage(totalAmount){
                        let brokerage = Number(brokerageDetailSell[0].brokerageCharge);
                        // let totalAmount = Number(Details.last_price) * Number(quantity);
                        let exchangeCharge = totalAmount * (Number(brokerageDetailSell[0].exchangeCharge) / 100);
                        let gst = (brokerage + exchangeCharge) * (Number(brokerageDetailSell[0].gst) / 100);
                        let sebiCharges = totalAmount * (Number(brokerageDetailSell[0].sebiCharge) / 100);
                        let stampDuty = totalAmount * (Number(brokerageDetailSell[0].stampDuty) / 100);
                        let sst = totalAmount * (Number(brokerageDetailSell[0].sst) / 100);
                        let finalCharge = brokerage + exchangeCharge + gst + sebiCharges + stampDuty + sst;
                
                        return finalCharge
                    }
                
                    let brokerageCompany;
                
                    if(transaction_type === "BUY"){
                        brokerageCompany = buyBrokerage(Math.abs(Number(realQuantity)) * average_price);
                    } else{
                        brokerageCompany = sellBrokerage(Math.abs(Number(realQuantity)) * average_price);
                    }

                    
                CompanyTradeData.findOne({order_id : order_id})
                .then((dateExist)=>{
                    if(dateExist){
                        console.log("data already");
                        return res.status(422).json({error : "data already exist..."})
                    }

                    const companyTradeData = new CompanyTradeData({
                        exchange_order_id, exchange_timestamp, disclosed_quantity, price, 
                        filled_quantity, pending_quantity, cancelled_quantity, market_protection, guid,
                        status, uId, createdBy, average_price, Quantity: quantity, 
                        Product:product, buyOrSell:transaction_type, order_timestamp: order_timestamp,
                        variety, validity, exchange, order_type: order_type, symbol:tradingsymbol, placed_by: placed_by, userId,
                         algoBox:{algoName, transactionChange, instrumentChange, exchangeChange, 
                        lotMultipler, productChange, tradingAccount}, order_id, instrumentToken, brokerage: brokerageCompany,
                        tradeBy: createdBy, isRealTrade: realTrade, amount: (Number(quantity)*average_price)
                    });
            
                    companyTradeData.save().then(()=>{
                    }).catch((err)=> res.status(500).json({error:"Failed to Trade"}));
                }).catch(err => {console.log(err, "fail")});

            }


        }).catch((err)=>{
            console.log("i am receiving error", err);
        })

    }).catch((err)=>{
        console.log("error to getting order_id", err);
    })
}))



module.exports = router;