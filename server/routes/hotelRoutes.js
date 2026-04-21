<<<<<<< HEAD
import express from "express"
 import { protect } from "../middleware/authMiddleware"
 import { registerHotel } from "../controllers/hotelController"

const hotelRouter=express.Router();
  
hotelRouter.post('/',protect,registerHotel)
  
export default hotelRouter;
=======
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { registerHotel } from "../controllers/hotelController.js";

const hotelROuter = express.Router();

hotelROuter.post('/', protect , registerHotel);

export default hotelROuter;
>>>>>>> 5ca1d5d (my updates)
