import express from "express";
import user from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const router = express.Router();
function createAccessToken(user) {
  const acceesToken = jwt.sign(
    {
      id: user._id,
      username: user.username,
      isadmin: user.isadmin,
      isdoctor: user.isdoctor,
    },
    process.env.JWT_SEC
  );
  return acceesToken;
}

router.post("/register", async (req, res) => {
  const { username, password, isadmin, phone, email, isdoctor } = req.body;
  //   password hash
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  const newUser = new user({
    username: username,
    password: hashPassword,
    email: email,
    isadmin: isadmin,
    phone: phone,
    isdoctor: isdoctor,
  });
  try {
    const saveUser = await newUser.save();
    if (saveUser) {
      const { password, ...others } = saveUser;
      res.json(saveUser).status(201);
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
      const resUser = { ...findUser }._doc;
      res.json({ ...resUser, acceesToken });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
