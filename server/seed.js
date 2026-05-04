import mongoose from "mongoose";
import "dotenv/config";
import Room from "./models/Room.js";
import Hotel from "./models/Hotel.js";
import User from "./models/User.js";

const seedData = async () => {
    try {
        console.log("Connecting to:", process.env.MONGODB_URI.replace(/:([^@]+)@/, ":****@"));
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000,
        });
        console.log("Connected to MongoDB for seeding...");

        // 1. Create a dummy owner/user if none exists
        const clerkUserId = "user_2unqyL4diJFP1E3pIBnasc7w8hP";
        let user = await User.findById(clerkUserId);
        if (!user) {
            user = await User.create({
                _id: clerkUserId,
                username: "Great Stack",
                email: "user.greatstack@gmail.com",
                image: "https://img.clerk.com/default",
                role: "hotelOwner"
            });
            console.log("Created dummy owner with ID:", clerkUserId);
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
                rating: 4.5
            });
            console.log("Created dummy hotel");
        }

        // 3. Add rooms if collection is empty
        const roomCount = await Room.countDocuments();
        if (roomCount === 0) {
            const rooms = [
                {
                    _id: new mongoose.Types.ObjectId("67f7647c197ac559e4089b96"), // Matching dummy ID
                    hotel: hotel._id,
                    roomType: "Double Bed",
                    pricePerNight: 399,
                    amenities: ["Room Service", "Mountain View", "Pool Access"],
                    images: ["https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1000"],
                    isAvailable: true
                },
                {
                    _id: new mongoose.Types.ObjectId("67f76452197ac559e4089b8e"), // Matching dummy ID
                    hotel: hotel._id,
                    roomType: "Double Bed",
                    pricePerNight: 299,
                    amenities: ["Room Service", "Mountain View", "Pool Access"],
                    images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000"],
                    isAvailable: true
                }
            ];
            await Room.insertMany(rooms);
            console.log("Seeded rooms matching dummy IDs!");
        } else {
            console.log("Rooms already exist in DB.");
        }

        console.log("Seeding complete!");
        process.exit();
    } catch (error) {
        console.error("Seeding error:", error.message);
        process.exit(1);
    }
};

seedData();
