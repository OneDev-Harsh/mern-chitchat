import express from "express"
import dotenv from "dotenv"

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

const app = express()
dotenv.config()

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server has been hosted on http://localhost:${PORT}`)
})