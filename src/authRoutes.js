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
      res.json({ message: "Bạn đang ở vai trò admin." });
    } else if (decoded.role === "user") {
      res.json({ message: "Bạn đang ở vai trò user." });
    } else {
      res.status(403).json({ message: "Access denied. Invalid role." });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
});

export default router;
