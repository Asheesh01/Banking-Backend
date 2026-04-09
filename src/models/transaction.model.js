const mongoose=require("mongoose");

const transactionSchema=new mongoose.Schema({
    fromAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:[true,"Transaction must be associated with the from account"],
        index:true
    },
    toAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:[true,"Transaction must be associated with the to account"],
        index:true
    },
    status:{
        type:String,
        enum:{
            values:["PENDING","COMPLETED","FAILED","REVERSED"],
            message:"status can be either PENDING,COMPLETED,FAILED,REVERSED",
        },
        default:"PENDING"
    },
    account:{
        type:Number,
        required:[true,"Amount is required for creating a transaction"],
        min:[0,"Transaction amount cannot be negative"]
    },
    idempotenceyKey:{
         type:Number,
        required:[true,"IdempotencyKey is required for creating a transaction"],
        index:true,
        unique:true
    }
},{
    timestamps:true
})

const transactionmodel=mongoose.model("transaction",transactionSchema)

module.exports=transactionmodel