const Cart = require("../models/Cart")

const cartCreate = async(req,res)=>{
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
module.exports = {cartCreate ,cartGet}