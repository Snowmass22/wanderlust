
const mongoose=require("mongoose");
const Schema=mongoose.Schema;
 

const orderSchema=new Schema({
    buyer:{
         type:Schema.Types.ObjectId,
        ref:"User",
    },
    seller:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    listing:{
        type:Schema.Types.ObjectId,
        ref:"listing",
    },
    date:{
        type:Date,
        default:Date.now,
    },
    checkin:{
        type:String,
        required:true,
    },
    checkout:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    verfication:{
        type:String,
        required:true,
    }

})

module.exports=mongoose.model("order",orderSchema);


