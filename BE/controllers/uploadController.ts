import { Request, Response } from "express";

/**
 * Handle File Upload
 * Why we need this: Once Multer has successfully processed and saved the file to our 'uploads' folder,
 * we need to send a response back to the client acknowledging the success, and maybe give them the file path
 * so they can use it or save it in their JSON DB.
 */
export const uploadFile = (req: Request, res: Response): void => {
    try {
        // If the file filter rejected the file, req.file will be undefined
        if (!req.file) {
            res.status(400).json({ message: "No file uploaded or file type not allowed." });
            return;
        }

        // Return the path of the successfully uploaded file
        res.status(200).json({
            message: "File uploaded successfully",
            filePath: `/uploads/${req.file.filename}`
        });
    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ message: "Server error during file upload" });
    }
};
