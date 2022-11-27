const express = require("express");
const router = express.Router();
require("../../db/conn");
const ProductMapping = require("../../models/AlgoBox/productMappingSchema");

router.post("/productMapping", (req, res)=>{
    const {ProductNameIncoming, IncomingProductCode, ProductNameOutgoing, OutgoingProductCode, Status, lastModified, uId, createdBy, createdOn} = req.body;

    if(!ProductNameIncoming || !IncomingProductCode || !ProductNameOutgoing || !OutgoingProductCode || !Status || !lastModified || !uId || !createdBy || !createdOn){
        console.log(req.body);
        console.log("data nhi h pura");
        return res.status(422).json({error : "plz filled the field..."})
    }

    ProductMapping.findOne({uId : uId})
    .then((dateExist)=>{
        if(dateExist){
            console.log("data already");
            return res.status(422).json({error : "date already exist..."})
        }
        const productMapping = new ProductMapping({ProductNameIncoming, IncomingProductCode, ProductNameOutgoing, OutgoingProductCode, Status, lastModified, uId, createdBy, createdOn});

        productMapping.save().then(()=>{
            res.status(201).json({massage : "data enter succesfully"});
        }).catch((err)=> res.status(500).json({error:"Failed to enter data"}));
    }).catch(err => {console.log(err, "fail")});
})

router.get("/readProductMapping", (req, res)=>{
    ProductMapping.find((err, data)=>{
        if(err){
            return res.status(500).send(err);
        }else{
            return res.status(200).send(data);
        }
    }).sort({$natural:-1})
})

router.get("/readProductMapping/:id", (req, res)=>{
    console.log(req.params)
    const {id} = req.params
    ProductMapping.findOne({_id : id})
    .then((data)=>{
        return res.status(200).send(data);
    })
    .catch((err)=>{
        return res.status(422).json({error : "date not found"})
    })
})

module.exports = router;