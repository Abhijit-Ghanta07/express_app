import express from "express";
import user from "../models/userModel.js";
import { verifyAuthAndAdmin, verifyToken } from "../controllers/auth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
const router = express.Router();
function createAccessToken(user) {
  const acceesToken = jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SEC
  );
  return acceesToken;
}

router.post("/register", verifyAuthAndAdmin, async (req, res) => {
  const { username, password, phone, email, role } = req.body;
  //   password hash
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  const newUser = new user({
    username: username,
    password: hashPassword,
    email: email,
    phone: phone,
    role: role,
  });
  // save user to db
  try {
    const saveUser = await newUser.save();
    if (saveUser) {
      const { password, ...others } = saveUser._doc;
      res
        .json({ message: "user save suceesfully", userInfo: others })
        .status(201);
    }
  } catch (err) {
    res.json(err).status(500);
  }
});
router.post("/login", async (req, res) => {
  try {
    const findUser = await user.findOne({ username: req.body.username });
    // check hash password
    const checkPass = bcrypt.compareSync(req.body.password, findUser.password);
    if (checkPass) {
      const acceesToken = createAccessToken(findUser);
      const resUser = findUser._doc;
      const { password, ...fillterUser } = resUser;
      res
        .cookie("token", acceesToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 15,
        })
        .json({
          message: "you are suceesfully logged in",
          userInfo: fillterUser,
        })
        .status(200);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/logout", verifyToken, (req, res) => {
  res.clearCookie("token").json({ message: "logout suceesfully" }).status(200);
});

export default router;
