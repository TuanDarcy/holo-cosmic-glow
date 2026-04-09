import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL && process.env.MONGODB_URI) {
  process.env.DATABASE_URL = process.env.MONGODB_URI;
}

if (!process.env.DATABASE_URL) {
  console.warn(
    "[startup] Missing DATABASE_URL/MONGODB_URI environment variable",
  );
}

const app = express();
const prisma = new PrismaClient();
const authRoutes = express.Router();

// ========== CORS CONFIGURATION ==========

const ALLOWED_ORIGINS = ["https://robuxfast.vercel.app"];

const corsOptions: cors.CorsOptions = {
  origin(origin, callback) {
    // Allow requests with no origin (e.g. server-to-server, curl, Postman)
    if (!origin) {
      callback(null, true);
      return;
    }

    const isExplicitlyAllowed = ALLOWED_ORIGINS.includes(origin);
    const isVercelApp = /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);
    const isLocalhost = /^http:\/\/localhost:\d+$/i.test(origin);

    if (isExplicitlyAllowed || isVercelApp || isLocalhost) {
      callback(null, true);
      return;
    }

    console.warn(`[CORS] Blocked request from disallowed origin: ${origin}`);
    callback(new Error(`CORS policy: origin '${origin}' is not allowed`));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Apply CORS before everything else so preflight OPTIONS requests are
// answered immediately, before the JSON body-parser or any route handler runs.
app.use(cors(corsOptions));

// Explicitly handle preflight for every route.
// NOTE: Express 5 does NOT accept "*" wildcard — use regex instead.
app.options(/.*/, cors(corsOptions));

app.use(express.json());

// CORS error handler — catches origin-rejection errors and returns proper JSON
// responses with status 403 instead of falling through to Express's default
// 500 handler (which doesn't set CORS headers on error responses).
app.use((err: any, req: any, res: any, next: any) => {
  if (err && err.message && err.message.startsWith("CORS policy:")) {
    console.error(`[CORS] Error: ${err.message}`);
    return res.status(403).json({ error: err.message });
  }
  next(err);
});

app.use((req, res, next) => {
  console.log("Request Method:", req.method, "URL:", req.url);
  next();
});

const JWT_SECRET = process.env.JWT_SECRET || "Trumblack2k7";
const PORT = process.env.PORT || 3000;

// ========== AUTH ROUTES ==========

// ✅ SIGNUP - Create new user
authRoutes.post("/signup", async (req: any, res: any) => {
  try {
    const { username, email, password } = req.body;
    const normalizedUsername = String(username || "").trim();
    const normalizedEmail =
      typeof email === "string" && email.trim()
        ? email.trim().toLowerCase()
        : null;

    // Validate input
    if (!normalizedUsername || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    if (normalizedUsername.length < 3 || password.length < 3) {
      return res
        .status(400)
        .json({ error: "Username and password must be at least 3 characters" });
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { username: normalizedUsername },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    if (normalizedEmail) {
      const existingEmail = await prisma.user.findFirst({
        where: { email: normalizedEmail },
      });

      if (existingEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        username: normalizedUsername,
        email: normalizedEmail || undefined,
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
      { expiresIn: "7d" },
    );

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
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
authRoutes.post("/login", async (req: any, res: any) => {
  try {
    const { identifier, username, password } = req.body;
    const loginIdentifier = String(identifier || username || "").trim();

    // Validate input
    if (!loginIdentifier || !password) {
      return res
        .status(400)
        .json({ error: "Username/email and password required" });
    }

    // Find user by username or email
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: loginIdentifier },
          { email: loginIdentifier.toLowerCase() },
        ],
      },
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
      { expiresIn: "7d" },
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        balance: user.balance,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.use("/api/auth", authRoutes);

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
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        balance: true,
        active: true,
      },
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
