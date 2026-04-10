import express from "express"
import "dotenv/config";
import cors from "cors";
import { connect } from "mongoose";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";

connectDB()
connectCloudinary();
const app = express()

app.use(cors()) //Enable Cross-origin Resource sharing

// MiddleWare
app.use(express.json())
app.use(clerkMiddleware())

// Api to listen ClerkWebhooks
app.use("/api/clerk", clerkWebhooks);

app.get('/', (req, res)=>res.send("API is Working"))
app.use('/api/user',userRouter)
app.use('/api/hotels',hotelRouter)
app.use('/api/rooms',roomRouter)


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`Server Running on port ${PORT}`));

