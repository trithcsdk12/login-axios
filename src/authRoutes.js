import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
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
  {
    id: 3,
    username: "guest",
    password: "000000",
    role: "guest",
  },
];
console.log("JWT_SECRET:", process.env.JWT_SECRET);

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
    },
  });
});

// POST: /api/auth/users
router.post("/users", (req, res) => {
  res.json({ users });
});

router.get("/check-role", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role === "admin") {
      res.status(200).json({ message: "Bạn đang ở vai trò admin." });
    } else if (decoded.role === "user") {
      res.status(200).json({ message: "Bạn đang ở vai trò user." });
    } else if (decoded.role === "guest") {
      res.status(200).json({ message: "Bạn đang ở vai trò khách." });
    } else {
      res.status(403).json({ message: "Access denied. Invalid role." });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
});

export default router;
