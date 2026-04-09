const { default: mongoose } = require("mongoose")
const monggose=require("mongoose")
const ledgerSchema=new mongoose.Schema({
    account:{
        tpye:mongoose.Schema.Types.ObjectId,
        ref:"Account",
        required:[true,"Ledger Must be associated with the account"],
        index:true,
        immutable:true
    },
    amount:{
        type:Number,
        required:[true,"Amount is required for creating the ledger entry"],
        immutable:true
    },
    transaction:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"transaction",
        required:[true,"Ledger must be associated with a transaction"],
        index:true,
        immutable:true
    },
    type:{
        type:String,
        enum:{
            values:["CREDITED","DEBITED"],
            message:"Types can be credited or debited"
        },
        required:[true,"Ledgeer type is Required"],
        immutable:true
    }
})

function preventLedgerModification(){
    throw new Error("Ledger Entries are immutable and cannot be modified or deleted");

}

ledgerSchema.pre('findOneAndUpdate',preventLedgerModification);
ledgerSchema.pre('updateOne',preventLedgerModification);
ledgerSchema.pre('deleteOne',preventLedgerModification);
ledgerSchema.pre('remove',preventLedgerModification);
ledgerSchema.pre('deleteMany',preventLedgerModification);