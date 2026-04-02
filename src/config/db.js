const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
async function database(){
try {
  await  mongoose.connect(process.env.MONGO_URL)
    console.log(" Database connected successfully");
} catch (error) {
    console.log(" Database is not connected ");
    console.log(error.message)
    
}
}

module.exports=database