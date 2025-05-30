import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 5,
        maxlength: 255,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please use a valid email address",
        ],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 8,
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
