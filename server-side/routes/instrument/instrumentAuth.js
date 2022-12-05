const express = require("express");
const router = express.Router();
require("../../db/conn");
const Instrument = require("../../models/Instruments/instrumentSchema");
const axios = require('axios');

router.post("/instrument", async (req, res)=>{

    try{
        const {instrument, exchange, symbol, status, uId, createdOn, lastModified, createdBy, lotSize} = req.body;
        console.log(req.body);
        let getAccessToken;
        let getApiKey;
        let instrumentToken ;

        let accessTokenResp = await axios.get("http://localhost:5000/readRequestToken")
        let apiKeyResp = await axios.get("http://localhost:5000/readAccountDetails")

        for(let elem of accessTokenResp.data){
            for(let subElem of apiKeyResp.data){
                if(elem.accountId === subElem.accountId && elem.status === "Active" && subElem.status === "Active"){
                    getAccessToken = elem.accessToken;
                    getApiKey = subElem.apiKey
                }
            }
        }
    
        
        const addUrl = 'i=' + exchange + ':' + symbol;
        const url = `https://api.kite.trade/quote?${addUrl}`

        let auth = 'token' + getApiKey + ':' + getAccessToken;
        
        let authOptions = {
            headers: {
                'X-Kite-Version': '3',
                Authorization: auth,
            },
        };
        const resp = await axios.get(url, authOptions);
        for (let elem in resp.data.data) {
            instrumentToken = (resp.data.data[elem].instrument_token);
        }

        if(!instrument || !exchange || !symbol || !status || !uId || !createdOn || !lastModified || !createdBy || !lotSize || !instrumentToken){
            console.log(instrumentToken);
            console.log(req.body);
            console.log("data nhi h pura");
            return res.status(422).json({error : "Any of one feild is incorrect..."})
        }
    
        Instrument.findOne({uId : uId})
        .then((dateExist)=>{
            if(dateExist){
                console.log("data already");
                return res.status(422).json({error : "date already exist..."})
            }
            const instruments = new Instrument({instrument, exchange, symbol, status, uId, createdOn, lastModified, createdBy, lotSize, instrumentToken});
            console.log("instruments", instruments)
            instruments.save().then(()=>{
                res.status(201).json({massage : "data enter succesfully"});
            }).catch((err)=> res.status(500).json({error:"Failed to enter data"}));
        }).catch(err => {console.log(err, "fail")});

    } catch(err) {
        return new Error(err);
    }
})

router.get("/readInstrumentDetails", (req, res)=>{
    Instrument.find((err, data)=>{
        if(err){
            return res.status(500).send(err);
        }else{
            return res.status(200).send(data);
        }
    }).sort({$natural:-1})
})

router.get("/readInstrumentDetails/:id", (req, res)=>{
    console.log(req.params)
    const {id} = req.params
    Instrument.findOne({_id : id})
    .then((data)=>{
        return res.status(200).send(data);
    })
    .catch((err)=>{
        return res.status(422).json({error : "date not found"})
    })
})

module.exports = router;