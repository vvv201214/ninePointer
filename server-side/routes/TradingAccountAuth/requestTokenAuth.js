const express = require("express");
const router = express.Router();
require("../../db/conn");
const RequestToken = require("../../models/Trading Account/requestTokenSchema")

router.post("/requestToken", (req, res)=>{
    const {accountId, accessToken, requestToken, status, generatedOn, lastModified, createdBy, uId} = req.body;

    if(!accountId || !accessToken || !requestToken || !status || !generatedOn || !lastModified || !createdBy || !uId){
        console.log("data nhi h pura");
        return res.status(422).json({error : "plz filled the field..."})
    }

    RequestToken.findOne({accountId : accountId})
    .then((accountIdExist)=>{
        if(accountIdExist){
            console.log("accountId already");
            return res.status(422).json({error : "account Id already exist..."})
        }
        const requestTokens = new RequestToken({accountId, accessToken, requestToken, status, generatedOn, lastModified, createdBy, uId});

        requestTokens.save().then(()=>{
            res.status(201).json({massage : "data enter succesfully"});
        }).catch((err)=> res.status(500).json({error:"Failed to enter data"}));
    }).catch(err => {console.log(err, "fail")});
    
})

router.get("/readRequestToken", (req, res)=>{
    RequestToken.find((err, data)=>{
        if(err){
            return res.status(500).send(err);
        }else{
            return res.status(200).send(data);
        }
    }).sort({$natural:-1})
})

module.exports = router;