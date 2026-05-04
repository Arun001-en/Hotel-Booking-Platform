import express from "express";
import { createBooking, getUserBookings, getOwnerDashboard } from "../controllers/bookingController.js";
import { clerkMiddleware } from "@clerk/express";

const bookingRouter = express.Router();

bookingRouter.post("/create", createBooking);
bookingRouter.get("/user/:userId", getUserBookings);
bookingRouter.get("/owner-dashboard", clerkMiddleware(), getOwnerDashboard);

export default bookingRouter;
