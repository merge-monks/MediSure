import express from "express";
import {
  addMedical,
  getMedical,
  updateMedical,
} from "../controller/medical.controller.js";

const router = express.Router();

router.get("/user", getMedical);
router.post("/add", addMedical);
router.post("/id", updateMedical);

export default router;
