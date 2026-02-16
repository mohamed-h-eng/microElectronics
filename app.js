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
var login_session = 0;

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
        login_session = 123456
    }catch(error){
        console.log("error login")
    }
})

const Product = require("./models/Product")

app.post("/api/products",async(req,res)=>{
    try{
        // get data
        const {name, price, stock} = req.body
        const {id} = req.query
        // validate
        const [user] = await User.find({_id:id})
        if(user.role == "admin"){
            Product.create({name,price,stock});
        }else{
            return res.status(404).json({msg:"unathourized access"})
        }
        const product = await Product.findOne({name})
        if(product) return res.status(201).json({msg:"Product already exist"})
        // response
        res.status(200).json({
            msg:"Product added successfully"
        })
    }catch(error){
        console.log("error creating product")
        console.log(error)
    }
})

app.get("/api/products",async(req,res)=>{
    try{
        // get data
        const {name} = req.body
        // validate
        const product = await Product.findOne({name})
        if(!product) return res.status(404).json({msg:"Product not found"})
        // response
        res.status(200).json({
            msg:"Product found",
            data:product
        })
    }catch(error){
        console.log("error creating product")
    }
})

app.get("/api/search",async(req,res)=>{
    try{
        // get data
        const {name} = req.query
        // validate
        const product = await Product.findOne({name})
        if(!product) return res.status(404).json({msg:"Product not found"})
        // response
        res.status(200).json({
            msg:"Product found",
            data:product
        })
    }catch(error){
        console.log("error creating product")
    }
})

const Cart = require("./models/Cart")
app.post("/api/cart",async(req,res)=>{
    try{
        // get data
        const {user_id, items, total, number_of_items} = req.body
        // validate
        let cart = await Cart.findOne({user_id})
        if(!cart){
            cart= await Cart.create({user_id, items,total,number_of_items});
        }else{
            return res.status(201).json({
                msg:"cart already exist just udpate items",
                data:await cart.populate("items")
                
            })
        }
        // response
        res.status(200).json({
            msg:"Cart created successfully",
            data:await cart.populate("items")
        })
    }catch(error){
        console.log("error creating cart")
        console.log(error)
    }
})
app.listen(port,()=>{
    console.log("server running")
})
