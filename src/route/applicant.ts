import { Router } from "express";
import { submitApplication } from "../controller/applicantController";
import { uploadMiddleware, upoladToCloud } from "../middleware/upload";
const router = Router();
router.post("/submit", uploadMiddleware, upoladToCloud, submitApplication);
export default router;