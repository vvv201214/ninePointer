const express = require("express");
const router = express.Router();
require("../../db/conn");
const Instrument = require("../../models/Instruments/instrumentSchema");
const axios = require('axios');

router.post("/instrument", async (req, res)=>{

    const {instrument, exchange, symbol, status, uId, createdOn, lastModified, createdBy, lotSize} = req.body;

    let accessTokenResp = await axios.get("http://localhost:5000/readRequestToken")
    let getAccessToken = (accessTokenResp.data)[0].accessToken
    let apiKeyResp = await axios.get("http://localhost:5000/readAccountDetails")
    let getApiKey = (apiKeyResp.data)[0].apiKey
    const addUrl = 'i=' + exchange + ':' + symbol;
    const url = `https://api.kite.trade/quote?${addUrl}`

    const api_key = getApiKey;
    const access_token = getAccessToken;
    let auth = 'token' + api_key + ':' + access_token;
  
    let authOptions = {
      headers: {
        'X-Kite-Version': '3',
        Authorization: auth,
      },
    };
    const resp = await axios.get(url, authOptions);
    let instrumentToken ;
    for (let elem in resp.data.data) {
        instrumentToken = (resp.data.data[elem].instrument_token);
      }

    if(!instrument || !exchange || !symbol || !status || !uId || !createdOn || !lastModified || !createdBy || !lotSize || !instrumentToken){
        console.log(instrumentToken);
        console.log(req.body);
        console.log("data nhi h pura");
        return res.status(422).json({error : "plz filled the field..."})
    }

    Instrument.findOne({uId : uId})
    .then((dateExist)=>{
        if(dateExist){
            console.log("data already");
            return res.status(422).json({error : "date already exist..."})
        }
        const instruments = new Instrument({instrument, exchange, symbol, status, uId, createdOn, lastModified, createdBy, lotSize, instrumentToken});

        instruments.save().then(()=>{
            res.status(201).json({massage : "data enter succesfully"});
        }).catch((err)=> res.status(500).json({error:"Failed to enter data"}));
    }).catch(err => {console.log(err, "fail")});
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

module.exports = router;