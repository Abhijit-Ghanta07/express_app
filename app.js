// imports
import express from "express";
import globalErrorHandler from "./utils/globalError.js";
// routes
import authRouter from "./routes/authRoute.js";
const app = express();
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// middlewares end
// routes
app.use("/api/user", authRouter);

app.use(globalErrorHandler);

// routes end
export default app;
