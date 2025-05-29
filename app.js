import express from "express";
import { PORT } from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./Database/mongodb.js";

const app = express();

app.use("/api/v1/auth", authRouter);
app.use("/app/v1/users", userRouter);
app.use("/app/v1/subscriptions", subscriptionRouter);

app.get("/", (req, res) => {
    res.send('Welcome to the Subscription Tracker API!'); // Capitalized 'Welcome'
});

app.listen(PORT, async () => {
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);

    await connectToDatabase();
});

export default app;
