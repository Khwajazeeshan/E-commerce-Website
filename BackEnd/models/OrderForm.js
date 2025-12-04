import mongoose from "mongoose";

const OrderForm = new mongoose.Schema({
    userId: {
        type: String
    },
    name: {
        type: String
    },
    address: {
        type: String
    },
    postalCode: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    email: {
        type: String
    },
    quantity: {
        type: Number
    },
    ProductId: {
        type: String
    },
    orderDate: {
        type: String
    }

})

export const Order = mongoose.model('OrderForm', OrderForm)