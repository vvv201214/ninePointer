const express = require("express");
const router = express.Router();
require("../../db/conn");
const Account = require("../../models/Trading Account/accountSchema");

router.post("/account", (req, res)=>{
    const {brokerName, accountId, accountName, apiKey, apiSecret, status, uId, createdOn, lastModified, createdBy} = req.body;

    if(!brokerName || !accountId || !accountName || !apiKey || !apiSecret || !status || !uId || !createdOn || !lastModified || !createdBy){
        console.log("data nhi h pura");
        return res.status(422).json({error : "plz filled the field..."})
    }

    Account.findOne({accountId : accountId})
    .then((dateExist)=>{
        if(dateExist){
            console.log("data already");
            return res.status(422).json({error : "date already exist..."})
        }
        const account = new Account({brokerName, accountId, accountName, apiKey, apiSecret, status, uId, createdOn, lastModified, createdBy});

        account.save().then(()=>{
            res.status(201).json({massage : "data enter succesfully"});
        }).catch((err)=> res.status(500).json({error:"Failed to enter data"}));
    }).catch(err => {console.log(err, "fail")});
    
})

router.get("/readAccountDetails", (req, res)=>{
    Account.find((err, data)=>{
        if(err){
            return res.status(500).send(err);
        }else{
            return res.status(200).send(data);
        }
    }).sort({$natural:-1})
})

module.exports = router;