import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel=async(req,res)=>{
    try{
        const {name,address,contact,city}=req.body;
        const owner=req.User._id
        
         const hotel=await Hotel.findOne({owner})
         if(hotel){
            return res.join({success:false,message:"Hotel Already Registered"})
         }
         await Hotel.create({name,address,contact,city,owner})
         await User.findByIdAndUpdate(owner,{role:"hotelOwner"})
         res.join({success:true, message:"Hotel Registered Successfully"})

    } catch(error){
       res.join({success:false, message:error.message})
    }
}