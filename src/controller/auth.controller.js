const userModel=require('../models/user.model')
async function userRegisterController(req,res){
    const{email,password,name}=req.body;

    const UserExists=await userModel.findOne({email})
    if(UserExists){
        return res.status(422).json({
            message:"User Already Exists",
            status:"failed"
        })
    }
}

module.exports={
    userRegisterController
}