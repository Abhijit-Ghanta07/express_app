import express from "express";
import {
  addPostLikes,
  createPost,
  deletePost,
  removePostLikes,
  updatePost,
  viewPost,
  viewUsersPost,
} from "../controllers/post.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import { adminPermit } from "../middleware/permissions.js";
const router = express.Router();

// get a post
router.get("/get/:id", asyncWrapper(viewPost));
//
// router.get("/user", adminPermit, asyncWrapper(viewUsersPost));
// create new post
router.all("*", adminPermit);
router.post("/new", adminPermit, asyncWrapper(createPost));
// update a post
router.patch("/update/:post", adminPermit, asyncWrapper(updatePost));
// like a post
router.patch("/like/:post", adminPermit, asyncWrapper(addPostLikes));
// unlike a post
router.patch("/unlike/:post", adminPermit, asyncWrapper(removePostLikes));
// delete a post
router.delete("/delete/:post", adminPermit, asyncWrapper(deletePost));

export default router;
