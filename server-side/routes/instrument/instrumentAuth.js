const express = require("express");
const router = express.Router();
require("../../db/conn");
const Instrument = require("../../models/Instruments/instrumentSchema");
const axios = require('axios');
const fetchToken = require("../../marketData/generateSingleToken");
const RequestToken = require("../../models/Trading Account/requestTokenSchema");
const Account = require("../../models/Trading Account/accountSchema");
var KiteTicker = require('kiteconnect').KiteTicker;




let date = new Date();
let today = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`

  async function accessToken(){
    let getAccessToken = await RequestToken.find();
    return getAccessToken;
  }
 
  async function apiKey(){
    let apiKey = await Account.find();
    return apiKey;
  }

  var accessTokenResp = [];
  accessToken().then((res)=>{
    // console.log("res", res)
    accessTokenResp = res;
    // console.log("accessTokenResp", accessTokenResp);
  })

  let apiKeyResp = []
  apiKey().then((res)=>{
    // console.log("res", res)
    apiKeyResp = res;
    // console.log("apiKeyResp", apiKeyResp);
  })

  let getAccessToken;
  let getApiKey;
  setTimeout(()=>{

    console.log("getAccessToken", accessTokenResp);


       for(let elem of accessTokenResp){
       for(let subElem of apiKeyResp){
         console.log("inside 2");
           if(elem.accountId === subElem.accountId && elem.generatedOn === today && elem.status === "Active" && subElem.status === "Active"){
               getAccessToken = elem.accessToken;
               getApiKey = subElem.apiKey
           }
       }
     }
 
     console.log(getAccessToken, getApiKey);
 
 
    var ticker = new KiteTicker({
            // api_key: 'nq0gipdzk0yexyko',
            // access_token: 'SRsDbH6dcBo7kce85M3tagzOj5s4aGX5',
            api_key: getApiKey,
            access_token: getAccessToken,
          });
    
    
    // let eventEmitOnError ;
    
    // let newCors = process.env.NODE_ENV === "production" ? "http://3.110.187.5/" : "http://localhost:3000"
    // const io = new Server(9000, {
    //   cors: {
    
    //     origin: newCors,
    //     //  origin: "http://3.110.187.5/",
    
    //     methods: ['GET', 'POST', 'PATCH'],
    //   },
    // });
    // let socket1 = '';
    // io.on("connection", (socket) => {
    //   console.log('client socket is' + socket.id);
    //   // socket1 = socket;
    //   socket.on('hi', (data) => {
    //     eventEmitOnError = data;
    //     // console.log(data);
    //     parameters(io, socket, ticker);
    //   });
    // });
  },4000)


router.post("/instrument", async (req, res)=>{

    try{
        let {instrument, exchange, symbol, status, uId, createdOn, lastModified, createdBy, lotSize, contractDate, maxLot} = req.body;
        console.log(req.body);

        let instrumentToken = await fetchToken(exchange, symbol);
        console.log("instrumentToken", instrumentToken);
        let firstDateSplit = (contractDate).split(" ");
        let secondDateSplit = firstDateSplit[0].split("-");
        contractDate = `${secondDateSplit[2]}-${secondDateSplit[1]}-${secondDateSplit[0]}`

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
            const instruments = new Instrument({instrument, exchange, symbol, status, uId, createdOn, lastModified, createdBy, lotSize, instrumentToken, contractDate, maxLot});
            console.log("instruments", instruments)
            instruments.save().then(()=>{
                ticker.disconnect();
                res.status(201).json({massage : "data enter succesfully"});
            }).catch((err)=> res.status(500).json({error:"Failed to enter data"}));
        }).catch(err => {console.log(err, "fail")});

    } catch(err) {
        res.status(500).json({error:"Failed to enter data Check access token"});
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

router.put("/readInstrumentDetails/:id", async (req, res)=>{
    console.log(req.params)
    console.log( req.body)
    let {Exchange, Symbole, contract_Date} = req.body;
    
    if(contract_Date !== undefined){
        let firstDateSplit = (contract_Date).split(" ");
        let secondDateSplit = firstDateSplit[0].split("-");
        contract_Date = `${secondDateSplit[2]}-${secondDateSplit[1]}-${secondDateSplit[0]}`
    }


    // const token = 1232444;
    // console.log(token, req.body)
    try{ 
        const {id} = req.params
        const token = await fetchToken(Exchange, Symbole);
        const instrument = await Instrument.findOneAndUpdate({_id : id}, {
            $set:{ 
                instrument: req.body.Instrument,
                exchange: req.body.Exchange,
                symbol: req.body.Symbole,
                status: req.body.Status,
                lastModified: req.body.lastModified,  
                lotSize: req.body.LotSize,
                instrumentToken: token,
                contractDate: req.body.contract_Date, 
                maxLot: req.body.maxLot
            }
        })
        console.log("this is role", instrument);
        res.send(instrument)
    } catch (e){
        res.status(500).json({error:"Failed to edit data Check access token"});
    }
})

router.delete("/readInstrumentDetails/:id", async (req, res)=>{
    console.log(req.params)
    try{
        const {id} = req.params
        const instrument = await Instrument.deleteOne({_id : id})
        console.log("this is userdetail", instrument);
        // res.send(userDetail)
        res.status(201).json({massage : "data delete succesfully"});
    } catch (e){
        res.status(500).json({error:"Failed to delete data"});
    }
})

module.exports = router;
