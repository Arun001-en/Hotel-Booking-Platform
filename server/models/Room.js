import mongoose from "mongoose";
import Hotel from "./Hotel";
 
const roomSchema=new mongoose.Schema({
    hotel:{type:String,required:true,ref:"Hotel"},
    roomType:{type:String,required:true},
    pricePerNight:{type:Number,required:true},
    amenities:{type:Array,required:true},
    images:[{type:Array}],
    isAvailable:{type:Boolean,required:true},
},{timestamps:true});

const Room=mongoose.model("Room",roomSchema)
export default Room;