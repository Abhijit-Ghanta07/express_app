// imports
import express from "express";
import helmet from "helmet";
import globalErrorHandler from "./utils/globalError.js";
// routes
import { authRouter, postRouter, userRouter } from "./routes/route.js";
import { appError } from "./lib/customError.js";
const app = express();
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.disable("x-powered-by");
// middlewares end
// routes
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/user", userRouter);

// app.use("/api/like", likeRouter);

app.use("/*", (req, res, next) => {
  let err = new appError(`${req.originalUrl} is not a valid path`, 400);

  next(err);
});
app.use(globalErrorHandler);
// routes end
export default app;
