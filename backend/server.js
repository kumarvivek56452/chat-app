import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoute from "./routes/authRoute.js"
import messageRoute from "./routes/messageRoute.js"
import userRoute from "./routes/userRoute.js"
import cookieParser from "cookie-parser"
import { app, server } from "./socket/socket.js"
import path from "path"
import connectToMongoDB from "./db/connectToMongodb.js"
// const app = express()

dotenv.config();
app.use(express.json());
app.use(cookieParser());


const PORT = process.env.PORT

const __dirname = path.resolve()

// mongoose.connect("mongodb://127.0.0.1/chat-app").then(()=>console.log("database connected")).catch(err=>console.log(err))

app.get("/", (req, res)=>{
    res.send("Hello World!!")
})

//midleware for routes
app.use("/api/auth",authRoute)
app.use("/api/message",messageRoute)
app.use("/api/users",userRoute)

app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*",(req, res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})

server.listen(PORT,()=>{
    connectToMongoDB()
    console.log(`Server running on port ${PORT}`)
})

