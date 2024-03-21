import express from "express";
import {
  newLike,
  removeLike,
  viewPostLikes,
  viewUsersLikes,
} from "../controllers/like.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import { adminPermit } from "../middleware/permissions.js";
const router = express.Router();

router.post("/new", adminPermit, asyncWrapper(newLike));
router.delete("/remove/:post", adminPermit, asyncWrapper(removeLike));
router.get("/:post", asyncWrapper(viewPostLikes));
router.get("/user/:user", asyncWrapper(viewUsersLikes));
