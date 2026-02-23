/*
TODO:
    validate product quantity with stock
    delete products from cart
    add products to cart
*/

const Cart = require("../models/Cart")
const User = require("../models/User")
const Product = require("../models/Product")


const addCartController = async(req,res)=>{
    try{
        // get data
        const {user_id, items, quantity} = req.body
        console.log({user_id, items, quantity})
        
        // validate data
        if(!user_id || !items || !quantity) return res.status(400).json({msg:"Invalid Data"})
        
        // validate user_id
        const isUser = await User.findById(user_id);
        if(!isUser) return res.status(404).json({msg:"User Not Found"})
        
        // validate if user has a cart or not
        let isCart = await Cart.findOne({user_id})
        if(!isCart){
            isCart= await Cart.create({user_id, items:[]});
        }

        // validate products by id
        const isProduct = {};
        for(let i=0; i<items.length;i++){
            isProduct = await Product.findById(items[i]);
            if(!isProduct) return res.status(404).json({msg:"Product Not Found"})
        }
        // validate quantity with stock
        if (quantity > isProduct.stock) return res.status(200).json({msg:"Insufficient Stock"})
        // else{
        //     return res.status(201).json({
        //         msg:"cart already exist just udpate items",
        //         data:await cart.populate("items")
                
        //     })
        // }
        
        // response
        res.status(200).json({
            msg:"Cart created successfully",
            data:await cart.populate("items")
        })
    }catch(error){
        console.log("error creating cart")
        console.log(error)
    }
}

const cartGet = async(req,res)=>{
    try{
        // get data
        const {user_id} = req.body
        // validate
        let cart = await Cart.findOne({user_id})
        if(!cart){
            res.status(404).json({msg:"cart not found"})
        }
        // response
        res.status(200).json({
            msg:"Cart found successfully",
            data:await cart.populate("items")
        })
    }catch(error){
        console.log("error creating cart")
        console.log(error)
    }
}
module.exports = {addCartController ,cartGet}