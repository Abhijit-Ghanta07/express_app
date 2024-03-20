import { DataTypes } from "sequelize";
import DB from "../db/db.js";
const sql = new DB();

const admin = sql.sequelize.define("admins", {
  adminId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  adminName: {
    type: DataTypes.STRING,
    defaultValue: "admin",
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [4, 6],
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  img: {
    type: DataTypes.STRING,
    defaultValue: "A",
  },
  rules: {
    type: DataTypes.STRING,
    defaultValue: "read",
  },
});

// (async () => {
//   await admin.sync({ alter: true, force: true });
// })();

export default admin;
