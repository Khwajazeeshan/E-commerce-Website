import express from 'express';
import { SignUP } from '../models/SignUp.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { storeform } from '../models/StoreForm.js';
import { productform } from '../models/ProductForm.js';
import { verifyToken } from '../middleware/jwt.js';
import { Order } from '../models/OrderForm.js';
import { Addtocart } from '../models/AddToCart.js';
import multer from 'multer'; // Import multer for handling file uploads
import fs from 'fs'; // Import fs for file system operations

const router = express.Router();
const SECRET_KEY = "MQPRT4409TXzeeWER47PJTWQW";

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true }); // Ensure the directory exists
        }
        cb(null, uploadPath); // Specify the folder to save the uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Generate a unique filename
    }
});
const upload = multer({ storage });

// Store Signup Data...............................................
router.post("/add", async (req, res) => {
    try {
        const { first, email, phone, paswrd, conPaswrd } = req.body;
        const user = await SignUP.findOne({ email });
        if (user) return res.json({ success: false, message: "Email already exists!" });
        const userPhone = await SignUP.findOne({ phone });
        if (userPhone) return res.json({ success: false, message: "Phone Number already exists!" });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(paswrd, salt);
        const newUser = await SignUP.create({ first, email, phone, paswrd: hashedPassword, conPaswrd: hashedPassword });
        const token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: '1h' }); // Changed expiration time to 1 hour
        return res.json({ success: true, message: "Signup successful!", token, user: { name: first, email } });
    } catch (err) {
        res.status(500).json({ message: "Signup Failed", error: err });
    }
});

// Check Log in Data...............................................
router.post("/login", async (req, res) => {
    try {
        const { email, paswrd } = req.body;
        const user = await SignUP.findOne({ email });
        if (!user) return res.status(404).json({ success: false, message: "User Not Found" });
        const isMatch = await bcrypt.compare(paswrd, user.paswrd);
        if (!isMatch) return res.status(401).json({ success: false, message: "Incorrect Password" });
        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" }); // Changed expiration time to 1 hour
        return res.json({ success: true, message: "Login Successful!", token, user: { name: user.first, email } });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err });
    }
});

// Add Store-form Data............................................... 
router.post("/storeform", verifyToken, async (req, res) => {
    try {
        const { storeName, description, address, businessType } = req.body;
        const userId = req.user?.id;
        const store = await storeform.findOne({ storeName });
        if (store) {
            return res.json({ success: false, message: "Store Name Already Exist!" });
        }
        await storeform.create({ storeName, description, address, businessType, userId });
        return res.json({ success: true, message: "Store Created Successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Create Store Failed...", error: err });
    }
});

// Add Product-Form Data...............................................
router.post("/addproduct", verifyToken, upload.single('productImage'), async (req, res) => {
    try {
        const { productName, description, productPrice, quantity } = req.body;
        const userId = req.user?.id;
        const productImage = req.file ? req.file.path : null; // Get the file path
        await productform.create({ productName, description, productPrice, quantity, productImage, userId }); // Save the file path in the database
        return res.json({ success: true, message: "Product Added Successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Add Product Failed...", error: err });
    }
});

// Place Order Data...............................................
router.post("/placeorder/:ProductId", verifyToken, async (req, res) => {
    try {
        const { ProductId } = req.params;
        const { name, address, postalCode, phoneNumber, email, quantity,orderDate } = req.body;
        const userId = req.user?.id;
        await Order.create({ name, address, postalCode, phoneNumber, email, quantity, userId, ProductId,orderDate });
        return res.json({ success: true, message: "Order Placed Successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Place Order Failed...", error: err });
    }
});

router.post("/addtocart", verifyToken, async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user?.id;
        await Addtocart.create({ productId, userId });
        return res.status(201).json({ success: true, message: "Product added to cart successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Add to cart failed.", error: err.message });
    }
});


export default router;