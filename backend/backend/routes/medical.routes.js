import express from "express";
import { createScanReport, getAllScanReports, getScanReportById } from "../controller/medical.controller.js";

const router = express.Router();

// Route for creating a new scan report
router.post("/scanReports", createScanReport);

// Route for getting all scan reports
router.get("/scanReports", getAllScanReports);

// Route for getting a specific scan report by ID
router.get("/scanReports/:id", getScanReportById);

export default router;
