require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")
const bcrypt = require("bcrypt")
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())


async function DBConnection(){
    try{
        await mongoose.connect(process.env.DBURL)
        console.log("db connected")
    }catch(error){
        console.log("db connected")
    }
}

DBConnection()
const userRoutes = require("./routers/userRoute")
app.use("/api",userRoutes)

const productRoutes = require("./routers/productRoute")
app.use("/api",productRoutes)

const cartRoutes = require("./routers/cartRoute")
app.use("/api",cartRoutes)

app.listen(port,()=>{
    console.log("server running")
})
