const express=require('express')
const AuthController=require('../controller/auth.controller')
const router=express.Router()

router.post('/register',AuthController.userRegisterController)
router.post('/login',AuthController.userLogin)


module.exports=router   