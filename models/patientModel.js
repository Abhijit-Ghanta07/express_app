import { DataTypes } from "sequelize";
import DB from "../db/db.js";
const sql = new DB();

const patient = sql.sequelize.define("patients", {
  patientId: {
    type: DataTypes.NUMBER,
    defaultValue: DataTypes.UUID,
  },
  patientName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  sex: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobileNumber: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  guardianName: {
    type: DataTypes.STRING,
  },
  guardianNumber: DataTypes.NUMBER,
  guardianRelation: DataTypes.STRING,

  admitDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  releaseDate: {
    type: DataTypes.DATE,
  },
});

(async () => {
  await patient.sync();
})();
export default patient;
