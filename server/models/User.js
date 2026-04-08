import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    _id:{type:String, require:true},
    username:{type:String, require:true},
    email:{type:String, require:true},
    image:{type:String, require:true},
    role:{type:String, enum:["user","hotelOwner"],default:"user"},
    recentSearchedCities:[{type:String, require:"true"}],

},{timestamps:true}
);
const User = mongoose.model("user", userSchema);

export default User;