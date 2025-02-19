import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register", async(req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);

        // Tạo user mới
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashed
        })

        //Save to db
        const user = await newUser.save();
        res.status(200).json(user)
        res.send("Đăng ký thành công!");
    } catch (error) {
        res.status(500).json(error)
    }
});

export default router;
