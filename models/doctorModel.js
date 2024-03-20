import { DataTypes } from "sequelize";
import DB from "../db/db.js";
const sql = new DB();

const doctor = sql.sequelize.define("doctors", {
  docId: {
    type: DataTypes.NUMBER,
    defaultValue: DataTypes.UUID,
  },
  docName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  docEmail: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
    defaultValue: "1234",
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
  await doctor.sync();
})();

export default doctor;
