// uncaught exceptiions
process.on("uncaughtException", (err) => {
  console.log("uncaughtException occured");
  process.exit(1);
});
// imports
import dotenv from "dotenv";
import DataBase from "./db/db.js";
import app from "./app.js";
import { ServerError } from "./lib/customError.js";
import { errorLogger } from "./utils/logger.js";

// middlewares
dotenv.config();
// custom error

const db = new DataBase();
db.connect().catch((err) => {
  const serverErr = new ServerError("failed to connect to DataBase", 503);
  errorLogger.error(serverErr.status);
  console.log("Db not Contected");
  process.exit(1);
});
// db.sync().catch((err) => {
//   console.log("db sync error");
// });
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: [...allowOrigins],
//     credentials: true,
//   })
// );

// routes end
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log("app is running", PORT);
});

process.on("unhandledRejection", (err) => {
  console.log("unhandle rejection occured");
  server.close(() => {
    process.exit(1);
  });
});
