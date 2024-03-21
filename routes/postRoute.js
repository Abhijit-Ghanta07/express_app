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

router.post("/new", adminPermit, asyncWrapper(createPost));
router.patch("/update/:post", adminPermit, asyncWrapper(updatePost));
router.get("/user", adminPermit, asyncWrapper(viewUsersPost));
router.patch("/like/:post", adminPermit, asyncWrapper(addPostLikes));
router.patch("/unlike/:post", adminPermit, asyncWrapper(removePostLikes));
router.delete("/:post", adminPermit, asyncWrapper(deletePost));
router.get("/:id", asyncWrapper(viewPost));
export default router;
