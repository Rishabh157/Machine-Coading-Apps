import fs from "fs/promises";
import path from "path";

// Define where our JSON "database" file is located
const dataFilePath = path.resolve("data/users.json");
console.log('dataFilePath', dataFilePath);
/**
 * File DB Helper
 * Why we need this: Instead of using a real database like MongoDB, we are storing our data in a JSON file.
 * This file will read the array of users from the JSON file, or write back to it.
 * This demonstrates basic CRUD (Create, Read, Update, Delete) operations with the file system.
 */

// 1. READ: Get all users
export const getUsers = async (): Promise<any[]> => {
    try {
        const data = await fs.readFile(dataFilePath, "utf-8");
        return JSON.parse(data);
    } catch (error: any) {
        // If the file doesn't exist yet, return an empty array
        if (error.code === "ENOENT") return [];
        throw error;
    }
};

// 2. READ (Single): Find a user by their email
export const findUserByEmail = async (email: string) => {
    const users = await getUsers();
    return users.find((user) => user.email === email);
};

// 3. CREATE: Add a new user to the JSON file
export const saveUser = async (user: any) => {
    const users = await getUsers();
    users.push(user);
    // Write the updated array back to the file with proper formatting (2 spaces indentation)
    await fs.writeFile(dataFilePath, JSON.stringify(users, null, 2));
};

// You could also add UPDATE and DELETE here in the future:
// export const updateUser = async (email, newData) => { ... }
// export const deleteUser = async (email) => { ... }
