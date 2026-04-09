const userModel=require('../models/user.model')
const dotenv=require('dotenv')
const jwt=require('jsonwebtoken')

async function authMiddleware(req,res,next){
 const token =
            req.cookies?.token ||   // from cookies
            req.headers.authorization?.split(" ")[1];
                if(!token){
        return res.status(401).json({
            message:"Unauthorize access, token is missing"
        })
    }
    try {
        const decode=jwt.verify(token,process.env.SECRET_KEY)
        const user=await userModel.findById(decode.userId)
        req.user=user
        return next()
    } catch (error) {
        res.status(401).json({
            message:"Unauthorize access, token is missing"
        })
        
    }
}

module.exports={
authMiddleware
}