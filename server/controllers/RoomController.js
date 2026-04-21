import Hotel from "../models/HOtel.js";
import { v2 as cloudinary } from "cloudinary";
import Room from "../models/Rooms.js";
import { populate } from "dotenv";


// Api to create new Hotel
export const createRooms = async(req , res) =>{
    try{
        const {roomType , pricePerNight , amenities} = req.body;
        const hotel = await Hotel.findOne({owner:req.auth.userId})

        if(!hotel) return res.json({success:false, message:"No Hotel Found"});

        // Uplaod images to Cloudinary
        const uploadImages = req.files.map(async()=>{
             const response = await clodinary.uploader.upload(file.path);
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
        const rooms = await Room.find({isavailable:true}).populate({
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
        
    }
    catch(error){

    }
}
// Api to Toggle availability of a room
export const toggleRoomAvailability = async(req , res) =>{
    

}