const express = require("express");
const router = express.Router();
require("../../db/conn");
const Permission = require("../../models/User/permissionSchema");

router.post("/permission", (req, res)=>{
    const {uId, modifiedOn, modifiedBy, userName, userId, isTradeEnable, isAlgoEnable, isRealTradeEnable} = req.body;
    console.log(req.body)
    if(!uId || !modifiedOn || !modifiedBy || !userName || !userId || !isTradeEnable || !isAlgoEnable || !isRealTradeEnable){
        console.log("data nhi h pura");
        return res.status(422).json({error : "Please fill all the fields..."})
    }

    Permission.findOne({uId : uId})
    .then((dateExist)=>{
        if(dateExist){
            console.log("data already");
            return res.status(422).json({error : "date already exist..."})
        }
        const permission = new Permission({uId, modifiedOn, modifiedBy, userName, userId, isTradeEnable, isAlgoEnable, isRealTradeEnable});
        permission.save().then(()=>{
            res.status(201).json({massage : "data enter succesfully"});
        }).catch((err)=> res.status(500).json({error:"Failed to enter data"}));
    }).catch(err => {console.log(err, "fail")});
})

router.get("/readpermission", (req, res)=>{
    Permission.find((err, data)=>{
        if(err){
            return res.status(500).send(err);
        }else{
            return res.status(200).send(data);
        }
    }).sort({$natural:-1})
})

router.get("/readpermission/:id", (req, res)=>{
    console.log(req.params)
    const {id} = req.params
    Permission.findOne({_id : id})
    .then((data)=>{
        return res.status(200).send(data);
    })
    .catch((err)=>{
        return res.status(422).json({error : "date not found"})
    })
})

router.put("/readpermission/:id", async (req, res)=>{
    console.log(req.params)
    console.log("this is body", req.body);
    try{
        const {id} = req.params
        const permission = await Permission.findOneAndUpdate({_id : id}, {
            $set:{ 
                modifiedOn: req.body.modifiedOn,
                modifiedBy: req.body.modifiedBy,
                userName: req.body.userName,
                userId: req.body.userId,
                isTradeEnable: req.body.isTradeEnable,
                isAlgoEnable: req.body.isAlgoEnable,
                isRealTradeEnable: req.body.isRealTradeEnable,
            }
        })
        console.log("this is role", permission);
        res.send(permission)
        // res.status(201).json({massage : "data edit succesfully"});
    } catch (e){
        res.status(500).json({error:"Failed to edit data"});
    }
})

router.patch("/readpermission/:id", async (req, res)=>{
    console.log(req.params)
    console.log("this is body", req.body);
    try{ 
        const {id} = req.params
        const permission = await Permission.findOneAndUpdate({_id : id}, {
            $set:{ 
                modifiedOn: req.body.modifiedOn,
                modifiedBy: req.body.modifiedBy,
                userName: req.body.userName,
                userId: req.body.userId,
            }
        })
        console.log("this is role", permission);
        res.send(permission)
        // res.status(201).json({massage : "data edit succesfully"});
    } catch (e){
        res.status(500).json({error:"Failed to edit data"});
    }
})

router.delete("/readpermission/:id", async (req, res)=>{
    console.log(req.params)
    try{
        const {id} = req.params
        const permission = await Permission.deleteOne({_id : id})
        console.log("this is userdetail", permission);
        // res.send(userDetail)
        res.status(201).json({massage : "data delete succesfully"});
    } catch (e){
        res.status(500).json({error:"Failed to delete data"});
    }
})


module.exports = router;
