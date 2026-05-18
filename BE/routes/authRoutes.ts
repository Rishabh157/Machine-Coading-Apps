import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

// We create an Express Router. 
// A Router acts as a mini-application that handles routing for a specific part of our app.
// Why we need this: It keeps our code organized. Instead of putting all routes in index.ts, 
// we separate authentication routes here. It makes the codebase maintainable as it grows.
const router = express.Router();

// Define the POST route for registering a user.
// When a client makes a POST request to '/register' (which will be prefixed with '/api/auth' in index.ts),
// the 'registerUser' function from the controller will handle it.
router.post("/register", registerUser);

// Define the POST route for logging in.
router.post("/login", loginUser);

export default router;
