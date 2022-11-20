const express = require("express");
const router = express.Router();
require("../../db/conn");
const UserDetail = require("../../models/User/userDetailSchema");

router.post("/userdetail", (req, res)=>{
    const {status, uId, createdOn, lastModified, createdBy, name, designation, email, mobile, degree, dob, gender, trading_exp, location, last_occupation, joining_date, role, userId} = req.body;
    console.log(req.body)
    if(!status || !uId || !createdOn || !lastModified || !createdBy || !name || !designation || !email || !mobile || !degree || !dob || !gender || !trading_exp || !location || !last_occupation || !joining_date || !role){
        console.log("data nhi h pura");
        return res.status(422).json({error : "plz filled the field..."})
    }

    UserDetail.findOne({email : email})
    .then((dateExist)=>{
        if(dateExist){
            console.log("data already");
            return res.status(422).json({error : "date already exist..."})
        }
        const userDetail = new UserDetail({status, uId, createdOn, lastModified, createdBy, name, designation, email, mobile, degree, dob, gender, trading_exp, location, last_occupation, joining_date, role, userId});
        console.log(userDetail)
        userDetail.save().then(()=>{
            res.status(201).json({massage : "data enter succesfully"});
        }).catch((err)=> res.status(500).json({error:"Failed to enter data"}));
    }).catch(err => {console.log(err, "fail")});
})

router.get("/readuserdetails", (req, res)=>{
    UserDetail.find((err, data)=>{
        if(err){
            return res.status(500).send(err);
        }else{
            return res.status(200).send(data);
        }
    }).sort({$natural:-1})
})

module.exports = router;