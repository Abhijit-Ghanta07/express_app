import express from "express";
import user from "../models/userModel.js";
const router = express.Router();
router.post("/register", async (req, res) => {
  const userAdd = req.body;
  const newUser = new user(userAdd);
  try {
    //   password hash
    const saveUser = await newUser.save();
    res.json(saveUser).status(201);
  } catch (err) {
    res.json(err).status(500);
  }
});
router.post("/login", async (req, res) => {
  try {
    const findUser = await user.findOne({ username: req.body.username });
    if (findUser.password == req.body.password) {
      res.json("login suceesfully").status(200);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
