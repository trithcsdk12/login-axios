import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

const users = [
    {
      id: 1,
      username: "admin",
      password: "123456",
      role: "admin",
    },
    {
      id: 2,
      username: "user",
      password: "password", 
      role: "user",
    },
  ];
  

// POST: /api/auth/login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.json({
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
    },
  });
});

export default router;
