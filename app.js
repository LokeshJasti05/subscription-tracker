import express from "express";
import { PORT } from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./Database/mongodb.js";
import mongoose from "mongoose";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import workflowRouter from "./routes/workflow.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(arcjetMiddleware);
app.use("/api/v1/auth", authRouter);
app.use("/app/v1/users", userRouter);
app.use("/app/v1/subscriptions", subscriptionRouter);
app.use("/app/v1/workflows", workflowRouter);

app.use(errorMiddleware);
app.get("/", (req, res) => {
    res.send('Welcome to the Subscription Tracker API!'); // Capitalized 'Welcome'
});

// Add a test endpoint to check MongoDB connection
app.get("/api/v1/test-db", (req, res) => {
    const dbState = mongoose.connection.readyState;
    const states = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting'
    };
    res.json({
        status: states[dbState] || 'unknown',
        readyState: dbState
    });
});

app.listen(PORT, async () => {
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);

    await connectToDatabase();
});

export default app;
