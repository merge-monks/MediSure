import { configDotenv } from "dotenv";
import authRoute from "./routes/auth.routes.js";
import medicalRoute from "./routes/medical.routes.js";

import connectToMongoDB from "./db/connectToMongodb.js";
import MongoStore from "connect-mongo";
import session from "express-session";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors"; // Import cors
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { Client } from 'whatsapp-web.js';
import qrcode from "qrcode-terminal";

const clientWhatsapp = new Client();

clientWhatsapp.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  console.log("Scan the QR code above to log in to WhatsApp Web.");
});

clientWhatsapp.on("ready", () => {
  console.log("Client is ready!");
});

clientWhatsapp.initialize();

configDotenv();
const app = express();

// Enable CORS with multiple origins
app.use(cors({
  origin: ["http://localhost:5000", "http://localhost:3000", "http://localhost:5001", "http://3.110.188.8"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    name: "AuthCookie",
    secret: "secret", // Replaced process.env.COOKIE_SECRET
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb+srv://Admin:8O7DIPsUZ1AG65hy@cluster0.rkdoows.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", // Replaced process.env.DB_URI
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      secure: false, // Replaced process.env.NODE_ENV === "PRODUCTION" ? true : false
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 day
    },
  })
);

app.use("/api/auth", authRoute);
app.use("/api/medical", medicalRoute);  // Add the medical routes
// app.use("/api/profile", profileRoute);

// Add default route to check if server is running
app.get("/", (req, res) => {
  res.status(200).json({ 
    message: "Server is running successfully", 
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString()
  });
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/api/uploads", express.static(path.join(__dirname, "../uploads")));

app.listen(4000, () => { // Replaced process.env.PORT
  connectToMongoDB();
  console.log(`Server running on http://localhost:4000`);
});