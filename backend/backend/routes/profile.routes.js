import express from "express";
import { getUser, updateUser } from "../controller/profile.controller.js";

const router = express.Router();

router.post("/user/profile", getUser);
router.get("/user/profileUpdate", updateUser);

export default router;
