import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key_change_in_production";
const PORT = process.env.PORT || 3000;

// ========== AUTH ROUTES ==========

// ✅ SIGNUP - Create new user
app.post("/api/auth/signup", async (req: any, res: any) => {
  try {
    const { username, password, displayName } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    if (username.length < 3 || password.length < 3) {
      return res.status(400).json({ error: "Username and password must be at least 3 characters" });
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: "MEMBER",
        balance: 0,
        active: true,
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        balance: user.balance,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ LOGIN - User login
app.post("/api/auth/login", async (req: any, res: any) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check if user is active
    if (!user.active) {
      return res.status(403).json({ error: "User account is disabled" });
    }

    // Verify password
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        balance: user.balance,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ========== PROTECTED ROUTES ==========

// Middleware: Verify JWT token
function verifyToken(req: any, res: any, next: any) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

// ✅ GET user profile
app.get("/api/user/profile", verifyToken, async (req: any, res: any) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { id: true, username: true, role: true, balance: true, active: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Health check
app.get("/api/health", (req: any, res: any) => {
  res.json({ status: "OK", message: "Server is running" });
});

// ✅ Catch all 404
app.use((req: any, res: any) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
const PORT_NUM = parseInt(PORT as string);
app.listen(PORT_NUM, () => {
  console.log("\n==================================================");
  console.log("✅ Server running on http://localhost:" + PORT_NUM);
  console.log("==================================================\n");
  console.log("📋 Available Routes:");
  console.log("  POST   /api/auth/signup     - Create new account");
  console.log("  POST   /api/auth/login      - Login");
  console.log("  GET    /api/user/profile    - Get user profile (protected)");
  console.log("  GET    /api/health          - Health check\n");
});

export default app;
