// imports
import express from "express";
import dotenv from "dotenv";
import "./db/db.js";
import DocRouter from "./routes/doctorRoute.js";
import authRouter from "./routes/authRoute.js";
const app = express();

// middlewares
dotenv.config();
app.use(express.json());

app.use(express.static("public"));
// middlewares end

// routes
app.use("/doctor", DocRouter);
app.use("/auth", authRouter);
// routes end
app.listen(process.env.PORT, () => {
  console.log("app is running");
});
