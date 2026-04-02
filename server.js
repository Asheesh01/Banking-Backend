const app=require('./src/app')
const database=require('./src/config/db.js')

database();

app.listen(3000,()=>{
   
    console.log("Server is running in port 3000")
})