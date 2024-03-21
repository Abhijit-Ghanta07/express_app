import { DataTypes } from "sequelize";
import postModel from "./postModel.js";
import userModel from "./userModel.js";
import Database from "../db/db.js";
const db = new Database();
const like = db.sequelize.define("likes", {
  likeId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  postId: {
    type: DataTypes.INTEGER,
  },
});

like.belongsTo(postModel, { foreignKey: "postId" });
like.belongsTo(userModel, { foreignKey: "userId" });

// (async () => {
//   await like.sync();
// })();

export default like;
