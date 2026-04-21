import express from "express";
<<<<<<< HEAD
import { protect } from "../middleware/authMiddleware";
import { getUserData, storeRecentSearchedCities } from "../controllers/userController";
const userRouter=express.Router();
userRouter.get('/',protect,getUserData);
userRouter.post('/store-recent-search',protect,storeRecentSearchedCities);


=======
import authMiddleware from "../middleware/authMiddleware.js";
import { getUserData, storRecentSearchedCities } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", authMiddleware, getUserData);

userRouter.post(
  "/store-recent-search",
  authMiddleware,
  storRecentSearchedCities
);
>>>>>>> 5ca1d5d (my updates)

export default userRouter;