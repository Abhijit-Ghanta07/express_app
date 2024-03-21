// imports
import express from "express";
import globalErrorHandler from "./utils/globalError.js";
// routes
import authRouter from "./routes/authRoute.js";
import postRouter from "./routes/postRoute.js";
import userRouter from "./routes/userRoute.js";
import CustomError from "./lib/customError.js";
const app = express();
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// middlewares end
// routes
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/user", userRouter);

// app.use("/api/like", likeRouter);

app.use("/*", (req, res, next) => {
  let err = new CustomError("This is not a valid path", 404);

  next(err);
});
app.use(globalErrorHandler);
// routes end
export default app;
