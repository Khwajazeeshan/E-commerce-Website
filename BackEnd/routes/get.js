import express from 'express';
import mongoose from 'mongoose';
import { SignUP } from '../models/SignUp.js';
import { verifyToken } from '../middleware/jwt.js';
import jwt from 'jsonwebtoken'; // Add this import
import { storeform } from '../models/StoreForm.js'; // Add this import
import { productform } from '../models/ProductForm.js'; // Add this import
import { Addtocart } from '../models/AddToCart.js';
import { Order } from '../models/OrderForm.js'; // Add this import

const router = express.Router();
const SECRET_KEY = "MQPRT4409TXzeeWER47PJTWQW";

// Verify Token ............
router.get("/verifyToken", verifyToken, (req, res) => {
    res.json({ message: "Token is valid", user: req.user });
});

// Refresh JWT Token..........
router.get("/refreshToken", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided!" });
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY, { ignoreExpiration: true }); // Ignore expiration check
        const newToken = jwt.sign({ id: decoded.id }, SECRET_KEY, { expiresIn: '5h' }); // Increase expiration time
        return res.json({ message: "Token generated successfully", newToken });
    } catch (error) {
        return res.status(401).json({ message: "Token Refresh Failed!" });
    }
});

// Protected Route Example
router.get("/protected", verifyToken, (req, res) => {
    res.json({ message: "You have access to protected data!" });
});

// Fetch All user Information Route.........
router.get("/info", async (req, res) => {
    try {
        const info = await SignUP.find();
        res.json(info)
    }
    catch (err) {
        res.json({ message: "Error in Fetching", error: err })
    }
});

// Fetch User Data in Profile Page Route............
router.get("/UserInfo", verifyToken, async (req, res) => {
    const userId = req.user?.id;
    try {
        const user = await SignUP.findById(userId)
        return res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: "Error in Fetching User Information", error: err });
    }
})

// Check Store Status.....
router.get("/checkstore", verifyToken, async (req, res) => {
    const userId = req.user?.id;
    try {
        const storeInfo = await storeform.findOne({ userId });
        if (!storeInfo) {
            return res.json({ success: false });
        }
        return res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: "Error in Fetching Store Status", error: err });
    }
});


// Fetch Store Name Route............
router.get("/storeinfo", verifyToken, async (req, res) => {
    const userId = req.user?.id; // Ensure this is the correct user ID
    try {
        const storeInfo = await storeform.findOne({ userId }); // Fetch store info by userId
        if (!storeInfo) {
            return res.status(404).json({ message: "Store not found" });
        }
        return res.json({ storeName: storeInfo.storeName }); // Only send storeName
    } catch (err) {
        res.status(500).json({ message: "Error in Fetching Store Information", error: err });
    }
})

// Fetch Store Information Route............
router.get("/storedetail", verifyToken, async (req, res) => {
    const userId = req.user?.id; // Ensure this is the correct user ID
    try {
        const storeInfo = await storeform.findOne({ userId }); // Fetch store info by userId
        if (!storeInfo) {
            return res.status(404).json({ message: "Store not found" });
        }
        return res.json(storeInfo); // Send storeInfo directly
    } catch (err) {
        res.status(500).json({ message: "Error in Fetching Store Information", error: err });
    }
})

// Fetch Product Details Route............
router.get("/productdetail", verifyToken, async (req, res) => {
    const userId = req.user?.id; // Ensure this is the correct user ID
    try {
        const product = await productform.find({ userId }); // Fetch store info by userId
        return res.json(product); // Send products directly
    } catch (err) {
        res.status(500).json({ message: "Error in Fetching Product Details", error: err });
    }
})

// Fetch Product Details by ID Route............
router.get("/productdetail/:id", async (req, res) => {
    const { id } = req.params
    try {
        const product = await productform.findById(id)
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        return res.json(product)
    } catch (err) {
        res.status(500).json({ message: "Error in Fetching Product Details", error: err })
    }
})

// Fetch All Product Details for Home Page Route............
router.get("/Allproducts", async (req, res) => {
    try {
        const product = await productform.find(); // Fetch store info by userId
        return res.json(product); // Send products directly
    } catch (err) {
        res.status(500).json({ message: "Error in Fetching Product Details", error: err });
    }
})

// Fetch Add To Cart Details...........
router.get("/addtoCart", verifyToken, async (req, res) => {
    const userId = req.user?.id;
    try {
        const cartItems = await Addtocart.find({ userId }).select('productId'); // Fetch product IDs in one query
        if (!cartItems.length) {
            return res.json({ message: "No Product Found in Cart" });
        }
        const productIds = cartItems.map(item => item.productId); // Extract product IDs
        const cartData = await productform.find({ _id: { $in: productIds } }); // Fetch product details

        // Include productId in the response
        const enrichedCartData = cartData.map(product => {
            const cartItem = cartItems.find(item => item.productId.toString() === product._id.toString());
            return { ...product.toObject(), productId: cartItem.productId }; // Include productId
        });

        return res.json(enrichedCartData);
    } catch (err) {
        res.status(500).json({ message: "Error in Fetching Cart Data", error: err });
    }
})

// Fetch My Order Details...........
router.get("/MyOrder", verifyToken, async (req, res) => {
    const userId = req.user?.id;
    try {
        const orders = await Order.find({ userId }).select('ProductId orderDate');
        if (!orders.length) {
            return res.status(404).json({ message: "No Orders Found" });
        }

        // Filter valid product IDs only
        const productIds = orders
            .map(order => order.ProductId)
            .filter(id => id && mongoose.Types.ObjectId.isValid(id));

        if (!productIds.length) {
            return res.status(400).json({ message: "Invalid Product IDs in Orders" });
        }

        const orderDetails = await productform.find({ _id: { $in: productIds } });

        const enrichedOrderDetails = orderDetails.map(product => {
            const order = orders.find(order => order.ProductId?.toString() === product._id.toString());
            return { ...product.toObject(), orderDate: order?.orderDate };
        });

        return res.json(enrichedOrderDetails);
    } catch (err) {
        console.error("Error in Fetching My Order Data:", err);
        res.status(500).json({ message: "Error in Fetching My Order Data", error: err });
    }
});


export default router;