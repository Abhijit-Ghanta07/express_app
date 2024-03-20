import { DataTypes } from "sequelize";
import DB from "../db/db.js";
const sql = new DB();

const staff = sql.sequelize.define("staffs", {
  staffId: {
    type: DataTypes.NUMBER,
    defaultValue: DataTypes.UUID,
  },
  staffName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobileNumber: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  age: DataTypes.NUMBER,
  sex: DataTypes.STRING,
  img: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.ARRAY,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
  },
  district: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.STRING,
  },
  rules: {
    type: DataTypes.ARRAY,
    defaultValue: ["read"],
  },
});

(async () => {
  await staff.sync();
})();
export default staff;
