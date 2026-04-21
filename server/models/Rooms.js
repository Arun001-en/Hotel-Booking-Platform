import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    hotel:{type:string, ref:"Hotel", require:true},
    roomType:{type:string,require:true},
    priceperNight:{type:Number, require:true},
    amenities:{type:Array,require:true},
    images:[{type:string,require:true}],
    hotel:{type:string, ref:"Hotel", require:true},
    isavailable:{type:Boolean,default:true},



},{timestamps:true});

const Room = mongoose.model("Hotel" , RoomSchema);

export default Room;


