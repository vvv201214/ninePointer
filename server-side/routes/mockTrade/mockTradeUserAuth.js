const express = require("express");
const router = express.Router();
require("../../db/conn");
const MockTradeDetails = require("../../models/mock-trade/mockTradeUserSchema");
const axios = require('axios');

// function pnlCalculation(data){
//     let hash = new Map();
//     let hashForTraderCount = new Map();
//     let numberOfTrader = 0;
//     //console.log(data)
//     for(let i = data.length-1; i >= 0 ; i--){

//         numberOfTrade += 1;
//         transactionCost += Number(data[i].brokerage);

//         if(!hashForTraderCount.has(data[i].userId)){
//             numberOfTrader += 1;
//             hashForTraderCount.set(data[i].userId, 1);
//         }

//         if(hash.has(data[i].symbol)){
//             let obj = hash.get(data[i].symbol);
//             if(data[i].buyOrSell === "BUY"){
//                 if(obj.totalBuy === undefined || obj.totalBuyLot === undefined){
//                     obj.totalBuy = Number(data[i].average_price) * (Number(data[i].Quantity))
//                     obj.totalBuyLot = (Number(data[i].Quantity))
//                 } else{
//                     obj.totalBuy = obj.totalBuy + Number(data[i].average_price) * (Number(data[i].Quantity))
//                     obj.totalBuyLot = obj.totalBuyLot + (Number(data[i].Quantity)) 
//                 }

//             } if(data[i].buyOrSell === "SELL"){
//                 if( obj.totalSell === undefined || obj.totalSellLot === undefined){

//                     obj.totalSell = Number(data[i].average_price) * (Number(data[i].Quantity))
//                     obj.totalSellLot = (Number(data[i].Quantity)) 
//                 } else{

//                     obj.totalSell = obj.totalSell + Number(data[i].average_price) * (Number(data[i].Quantity))
//                     obj.totalSellLot = obj.totalSellLot + (Number(data[i].Quantity)) 
//                 }

//             }
//         }  else{
//             if(data[i].buyOrSell === "BUY"){
//                 hash.set(data[i].symbol, {
//                     totalBuy : Number(data[i].average_price) * (Number(data[i].Quantity)),
//                     totalBuyLot : (Number(data[i].Quantity)) ,
//                     totalSell: 0,
//                     totalSellLot: 0,
//                     symbol: data[i].symbol,
//                     Product: data[i].Product,
//                     name: data[0].createdBy,
//                     date: ((data[0].order_timestamp).split(" "))[0]
//                 })
//             }if(data[i].buyOrSell === "SELL"){
//                 hash.set(data[i].symbol, {
//                     totalSell : Number(data[i].average_price) * (Number(data[i].Quantity)),
//                     totalSellLot : (Number(data[i].Quantity)) ,
//                     totalBuy : 0,
//                     totalBuyLot: 0,
//                     symbol: data[i].symbol,
//                     Product: data[i].Product,
//                     name: data[0].createdBy,
//                     date: ((data[0].order_timestamp).split(" "))[0]
//                 })
//             }
//         }
//     }

//     let overallPnl = [];
//     for (let value of hash.values()){
//         overallPnl.push(value);
//     }
//     let liveDetailsArr = [];
//     overallPnl.map((elem)=>{
//         tradeData.map((element)=>{
//             if(element.symbol === elem.symbol){
//                 marketData.map((subElem)=>{
//                     if(subElem !== undefined && subElem.instrument_token === element.instrumentToken){
//                         liveDetailsArr.push(subElem)
//                     }
//                 })
//             }
//         })
//     })

//     //console.log(hashForTraderCount)
//     let runningLots;
//     overallPnl.map((elem, index)=>{
//         if(selectUserState === "All user"){
//             name = "All User"
//         }else{
//             name = elem.name;
//         }
//         if(elem.totalBuyLot+elem.totalSellLot === 0){
//             totalPnl += -(elem.totalBuy+elem.totalSell)
//         }else{
//             totalPnl += (-(elem.totalBuy+elem.totalSell-(elem.totalBuyLot+elem.totalSellLot)*liveDetailsArr[index]?.last_price))

//         }
        
//         //console.log( liveDetailsArr[index]?.last_price)
//         //console.log(elem.totalBuy,elem.totalSell,elem.totalBuyLot,elem.totalSellLot, liveDetailsArr[index]?.last_price)
//         lotUsed += Math.abs(elem.totalBuyLot) + Math.abs(elem.totalSellLot);
//         runningLots = elem.totalBuyLot + elem.totalSellLot
//     })
//     let date = (overallPnl[0].date).split("-");
//     let newObj = {
//         brokerage: transactionCost,
//         pnl: totalPnl,
//         name: name,
//         numberOfTrade: numberOfTrade,
//         lotUsed: lotUsed,
//         date: `${date[2]}-${date[1]}-${date[0]}`,
//         numberOfTrader: numberOfTrader,
//         runningLots: runningLots
//     }

//     return newObj;
// }

router.post("/mocktradeuser", async (req, res)=>{

    let {exchange, symbol, buyOrSell, Quantity, Price, Product, OrderType,
         TriggerPrice, stopLoss, validity, variety, last_price, createdBy, userId,
          createdOn, uId, isRealTrade, order_id, instrumentToken} = req.body

          console.log(req.body);
          console.log("in the company auth");

    if(!exchange || !symbol || !buyOrSell || !Quantity || !Product || !OrderType || !validity || !variety || !last_price || !instrumentToken){
        console.log(exchange); console.log(symbol); console.log(buyOrSell); console.log(Quantity); console.log(Product); console.log(OrderType); console.log(validity); console.log(variety); console.log(last_price); console.log(instrumentToken);
        console.log(req.body);
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

    console.log("originalLastPrice", a)
//     MockTradeDetailsUser.findOne({uId : uId})
//     .then((dateExist)=>{
//         if(dateExist){
//             console.log("data already");
//             return res.status(422).json({error : "date already exist..."})
//         }
//         const mockTradeDetailsUser = new MockTradeDetailsUser({
//             status:"COMPLETE", uId, createdBy, average_price: originalLastPrice, Quantity, Product, buyOrSell, order_timestamp: createdOn,
//             variety, validity, exchange, order_type: OrderType, symbol, placed_by: "ninepointer", userId,
//             isRealTrade, order_id, instrumentToken
//         });

//         console.log("mockTradeDetails", mockTradeDetailsUser);
//         mockTradeDetailsUser.save().then(()=>{
//             res.status(201).json({massage : "data enter succesfully"});
//         }).catch((err)=> res.status(500).json({error:"Failed to enter data"}));
//     }).catch(err => {console.log(err, "fail")});
})

router.get("/readmocktradeuser", (req, res)=>{
    MockTradeDetails.find((err, data)=>{
        if(err){
            return res.status(500).send(err);
        }else{
            (data).sort((a, b)=> {

                if (a.order_timestamp < b.order_timestamp) {
                  return 1;
                }
                if (a.order_timestamp > b.order_timestamp) {
                  return -1;
                }
                return 0;
              });
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

router.get("/readmocktradeuseremail/:email", (req, res)=>{
    const {email} = req.params
    MockTradeDetails.find({userId: email})
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
        return res.status(200).send(data);
    })
    .catch((err)=>{
        return res.status(422).json({error : "date not found"})
    })
})


router.get("/readmocktradeuserpnl/:email/:status", (req, res)=>{
    const {email, status} = req.params
    MockTradeDetails.find({userId: email, status:status})
    .then((data)=>{
        return res.status(200).send(data);
    })
    .catch((err)=>{
        return res.status(422).json({error : "date not found"})
    })
})

router.get("/readmocktradeuserDate/:email", (req, res)=>{
    const {email} = req.params
    let date = new Date();
    let todayDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${(date.getFullYear())}`
    console.log(todayDate);
    MockTradeDetails.find({order_timestamp: {$regex: todayDate}, userId: {$regex: email}})
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

router.get("/readmocktradeusertodaydatapagination/:email/:skip/:limit", (req, res)=>{
    const {email, skip, limit} = req.params
    let date = new Date();
    let todayDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${(date.getFullYear())}`
    console.log(todayDate);
    MockTradeDetails.find({order_timestamp: {$regex: todayDate}, userId: {$regex: email}}).sort({order_timestamp:-1}).skip(skip).limit(limit)
    .then((data)=>{
        // (data).sort((a, b)=> {

        //     if (a.order_timestamp < b.order_timestamp) {
        //       return 1;
        //     }
        //     if (a.order_timestamp > b.order_timestamp) {
        //       return -1;
        //     }
        //     return 0;
        //   });
        // data.reverse();
        return res.status(200).send(data);
    })
    .catch((err)=>{
        return res.status(422).json({error : "date not found"})
    })
})

router.get("/readmocktradeuserDate", (req, res)=>{
    let date = new Date();
    let todayDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    const {email} = req.params
    MockTradeDetails.find({order_timestamp: {$regex: todayDate}})
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
        return res.status(200).send(data);
    })
    .catch((err)=>{
        return res.status(422).json({error : "date not found"})
    })
})


router.get("/readmocktradeusertodaydatapagination/:skip/:limit", (req, res)=>{
    let date = new Date();
    let todayDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    const {skip, limit} = req.params
    MockTradeDetails.find({order_timestamp: {$regex: todayDate}}).sort({order_timestamp:-1}).skip(skip).limit(limit)
    .then((data)=>{
        // (data).sort((a, b)=> {

        //     if (a.order_timestamp < b.order_timestamp) {
        //       return 1;
        //     }
        //     if (a.order_timestamp > b.order_timestamp) {
        //       return -1;
        //     }
        //     return 0;
        //   });
        return res.status(200).send(data);
    })
    .catch((err)=>{
        return res.status(422).json({error : "date not found"})
    })
})

router.get("/readmocktradeuserpagination/:email/:skip/:limit", (req, res)=>{
    const {email, skip, limit} = req.params
    MockTradeDetails.find({userId: email}).sort({order_timestamp:-1}).skip(skip).limit(limit)
    .then((data)=>{
        return res.status(200).send(data);
    })
    .catch((err)=>{
        return res.status(422).json({error : "date not found"})
    })
})

router.get("/readmocktradeuserpagination/:skip/:limit", (req, res)=>{
    const {skip, limit} = req.params
    MockTradeDetails.find().sort({order_timestamp:-1}).skip(skip).limit(limit)
    .then((data)=>{
        return res.status(200).send(data);
    })
    .catch((err)=>{
        return res.status(422).json({error : "date not found"})
    })
})

router.get("/readmocktradeuserpariculardatewithemail/:date/:email", (req, res)=>{
    // let date = new Date();
    // let todayDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${(date.getFullYear())}`
    const {date, email} = req.params
    MockTradeDetails.find({order_timestamp: {$regex: date}, userId: email})
    .then((data)=>{
        // (data).sort((a, b)=> {

        //     if (a.order_timestamp < b.order_timestamp) {
        //       return 1;
        //     }
        //     if (a.order_timestamp > b.order_timestamp) {
        //       return -1;
        //     }
        //     return 0;
        //   });
        // data.reverse();
        return res.status(200).send(data);
    })
    .catch((err)=>{
        return res.status(422).json({error : "date not found"})
    })
})

router.get("/readmocktradeuserpariculardate/:date", (req, res)=>{
    // let date = new Date();
    // let todayDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${(date.getFullYear())}`
    const {date} = req.params
    MockTradeDetails.find({order_timestamp: {$regex: date}})
    .then((data)=>{
        // (data).sort((a, b)=> {

        //     if (a.order_timestamp < b.order_timestamp) {
        //       return 1;
        //     }
        //     if (a.order_timestamp > b.order_timestamp) {
        //       return -1;
        //     }
        //     return 0;
        //   });
        // data.reverse();
        return res.status(200).send(data);
    })
    .catch((err)=>{
        return res.status(422).json({error : "date not found"})
    })
})

module.exports = router;
