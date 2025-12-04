import mongoose from "mongoose";

const ProductForm = new mongoose.Schema({
    userId: {
        type: String
    },
    productName: {
        type: String
    },
    description: {
        type: String
    },
    productPrice: {
        type: Number
    },
    quantity: {
        type: Number
    },
    productImage: {
        type: String // Add this field to store the image path
    }
})

export const productform = mongoose.model('ProductForm', ProductForm)