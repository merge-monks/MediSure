import { configDotenv } from "dotenv";
import authRoute from "./routes/auth.routes.js";
import medicalRoute from "./routes/medical.routes.js";
// import profileRoute from "./routes/profile.routes.js";
import connectToMongoDB from "./db/connectToMongodb.js";
import MongoStore from "connect-mongo";
import session from "express-session";
import cookieParser from "cookie-parser";
import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { Client } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

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
app.use(cors({
  // Update the origin to match your frontend URL
  origin: ['http://localhost:5174', 'http://localhost:5173'], // Add common dev server ports
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    name: "AuthCookie",
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "PRODUCTION" ? true : false, // Set to true if using HTTPS
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 day
    },
  })
);

app.use("/api/auth", authRoute);
app.use("/api/medical", medicalRoute);  // Add the medical routes
// app.use("/api/profile", profileRoute);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/api/uploads", express.static(path.join(__dirname, "../uploads")));

app.listen(process.env.PORT || 4000, () => {
  connectToMongoDB();
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
