const express = require("express");
const { restart } = require("nodemon");
const router = express.Router();
require("../../db/conn");
const LiveCompanyTradeData = require("../../models/TradeDetails/liveTradeSchema");

router.get("/readlivetradecompany", (req, res)=>{
    LiveCompanyTradeData.find((err, data)=>{
        if(err){
            return res.status(500).send(err);
        }else{
            return res.status(200).send(data);
        }
    }).sort({$natural:-1})
})

router.get("/companylivetradedata/:id", (req, res)=>{
    console.log(req.params)
    const {id} = req.params
    LiveCompanyTradeData.findOne({_id : id})
    .then((data)=>{
        return res.status(200).send(data);
    })
    .catch((err)=>{
        return res.status(422).json({error : "date not found"})
    })
})

router.get("/companylivetradedatatodaywithemail/:email", (req, res)=>{
    const {email} = req.params
    let date = new Date();
    let todayDate = `${(date.getFullYear())}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    console.log(todayDate);
    LiveCompanyTradeData.find({order_timestamp: {$regex: todayDate}, userId: {$regex: email}, status: "COMPLETE"})
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

router.get("/readlivetradecompanyDate", (req, res)=>{
    let date = new Date();
    let todayDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${(date.getFullYear())}`
    const {email} = req.params
    console.log(todayDate)
    LiveCompanyTradeData.find({order_timestamp: {$regex: todayDate}})
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

router.get("/readlivetradecompanypagination/:skip/:limit", (req, res)=>{
    console.log(req.params)
    const {limit, skip} = req.params
    LiveCompanyTradeData.find().sort({order_timestamp:-1}).skip(skip).limit(limit)
    .then((data)=>{
        return res.status(200).send(data);
    })
    .catch((err)=>{
        return res.status(422).json({error : "date not found"})
    })
})

router.get("/readlivetradecompanytodaydatapagination/:skip/:limit", (req, res)=>{
    let date = new Date();
    let todayDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${(date.getFullYear())}`
    const {limit, skip} = req.params
    LiveCompanyTradeData.find({order_timestamp: {$regex: todayDate}}).sort({order_timestamp:-1}).skip(skip).limit(limit)
    .then((data)=>{
        return res.status(200).send(data);
    })
    .catch((err)=>{
        return res.status(422).json({error : "date not found"})
    })
})



router.get("/updatelivetradedata", async(req, res)=>{
    // let date = new Date();
    // let id = data._id;
    // let todayDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${(date.getFullYear())}`
    // const {email} = req.params
    // console.log(todayDate)
    let datatoupdate = await LiveCompanyTradeData.find()
    console.log(datatoupdate);


        for(let i = 0; i< datatoupdate.length; i++ ){
            console.log(datatoupdate[i]);
            await LiveCompanyTradeData.findByIdAndUpdate(datatoupdate[i]._id, {trade_time : datatoupdate[i].order_timestamp},
                function (err, trade_time) {
                    if (err){
                        console.log(err)
                    }
                    else{
                        console.log("Trade Time : ", trade_time);
                    }
        }).clone();
        }
})

router.get("/updatelivetradedataamount", async(req, res)=>{
    // let date = new Date();
    // let id = data._id;
    // let todayDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${(date.getFullYear())}`
    // const {email} = req.params
    // console.log(todayDate)
    let datatoupdate = await LiveCompanyTradeData.find()
    console.log(datatoupdate);


        for(let i = 0; i< datatoupdate.length; i++ ){
            //console.log(datatoupdate[i]);
            await LiveCompanyTradeData.findByIdAndUpdate(datatoupdate[i]._id, {amount : Number(datatoupdate[i].Quantity) * datatoupdate[i].average_price},
                function (err, trade_time) {
                    if (err){
                        console.log(err)
                    }
                    else{
                        console.log("Trade Time : ", trade_time);
                    }
        }).clone();
        }
})




module.exports = router;