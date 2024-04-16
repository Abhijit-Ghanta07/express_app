import express from "express";
import asyncWrapper from "../utils/asyncWrapper.js";
import { adminPermit } from "../middleware/permissions.js";
import {
  getUserProfile,
  updateProfile,
  deleteUser,
  getUserLikePost,
  getUserPosts,
} from "../controllers/user.js";
const router = express.Router();

// profile
router.all("/*", adminPermit);
router.get("/profile", asyncWrapper(getUserProfile));
// users posts
router.get("/profile/posts", asyncWrapper(getUserPosts));
// users liked posts
router.get("/profile/likedPosts", asyncWrapper(getUserLikePost));
// user profile update
router.patch("profile/update", asyncWrapper(updateProfile));
// delete user profile
router.delete("/profile/delete", asyncWrapper(deleteUser));

export default router;
