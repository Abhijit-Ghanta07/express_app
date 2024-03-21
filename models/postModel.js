import { DataTypes } from "sequelize";
import userModel from "./userModel.js";
import Database from "../db/db.js";
const db = new Database();
const post = db.sequelize.define("posts", {
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dsc: {
    type: DataTypes.STRING,
  },
  img: {
    type: DataTypes.STRING,
    defaultValue: "IMG",
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      len: [0, Infinity],
    },
  },
});

post.belongsTo(userModel, { foreignKey: "userId" });

// (async () => {
//   await post.sync();
// })();

export default post;
