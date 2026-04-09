    const transactionModel=require("../models/transaction.model")
    const ledgerModel=require('../models/ledger.model')
    const emailService=require('../services/email.services')
    const accountModel=require('../models/account.model')
    const {getBalance}=require('../models/account.model')
    const mongoose=require('mongoose')
    async function createTransaction(req,res) {

        const{fromAccount,toAccount,amount,idempotencyKey}=req.body


        if(!fromAccount || !toAccount || !amount || !idempotencyKey){
           return res.status(400).json({
                message:"fromAccount,toAccount,amount,idempotencyKey are required"
            })
        }

        const fromUserAccount=await accountModel.findOne({
            _id:fromAccount,
        })

        const toUserAccount=await accountModel.findOne({
            _id:toAccount
        })

        if(!fromUserAccount || !toUserAccount){
            return res.status(400).json({
                message:"Invalid fromAccount or toAccount "
            })
        }
        //check idempotencyKey

        const isTransactionAlreadyExist=await transactionModel.findOne({
            idempotenceyKey:idempotencyKey
        })

        if(isTransactionAlreadyExist){
            if(isTransactionAlreadyExist==="COMPLETED"){
                res.status(400).json({
                    message:"Transaction Already Procced",
                    transaction:isTransactionAlreadyExist
                })
            }
             if(isTransactionAlreadyExist==="PENDING"){
                return res.status(200).json({
                    message:"Transaction is still pending"
                })
             }
              if(isTransactionAlreadyExist==="FAILED"){
                return res.status(200).json({
                    message:"Transaction is failed"
                })
            }
             if(isTransactionAlreadyExist==="REVERSED"){
                return res.status(200).json({
                    message:"Transaction is reversed"
                })
            }
        }

        //Check Account Status
        if(fromAccount.status !=="ACTIVE" || toAccount.status!=="ACTIVE"){
            return res.status(400).json({
                message:"Both fromAccount and toAccount must be ACTIVE to process transaction"
            })
        }

        //  Derive sender balance from ledger
    const balance=await fromUserAccount.getBalance()
    if(balance<amount){
        res.status(400).json({
            message:`Inssufficient balance. CurrentBalance is ${balance}.Requested amount is ${amount}`
        })
    }
// Create Transaction 
const session=await mongoose.startSession()
session.startTransaction()

const transaction=await transactionModel.create({
    fromAccount,
    toAccount,
    amount,
    idempotenceyKey,
    status:"PENDING"
},{session})
        
    }