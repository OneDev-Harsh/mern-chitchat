import express from "express"
import dotenv from "dotenv"
import path from "path"
import cookieParser from 'cookie-parser'
import cors from "cors";
import { app, server } from "./lib/socket.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config()
const __dirname = path.resolve()

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cors({origin: process.env.CLIENT_URL, credentials: true}));
app.use(cookieParser())

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    })
}

const PORT = process.env.PORT
server.listen(PORT, () => {
    console.log(`Server has been hosted on http://localhost:${PORT}`)
    connectDB();
})