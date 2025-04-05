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

const allowedOrigins = [
  'http://localhost:5001',
  'http://localhost:5000',
  'http://localhost:3000',
  'http://65.0.122.218'
];

app.use(cors({
  origin: function (origin, callback) {
    console.log('Origin:', origin); // Log the origin for debugging
    if (!origin) return callback(null, true); // Allow non-browser requests
    if (allowedOrigins.includes(origin) || origin.match(/localhost/) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies and credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200 // For legacy browsers
}));

app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    origin:'*',
    creadentiaols: true,
    proxy: true,
    name: "AuthCookie",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb+srv://himanshuverma:RVlJtQyhCXP7z3eq@cluster0.ug6bo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", // Replaced process.env.DB_URI
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      secure: false, // Replaced process.env.NODE_ENV === "PRODUCTION" ? true : false
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 day
    },
  })
);

// Default route to check if server is running
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is up and running",
    timestamp: new Date(),
    environment: process.env.NODE_ENV || "development"
  });
});

app.use("/api/auth", authRoute);
app.use("/api/medical", medicalRoute);  // Add the medical routes
// app.use("/api/profile", profileRoute);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/api/uploads", express.static(path.join(__dirname, "../uploads")));

app.listen(4000, () => { // Replaced process.env.PORT
  connectToMongoDB();
  console.log(`Server running on http://localhost:4000`);
});