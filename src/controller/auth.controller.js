const userModel=require('../models/user.model')
const bcrypt=require('bcrypt')
const jsonwebtoken=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config()
async function userRegisterController(req,res){
    try{
        const{email,password,name}=req.body;

    const UserExists=await userModel.findOne({email})
    if(UserExists){
        return res.status(422).json({
            message:"User Already Exists",
            status:"failed"
        })
    }
   
    const hashPassword=await bcrypt.hash(password,10);
    const user=await userModel.create({
        email,
        password:hashPassword,
        name
    })
     const token= jsonwebtoken.sign({userId:user.id},process.env.SECRET_KEY)
     res.cookie("token",token)

     res.status(201).json({
         message: "User registered successfully",
      user: {
        id:user._id,
        email:user.email,
        name:user.name
     },
    token
    })
}
    catch(error){
        res.status(500).json({
            message:"Not signup"
        })
        console.log(error)
    }
}

async function userLogin(req,res){
    try {
        const {email,password}=req.body;
    const user=await userModel.findOne({email}).select("+password");
    if(!user){
        return res.status(401).json({
            message:"User is not register"
        })
    }
    const isValidPassword=await bcrypt.compare(password,user.password)
    if(!isValidPassword){
        return res.status(501).json({
            message:"Password is incorrect"
        })
    }
    const token= jsonwebtoken.sign({userId:user._id},process.env.SECRET_KEY)

    res.cookie("token",token)

    res.status(200).json({
       user:{
         id:user._id,
        email:user.email,
        name:user.name
     },
    token
    })
    } catch (error) {
        res.status(400).json({
            message:"Erro in Login"
        })
    }
}

module.exports={
    userRegisterController,userLogin
}