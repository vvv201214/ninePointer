const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({

    uId:{
        type: String,
        required : true
    },
    modifiedOn:{
        type: String,
        required : true
    },
    modifiedBy:{
        type: String,
        required : true
    },
    userName:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    isTradeEnable:{
        type: Boolean,
        required: true
    },
    isAlgoEnable:{
        type: Boolean,
        required: true
    },
    isRealTradeEnable:{
        type: Boolean,
        required: true
    }
})

const permissionDetail = mongoose.model("user-permission", permissionSchema);
module.exports = permissionDetail;