import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_super_secret_key_for_interview";

// We extend the Request interface from Express to include a 'user' property.
// This allows us to attach the decoded user payload to the request object so that
// subsequent route handlers can know who made the request.
export interface AuthRequest extends Request {
    user?: any; // You can define a specific type for the user payload instead of 'any'
}

/**
 * Middleware to verify JSON Web Tokens (JWT).
 * Why we need this: We want to protect certain routes so that only logged-in users can access them.
 * This middleware checks if a valid token is present in the request headers. 
 * If it is, it allows the request to proceed (by calling next()).
 * If it's not valid or missing, it blocks the request and returns an error.
 */
export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    // 1. Get the token from the "Authorization" header
    // It usually comes in the format: "Bearer <token>"
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
         res.status(401).json({ message: "Access Denied. No token provided." });
         return;
    }

    // Extract the actual token string
    const token = authHeader.split(" ")[1];

    try {
        // 2. Verify the token using our secret key
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // 3. Attach the decoded payload (e.g., userId) to the request object
        req.user = decoded;
        
        // 4. Call next() to pass control to the next middleware or the actual route handler
        next();
    } catch (error) {
        // If the token is invalid or expired, jwt.verify throws an error
        res.status(401).json({ message: "Invalid Token" });
    }
};
