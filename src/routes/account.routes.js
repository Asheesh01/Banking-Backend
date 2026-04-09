const express=require('express')
const authmiddleware=require('../middleware/auth.middleware')
const accounControler=require('../controller/account.controller')
const router=express.Router()


router.post("/",authmiddleware.authMiddleware,accounControler.createaccount)
module.exports=router