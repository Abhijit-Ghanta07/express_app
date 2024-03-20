import adminModel from "../models/adminModel.js";
import Database from "../db/db.js";
import customError from "../lib/customError.js";
const db = new Database();
class User {
  login = async (req, res, next) => {
    // get mail and pass from body
    const { email, password } = req.body;
    // find user match with mail
    const user = await adminModel.findOne({ where: { email: email } });
    if (user) {
      // if user exist encrypt the pass
      // match password
      if (user.password == password) {
        // if pass match then res the user
        res.status(200).json({
          msg: "success",
          name: user.adminName,
          email: user.email,
          img: user.img,
        });
      } else {
        res.json("password not match").status(400);
      }
    } else {
      res.json("user not found").status(400);
    }
    next();
  };
  register = async (req, res, next) => {
    // get data from body
    const { name, email, password, img, rules } = req.body;

    let newAdmin = adminModel.build({
      adminName: name,
      email: email,
      password: password,
      img: img,
      rules: rules,
    });
    const saveAdmin = await newAdmin.save();
    if (saveAdmin) {
      db.sequelize.close();
      res.status(201).json({
        msg: "success",
        name: saveAdmin.adminName,
        email: saveAdmin.email,
        img: saveAdmin.img,
      });
    } else {
      new Error("Enter Valid details");
    }
    next();
  };
}

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await adminModel.findOne({ where: { email: email } });
  if (user) {
    // match password
    if (user.password == password) {
      res.status(200).json({
        msg: "success",
        name: user.adminName,
        email: user.email,
        img: user.img,
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
async function registerUser(req, res, next) {
  const { name, email, password, img, rules } = req.body;

  console.log(name, email);
  let newAdmin = adminModel.build({
    adminName: name,
    email: email,
    password: password,
    img: img,
    rules: rules,
  });
  const saveAdmin = await newAdmin.save();
  if (saveAdmin) {
    db.sequelize.close();
    res.status(201).json({
      msg: "success",
      name: saveAdmin.adminName,
      email: saveAdmin.email,
      img: saveAdmin.img,
    });
  } else {
    const err = new customError("can't create the user", 500);
    next(err);
  }
}

function matchPassword(user, pass) {
  // decrpt password
  if (user.password == pass) {
    return true;
  } else {
    return false;
  }
}

export { loginUser, registerUser };
