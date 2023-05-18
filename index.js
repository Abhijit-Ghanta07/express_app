// imports

import express from "express";
import dotenv from "dotenv";
import "./db/db.js";
import user from "./models/user.js";
const app = express();

// middlewares
dotenv.config();
app.use(express.json());
app.use(express.static("public"));
// middlewares end

// responses
app.get("/hello", (req, res) => {
  res.send("hello");
});
app.post("/newuser", async (req, res) => {
  const newUser = new user(req.body);
  const saveUser = await newUser.save();
  res.json(saveUser).status(201);
});

app.listen(process.env.PORT, () => {
  console.log("app is running");
});
