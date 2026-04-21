// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     mongoose.connection.on('connected',()=>console.log("Database connected")
// );
//     await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`);
//     console.log("Database Connected Successfully");
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// export default connectDB;
import mongoose from "mongoose";

const connectDB = async () => {
  try {

    mongoose.connection.on("connected", () => {
      console.log("MongoDB Connected Successfully");
    });

    await mongoose.connect(process.env.MONGODB_URI);

  } catch (error) {
    console.log("MongoDB Connection Error:", error.message);
  }
};

export default connectDB;