require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")
const bcrypt = require("bcrypt")
const app = express()
app.use(express.json())
const port = process.env.PORT || 3000

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

const User = require("./models/User")
app.post("/api/register",async(req,res)=>{
    try{
        // get data
        const {username, email, password, role} = req.body;
        // validate
        if(!username || !email || !password) return res.status(400).json({msg:"invalid data"})

        const existUser = await User.findOne({email})
        if (existUser) return res.status(409).json({msg:"Account already exist"})
        // create
        const hashPassword = await bcrypt.hash(password,10)

        const user = await User.create({
            username,
            email,
            password:hashPassword,
            role
        })
        // response
        res.status(201).json({
            msg:"User registered successfully"
        })
    }catch(error){
        res.json({msg:"Error registering user"})
    }
})

app.post("/api/login",async(req,res)=>{
    try{
        // get data
        const {email, password} = req.body
        // validate
        const user = await User.findOne({email})
        if(!user) return res.status(404).json({msg:"Account not found"})
        const matchPassword = await bcrypt.compare(password, user.password)
        if(!matchPassword) return res.status(400).json({msg:"Incorrect password"})
        // response
        res.status(200).json({
            msg:"login success"
        })
    }catch(error){
        console.log("error login")
    }
})
app.listen(port,()=>{
    console.log("server running")
})
