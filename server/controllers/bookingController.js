import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

// Api to create a new booking
export const createBooking = async (req, res) => {
    try {
        const { roomId, hotelId, checkInDate, checkOutDate, guests, totalPrice } = req.body;

        // Check if room is available (basic check for now)
        const room = await Room.findById(roomId);
        if (!room || !room.isAvailable) {
            return res.json({ success: false, message: "Room is not available" });
        }
        if (room.hotel.toString() !== hotelId) {
            return res.json({ success: false, message: "Invalid hotel for selected room" });
        }

        const bookingData = {
            user: req.auth.userId,
            room: roomId,
            hotel: hotelId,
            checkInDate,
            checkOutDate,
            guests,
            totalPrice,
            status: "confirmed" // Automatically confirm for now
        };

        const newBooking = await Booking.create(bookingData);
        
        // Optional: Update room availability if needed for specific dates
        // For now, we assume room availability is a general toggle
        
        res.json({ success: true, message: "Booking confirmed", booking: newBooking });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Api to get bookings for a user
export const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.auth.userId }).populate("hotel room");
        res.json({ success: true, bookings });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Api to get owner dashboard data
export const getOwnerDashboard = async (req, res) => {
    try {
        const hotel = await Hotel.findOne({ owner: req.auth.userId });
        
        if (!hotel) {
            return res.json({ success: false, message: "Hotel not found" });
        }

        const bookings = await Booking.find({ hotel: hotel._id }).populate("user room").sort({ createdAt: -1 });
        
        const totalBookings = bookings.length;
        const totalRevenue = bookings.reduce((sum, booking) => sum + (booking.totalPrice || 0), 0);

        res.json({
            success: true,
            dashboardData: {
                totalBookings,
                totalRevenue,
                bookings: bookings.slice(0, 10) // Last 10 bookings
            }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
