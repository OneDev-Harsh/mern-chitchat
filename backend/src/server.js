import express from "express"
import dotenv from "dotenv"
import path from "path"

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

const app = express()
dotenv.config()
const __dirname = path.resolve()

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    })
}

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server has been hosted on http://localhost:${PORT}`)
})