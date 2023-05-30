import express from "express";
import user from "../models/userModel.js";
import { verifyAuthAndUser, verifyAuthAndAdmin } from "../controllers/auth.js";
const router = express.Router();

router.get("/users", verifyAuthAndAdmin, async (req, res) => {
  try {
    const allUsers = await user.find().select("-password");
    res.json(allUsers).status(200);
  } catch (err) {
    res.json(err).status(500);
  }
});
router.get("/:id", verifyAuthAndUser, async (req, res) => {
  const { id } = req.params;
  try {
    const userData = await user.findOne({ _id: id }).select("-password");
    res.json({ message: "user founded", userInfo: userData }).status(200);
  } catch (err) {
    res.json(err).status(500);
  }
});

router.patch("/:id", verifyAuthAndUser, async (req, res) => {
  const { id } = req.params;
  try {
    const userData = await user.updateOne({ _id: id }, { $set: req.body });
    res.json({ message: "user update sucessfully" }).status(200);
  } catch (err) {
    res.json(err).status(500);
  }
});
router.delete("/:id", verifyAuthAndAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const userData = await user.deleteOne({ _id: id });
    res.json({ message: "user delte suceefully" }).status(200);
  } catch (err) {
    res.json(err).status(500);
  }
});
export default router;
