const Product = require("../models/Product")
const User = require("../models/User")


const createProduct = async (req,res) =>{
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
}

const getProduct = async (req,res)=>{
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
}

module.exports = {
    createProduct,
    getProduct
}