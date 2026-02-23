const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    items:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }],
    // total:Number,
    // number_of_items:Number

},{timestamps:true})


const Cart = mongoose.model("Cart",cartSchema)
module.exports = Cart