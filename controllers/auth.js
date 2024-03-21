import userModel from "../models/userModel.js";
import likeModel from "../models/likeModel.js";
import Database from "../db/db.js";
import customError from "../lib/customError.js";
import { encrypt, decrypt } from "../lib/encryptPass.js";
const db = new Database();

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ where: { email: email } });
  if (user) {
    // match password
    let match = await decrypt(password, user.password);
    if (match) {
      res.status(200).json({
        msg: "success",
        dsc: "login successfull",
        email: user.email,
        id: user.userId,
      });
    } else {
      const err = new customError("password not match", 400);
      next(err);
    }
  } else {
    const err = new customError("user not found", 404);
    next(err);
  }
};
const registerUser = async (req, res, next) => {
  const { email, password } = req.body;

  // encrypt the pass
  const encryptPass = await encrypt(password);

  let newAdmin = userModel.build({
    email: email,
    password: encryptPass,
  });
  const saveAdmin = await newAdmin.save();
  if (saveAdmin) {
    db.sequelize.close();
    res.status(201).json({
      msg: "success",
      dsc: "you are successfully register",
      email: saveAdmin.email,
      id: saveAdmin.img,
    });
  } else {
    const err = new customError("can't create the user", 500);
    next(err);
  }
};

const getAll = async (req, res, next) => {
  const admins = await userModel.findAll();
  res.status(200).json(admins);
};

export { loginUser, registerUser, getAll };
