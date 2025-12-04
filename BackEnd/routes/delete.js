import express from 'express';
import bcrypt from 'bcryptjs';
import { SignUP } from '../models/SignUp.js';
import { storeform } from '../models/StoreForm.js';
import { productform } from '../models/ProductForm.js'; // Add this import
import { verifyToken } from '../middleware/jwt.js';
import { Addtocart } from '../models/AddToCart.js';

const router = express.Router();

router.delete("/delete/:id", async (req, res) => {
    try {
        const user = await SignUP.findById(req.params.id);
        if (!user) return res.json({ success: false, message: "User Not Found" });
        await SignUP.findByIdAndDelete(req.params.id);
        return res.json({ success: true, message: "User Deleted Successfully!" });
    } catch (err) {
        res.json({ message: "Server Error", error: err });
    }
});

// Delete User Account Permanently Route................
router.delete("/deleteAccount", verifyToken, async (req, res) => {
    try {
        const { DeletePassword } = req.body;
        const userId = req.user?.id;
        const user = await SignUP.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        const isMatch = await bcrypt.compare(DeletePassword, user.paswrd);
        if (!isMatch) {
            return res.status(404).json({ message: "Incorrect Password" });
        }
        await SignUP.findByIdAndDelete(userId);
        res.json({ message: "Account deleted successfully!" });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

// Delete User Store Permanently Route................
router.delete("/deletestore", verifyToken, async (req, res) => {
    try {
        const { DeletePassword } = req.body;
        const userId = req.user?.id;
        const user = await SignUP.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }
        const isMatch = await bcrypt.compare(DeletePassword, user.paswrd);
        if (!isMatch) {
            return res.status(404).json({ success: false, message: "Incorrect Password" });
        }
        await storeform.findOneAndDelete({ userId }); // Ensure storeform is used correctly
        return res.json({ success: true, message: "Store deleted successfully!" });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
});

// Delete Individual Product....
router.delete("/deleteproduct/:id", verifyToken, async (req, res) => {
    const { Password } = req.body;
    const userId = req.user?.id;
    try {
        const user = await SignUP.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }
        const isMatch = await bcrypt.compare(Password, user.paswrd);
        if (!isMatch) {
            return res.status(404).json({ success: false, message: "Incorrect Password!" });
        }
        const product = await productform.findOne({ _id: req.params.id, userId });
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found!" });
        }
        await productform.findByIdAndDelete(req.params.id);
        return res.json({ success: true, message: "Product Deleted Successfully." });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
});

// Delete All Products....
router.delete("/deleteallproducts", verifyToken, async (req, res) => {
    const { Password } = req.body;
    const userId = req.user?.id;
    try {
        const user = await SignUP.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }
        const isMatch = await bcrypt.compare(Password, user.paswrd);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Incorrect Password!" }); // Changed to 401
        }
        const products = await productform.find({ userId });
        if (products.length === 0) { // Check if the array is empty
            return res.status(404).json({ success: false, message: "No products found!" });
        }
        await productform.deleteMany({ userId });
        return res.json({ success: true, message: "Products Deleted Successfully." });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
});

// Remove the item From Add To Cart................
router.delete("/addtocart/:productId", verifyToken, async (req, res) => {
    const { productId } = req.params;
    const userId = req.user?.id;
    try {
        const item = await Addtocart.findOneAndDelete({ productId, userId }); // Match productId and userId
        return res.json({ success: true, message: "Product removed from cart successfully!" });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
});

export default router;