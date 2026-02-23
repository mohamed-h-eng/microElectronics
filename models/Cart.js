const mongoose = require("mongoose")

const productItem = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    quantity:{
        type:Number,
        min:1
    }
})

const cartSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    items:[productItem],
    // total:Number,
    // number_of_items:Number

},{timestamps:true})


const Cart = mongoose.model("Cart",cartSchema)
module.exports = Cart