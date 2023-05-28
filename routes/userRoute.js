import express from "express";
import user from "../models/userModel.js";
import { verifyAdmin, verifyAuthAndAdmin } from "../controllers/auth.js";
const router = express.Router();

router.get("/users", verifyAdmin, async (req, res) => {
  try {
    const allUsers = await user.find();
    res.json(allUsers).status(200);
  } catch (err) {
    res.json(err).status(500);
  }
});
router.get("/:id", verifyAuthAndAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const userData = await user.findOne({ _id: id });
    res.json(userData).status(200);
  } catch (err) {
    res.json(err).status(500);
  }
});

router.patch("/:id", verifyAuthAndAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const userData = await user.updateOne({ _id: id }, { $set: req.body });
    res.json("user update sucessfully").status(200);
  } catch (err) {
    res.json(err).status(500);
  }
});
router.delete("/:id", verifyAuthAndAdmin, async (req, res) => {
  const { id } = req.params;
  if (req.user.isadmin) {
    try {
      const userData = await user.deleteOne({ _id: id });
      res.json("user delte suceefully").status(200);
    } catch (err) {
      res.json(err).status(500);
    }
  } else {
    res.json("you are not aloowed to delte user").status(400);
  }
});
export default router;
