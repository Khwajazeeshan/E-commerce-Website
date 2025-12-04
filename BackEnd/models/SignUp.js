import mongoose from "mongoose";

const SignUp = new mongoose.Schema({
    first: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    paswrd: {
        type: String
    },
    conPaswrd: {
        type: String
    }
})

export const SignUP = mongoose.model('Signup', SignUp);