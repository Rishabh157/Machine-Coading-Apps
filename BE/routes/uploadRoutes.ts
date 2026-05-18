import express from "express";
import { uploadFile } from "../controllers/uploadController.js";
import { upload } from "../middleware/uploadMiddleware.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Route: POST /api/upload
 * We use multiple middlewares here:
 * 1. `verifyToken`: Standard Rule - We usually only want authenticated users to be able to upload files.
 * 2. `upload.single('profilePic')`: This tells Multer to look for a single file attached to the form field named 'profilePic'.
 * 3. `uploadFile`: Our controller that runs after the file is successfully saved.
 */
router.post("/", verifyToken, upload.single("profilePic"), uploadFile);

export default router;
