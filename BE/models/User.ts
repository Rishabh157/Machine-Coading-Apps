import mongoose from "mongoose";

// 1. We create a Schema. A schema tells Mongoose (and MongoDB) what the structure of our data should look like.
// This ensures that every user document has an email and a password, and the email is unique.
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // We don't want multiple users registering with the same email
        trim: true, // Removes extra spaces before or after the email
    },
    password: {
        type: String,
        required: true, // The hashed password will be stored here
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// 2. We create the Model from the schema and export it.
// The model allows us to interact with the 'users' collection in the database (e.g., finding, creating, updating users).
const User = mongoose.model("User", userSchema);

export default User;
