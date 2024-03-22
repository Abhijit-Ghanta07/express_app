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

router.get("/profile", adminPermit, asyncWrapper(getUserProfile));
// users posts
router.get("/profile/posts", adminPermit, asyncWrapper(getUserPosts));
// users liked posts
router.get("/profile/likedPosts", adminPermit, asyncWrapper(getUserLikePost));
// user profile update
router.patch("profile/update", adminPermit, asyncWrapper(updateProfile));
// delete user profile
router.delete("/profile/delete", adminPermit, asyncWrapper(deleteUser));

export default router;
