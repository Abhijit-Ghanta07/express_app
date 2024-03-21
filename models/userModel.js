import { DataTypes } from "sequelize";
import Database from "../db/db.js";
const DB = new Database();

const user = DB.sequelize.define("users", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    defaultValue: "AB",
  },
});

// (async () => {
//   await user.sync();
// })();

export default user;
