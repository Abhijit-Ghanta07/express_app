// imports
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./db/db.js";
import DocRouter from "./routes/doctorRoute.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import patientRouter from "./routes/patientRoute.js";
import statsRoute from "./routes/statsRoute.js";
const app = express();
const PORT = process.env.PORT || 8080;
// middlewares
dotenv.config();
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static("public"));
// middlewares end

// routes
app.use("/doctor", DocRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/patient", patientRouter);
app.use("/stats", statsRoute);
// routes end
app.listen(PORT, () => {
  console.log("app is running");
});
