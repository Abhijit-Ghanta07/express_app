import express from "express";
import asyncWrapper from "../utils/asyncWrapper.js";
import { getAll, loginUser, registerUser } from "../controllers/auth.js";

const router = express.Router();

// controller
router.post("/login", asyncWrapper(loginUser));
router.post("/register", asyncWrapper(registerUser));
router.get("/all", asyncWrapper(getAll));

export default router;
