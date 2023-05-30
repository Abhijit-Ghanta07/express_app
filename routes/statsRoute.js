import express from "express";
import patient from "../models/patientModel.js";
import { verifyUserAndAdmin } from "../controllers/patientCon.js";
import { verifyAuthAndAdmin } from "../controllers/auth.js";
const router = express.Router();

router.get("/today", verifyAuthAndAdmin, async (req, res) => {
  try {
    const todayData = await patient.aggregate([{ $group: { _id: "$age" } }]);
    res.json({ message: "today's stats", stats: todayData }).status(200);
  } catch (err) {
    res.json(err).status(500);
  }
});

export default router;
