import express from 'express';
import { SignUP } from '../models/SignUp.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.put("/forget", async (req, res) => {
    try {
        const { email, password } = req.body;
        const isEmail = await SignUP.findOne({ email });
        if (!isEmail) return res.json({ success: false, message: "User Not found!" });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await SignUP.findOneAndUpdate(
            { email },
            { paswrd: hashedPassword, conPaswrd: hashedPassword },
            { new: true }
        );
        return res.json({ success: true, message: "Password Updated Successfully!" });
    } catch (err) {
        res.json({ message: "Error in Changing Password", error: err });
    }
});

export default router;