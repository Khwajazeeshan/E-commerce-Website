import mongoose from "mongoose";

const cart = new mongoose.Schema({
    userId: {
        type: String
    },
    productId: {
        type: String
    }
})
export const Addtocart = mongoose.model('Addtocart', cart)