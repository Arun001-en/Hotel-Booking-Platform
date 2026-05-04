import mongoose from "mongoose";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

const seedInitialData = async () => {
  try {
    // 1. Create a dummy owner/user if none exists
    const clerkUserId = "user_2unqyL4diJFP1E3pIBnasc7w8hP";
    let user = await User.findById(clerkUserId);
    if (!user) {
      user = await User.create({
        _id: clerkUserId,
        username: "Great Stack",
        email: "user.greatstack@gmail.com",
        image: "https://img.clerk.com/default",
        role: "hotelOwner",
      });
      console.log("Seeded dummy owner");
    }

    // 2. Create a dummy hotel if none exists
    let hotel = await Hotel.findOne({ name: "Urbanza Suites" });
    if (!hotel) {
      hotel = await Hotel.create({
        name: "Urbanza Suites",
        address: "Main Road 123 Street, New York",
        contact: "+0123456789",
        city: "New York",
        owner: user._id,
        rating: 4.5,
      });
      console.log("Seeded dummy hotel");
    }

    // 3. Add rooms if collection is empty
    const roomCount = await Room.countDocuments();
    if (roomCount === 0) {
      const rooms = [
        {
          _id: new mongoose.Types.ObjectId("67f7647c197ac559e4089b96"),
          hotel: hotel._id,
          roomType: "Double Bed",
          pricePerNight: 399,
          amenities: ["Room Service", "Mountain View", "Pool Access"],
          images: [
            "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1000",
          ],
          isAvailable: true,
        },
        {
          _id: new mongoose.Types.ObjectId("67f76452197ac559e4089b8e"),
          hotel: hotel._id,
          roomType: "Double Bed",
          pricePerNight: 299,
          amenities: ["Room Service", "Mountain View", "Pool Access"],
          images: [
            "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000",
          ],
          isAvailable: true,
        },
        {
          _id: new mongoose.Types.ObjectId("67f76406197ac559e4089b82"),
          hotel: hotel._id,
          roomType: "Double Bed",
          pricePerNight: 249,
          amenities: ["Free WiFi", "Free Breakfast", "Room Service"],
          images: [
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000",
          ],
          isAvailable: true,
        },
        {
          _id: new mongoose.Types.ObjectId("67f763d8197ac559e4089b7a"),
          hotel: hotel._id,
          roomType: "Single Bed",
          pricePerNight: 199,
          amenities: ["Free WiFi", "Room Service", "Pool Access"],
          images: [
            "https://images.unsplash.com/photo-1505691938895-1758d7eaa511?q=80&w=1000",
          ],
          isAvailable: true,
        },
      ];
      await Room.insertMany(rooms);
      console.log("Seeded initial rooms matching frontend dummy data!");
    }
  } catch (error) {
    console.error("Seeding error during startup:", error.message);
  }
};

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.error("MONGODB_URI is missing in .env");
      return;
    }

    mongoose.connection.on("connected", () => {
      console.log("MongoDB Connected Successfully");
      seedInitialData(); // Run seed after connection
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB Connection Error:", err.message);
    });

    mongoose.connect(uri).catch((err) => {
      console.error("Initial MongoDB connection error:", err.message);
    });
  } catch (error) {
    console.error("connectDB function error:", error.message);
  }
};

export default connectDB;