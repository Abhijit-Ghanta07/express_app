import { DataTypes } from "sequelize";
import DB from "../db/db.js";
const sql = new DB();

const user = sql.sequelize.define("users", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    references: "admins",
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [4, 6],
    },
  },
  img: {
    type: DataTypes.STRING,
    defaultValue: "A",
  },
});

(async () => {
  await user.sync();
})();
export default user;
