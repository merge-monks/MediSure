import express from "express";
import { createScanReport, getAllScanReports, getScanReportById, getScanReportImages, sendMessage } from "../controller/medical.controller.js";

const router = express.Router();

// Route for creating a new scan report
router.post("/scanReports", createScanReport);

// Route for getting all scan reports
router.get("/scanReports", getAllScanReports);

// Route for getting a specific scan report by ID
router.get("/scanReports/:id", getScanReportById);

// Route for getting images of a specific scan report
router.get("/scanReports/:id/images", getScanReportImages);

router.post("/sendMessage", sendMessage)

export default router;
