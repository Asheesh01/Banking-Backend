const express =require('express')
const cookieparser=require('cookie-parser')
const authRouter=require('./routes/auth.routes')
const accountRouter=require('./routes/account.routes')

const app=express()
app.use(express.json())
app.use(cookieparser())


app.use('/api/auth',authRouter)
app.use('/api/account',accountRouter)

module.exports=app