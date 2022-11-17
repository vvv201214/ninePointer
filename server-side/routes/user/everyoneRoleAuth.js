const express = require("express");
const router = express.Router();
require("../../db/conn");
const Role = require("../../models/User/everyoneRoleSchema");

router.post("/everyonerole", (req, res)=>{
    const {uId, createdOn, lastModified, createdBy, roleName, instruments, tradingAccount, APIParameters, users, algoBox, reports} = req.body;
    console.log(req.body)
    if(!uId || !createdOn || !lastModified || !createdBy || !roleName || !instruments || !tradingAccount || !APIParameters || !users || !algoBox || !reports){
        console.log("data nhi h pura");
        return res.status(422).json({error : "plz filled the field..."})
    }

    Role.findOne({uId : uId})
    .then((dateExist)=>{
        if(dateExist){
            console.log("data already");
            return res.status(422).json({error : "date already exist..."})
        }
        const role = new Role({uId, createdOn, lastModified, createdBy, roleName, instruments, tradingAccount, APIParameters, users, algoBox, reports});
        role.save().then(()=>{
            res.status(201).json({massage : "data enter succesfully"});
        }).catch((err)=> res.status(500).json({error:"Failed to enter data"}));
    }).catch(err => {console.log(err, "fail")});
})

router.get("/readeveryonerole", (req, res)=>{
    Role.find((err, data)=>{
        if(err){
            return res.status(500).send(err);
        }else{
            return res.status(200).send(data);
        }
    }).sort({$natural:-1})
})

module.exports = router;