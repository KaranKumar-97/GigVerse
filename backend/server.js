import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

import userRoute from "./routes/user.route.js"
import authRoute from "./routes/auth.route.js"
import conversationRoute from "./routes/conversation.route.js"
import messageRoute from "./routes/message.route.js"
import gigRoute from "./routes/gig.route.js"
import orderRoute from "./routes/order.route.js"
import reviewRoute from "./routes/review.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config()

const app=express()

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb'}));
app.use(cookieParser())
app.use(cors({origin:"http://localhost:5173",credentials:true}));

const connect = async () =>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log("Connected to MongoDB");
      } catch (error) {
        console.log(error)
      }
};

app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/gigs",gigRoute)
app.use("/api/orders",orderRoute)
app.use("/api/messages",messageRoute)
app.use("/api/conversations",conversationRoute)
app.use("/api/reviews",reviewRoute)



app.listen(`${process.env.PORT}`,()=>{
    connect()
    console.log(`Backend is running at port ${process.env.PORT}`)
})
