import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail, saveUser } from "../utils/fileDb.js";
// We no longer import the Mongoose User model, because we are using our JSON file DB!

const JWT_SECRET = process.env.JWT_SECRET || "fallback_super_secret_key_for_interview";

/**
 * Register a new user
 */
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        console.log('{ email, password }', { email, password });
        
        // 1. Check if the user already exists using our file-based READ operation
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
             res.status(400).json({ message: "User already exists" });
             return;
        }

        // 2. Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create a new user object
        const newUser = {
            id: Date.now().toString(), // We generate a simple unique ID since MongoDB isn't doing it for us
            email,
            password: hashedPassword,
        };

        // 4. Save the user to the JSON file using our file-based CREATE operation
        await saveUser(newUser);

        res.status(201).json({ message: "User registered successfully (saved to JSON)" });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Server error during registration" });
    }
};

/**
 * Login a user
 */
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // 1. Find the user by email in our JSON file
        const user = await findUserByEmail(email);
        if (!user) {
             res.status(400).json({ message: "Invalid credentials" });
             return;
        }

        // 2. Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
             res.status(400).json({ message: "Invalid credentials" });
             return;
        }

        // 3. Generate a JWT token
        const payload = {
            userId: user.id,
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            message: "Login successful",
            token,
            user: { email: user.email, id: user.id }
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error during login" });
    }
};