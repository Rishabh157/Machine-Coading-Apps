
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import path from "path";

const app = express();

// Why we need this: We are going to receive JSON data from the client (like email and password during login/register).
app.use(express.json());

// Set up Static Folder for Uploads
// Why we need this: When a file is uploaded to the 'uploads' folder, it's just sitting on our server's hard drive.
// If a user tries to access 'http://localhost:3000/uploads/my-pic.jpg', Express will say "Not Found" by default.
// express.static() tells Express to serve files from this directory directly to the browser.
app.use("/uploads", express.static(path.resolve("uploads")));

// Route setup
app.use("/auth", authRoutes);

// File Upload Route
// Why we need this: We prefix our upload route with '/api/upload'.
app.use("/api/upload", uploadRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
