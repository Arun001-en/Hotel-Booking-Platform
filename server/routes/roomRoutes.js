<<<<<<< HEAD
import express from 'express';
import upload from '../middleware/uploadMiddleware';
import { protect } from '../middleware/authMiddleware';
import { createRoom, getOwnerRooms, getRooms, toggleRoomAvailability } from '../controllers/roomController';



const roomRouter=express.Router();

roomRouter.post('/',upload.array("images",4),protect,createRoom)
roomRouter.get('/',getRooms)
roomRouter.get('/owner',protect,getOwnerRooms)
roomRouter.post('/toggle-availability',protect,toggleRoomAvailability)

=======
import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js"
import { createRooms } from "../controllers/RoomController.js";

const roomRouter = express.Router();

roomRouter.post('/',upload.array("images", 4 ), protect,createRooms)
>>>>>>> 5ca1d5d (my updates)

export default roomRouter;