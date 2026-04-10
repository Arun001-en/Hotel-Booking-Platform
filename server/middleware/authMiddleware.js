import User from "../models/User.js";
//  middleware is to check user is authenticated
export const protect=async(req,res,next)=>{
   const {userId}=req.auth;
   if(!userId){
    res.join({success:false,message:"not authenticated"})
   }
   else{
    const user=await User.findById(userId);
    req.user=user;
    next();
   }
}