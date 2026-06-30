import express from "express";
import { createBooking, getUserBookings, getOwnerDashboard } from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const bookingRouter = express.Router();

bookingRouter.post("/create", protect, createBooking);
bookingRouter.get("/user", protect, getUserBookings);
bookingRouter.get("/owner-dashboard", protect, getOwnerDashboard);

export default bookingRouter;
