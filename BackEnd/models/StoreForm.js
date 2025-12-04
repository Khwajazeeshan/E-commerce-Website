import mongoose from "mongoose";

const Storeform = new mongoose.Schema({
    userId: {
        type: String
    },
    storeName: {
        type: String
    },
    description: {
        type: String
    },
    address: {
        type: String
    },
    businessType: {
        type: String
    }
})

export const storeform = mongoose.model('Storeform', Storeform)