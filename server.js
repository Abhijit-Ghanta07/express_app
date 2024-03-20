// uncaught exceptiions
process.on("uncaughtException", (err) => {
  console.log("uncaughtException occured");
  process.exit(1);
});
// imports
import dotenv from "dotenv";
import DataBase from "./db/db.js";
import app from "./app.js";
// middlewares
dotenv.config();

const db = new DataBase();
db.connect()
  .then(() => {
    console.log("DB Contected");
  })
  .catch((err) => {
    console.log("db not Contected");
  });
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
