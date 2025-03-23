import express from "express";
import { login, logout, signup, getCurrentUser } from "../controller/auth.controller.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", checkAuth, getCurrentUser);

router.get("/checkAuth", checkAuth); //ignore

export default router;
