import Hotel from "../models/Hotel.js";
import { v2 as cloudinary } from "cloudinary";
import Room from "../models/Room.js";


// Api to create new Hotel
export const createRooms = async(req , res) =>{
    try{
        const {roomType , pricePerNight , amenities} = req.body;
        const hotel = await Hotel.findOne({owner:req.auth.userId})

        if(!hotel) return res.json({success:false, message:"No Hotel Found"});
        if(!req.files?.length) return res.json({success:false, message:"Please upload at least one image"});

        // Uplaod images to Cloudinary
        const uploadImages = req.files.map(async(file)=>{
             const response = await cloudinary.uploader.upload(file.path);
             return response.secure_url;
        })
        // wait for all upload to complete
        const images = await Promise.all(uploadImages);

        await Room.create({
            hotel: hotel._id,
            roomType,
            pricePerNight: +pricePerNight,
            amenities:JSON.parse(amenities),
            images,
        })
        res.json({success:true, message:"Room created successfully"})
    } catch(error){
        res.json({success:false, message:error.message})
    }
}

// Api to get All Rooms
export const getRooms = async(req , res) =>{
    try{
        const rooms = await Room.find({isAvailable:true}).populate({
            path:'hotel',
            populate:{
                path:'owner',
                select:'image'
            }
        }).sort({createdAt:-1})
        res.json({success:true, rooms})
    }
    catch(error){
        res.json({success:false, message:error.message});
    }

}
// Api to get All Rooms for a specific hotel
export const getOwnerRooms = async(req , res) =>{
    try{
        const hotel = await Hotel.findOne({owner:req.auth.userId});
        if(!hotel) return res.json({success:false, message:"Hotel not found"});
        const rooms = await Room.find({hotel:hotel._id});
        res.json({success:true, rooms});
    }
    catch(error){
        res.json({success:false, message:error.message});
    }
}
// Api to Toggle availability of a room
export const toggleRoomAvailability = async(req , res) =>{
    try {
        const { roomId } = req.body;
        const room = await Room.findById(roomId);
        if(!room) return res.json({ success: false, message: "Room not found" });
        room.isAvailable = !room.isAvailable;
        await room.save();
        res.json({ success: true, message: "Availability updated" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
