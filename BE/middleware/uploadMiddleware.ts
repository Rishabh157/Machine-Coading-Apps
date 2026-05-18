import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure the uploads directory exists
const uploadDir = path.resolve("uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

/**
 * File Upload System with proper standard rules
 * Why we need this: We want users to be able to upload files (e.g., profile pictures or documents).
 * Multer is a middleware that handles multipart/form-data, which is primarily used for uploading files.
 */

// 1. Storage Configuration
// We configure where to store the files and what to name them.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 'cb' is a callback function. The first argument is an error (null if none), and the second is the directory.
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        // Standard Rule: Generate a unique filename to prevent overwriting existing files with the same name.
        // We use the current timestamp + the original file extension.
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname); // gets the extension like .jpg or .png
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
});

// 2. File Filter Rules
// Standard Rule: Never blindly accept all file types. We must restrict what can be uploaded for security (e.g., prevent malicious scripts).
const fileFilter = (req: any, file: any, cb: any) => {
    // We only want to accept images
    if (file.mimetype.startsWith("image/")) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error("Only image files are allowed!"), false); // Reject the file
    }
};

// 3. Create the Multer Upload Instance
export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        // Standard Rule: Always set a file size limit to prevent Denial of Service (DoS) attacks via massive file uploads.
        fileSize: 5 * 1024 * 1024, // 5 MB max file size
    },
});
