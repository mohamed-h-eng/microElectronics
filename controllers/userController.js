const User = require("../models/User")
const bcrypt = require("bcrypt")

const userRegister = async(req,res)=>{
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
}

const userLogin = async (req,res)=>{
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
}

module.exports = {
    userRegister,
    userLogin
}