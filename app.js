require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")
const app = express()
app.use(express.json())
const port = process.env.PORT || 8000

async function DBConnection(){
    try{
        await mongoose.connect(process.env.DBURL)
        console.log("db connected")
    }catch(error){
        console.log("db connected")
    }
}

DBConnection()

app.get("/",(req,res)=>{
    res.send("welcome to the root")
    console.log("entry")
})

app.listen(port,()=>{
    console.log("server running")
})
