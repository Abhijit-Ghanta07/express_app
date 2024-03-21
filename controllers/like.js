import CustomError from "../lib/customError.js";
import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";
import likeModel from "../models/likeModel.js";
import Database from "../db/db.js";
const db = new Database();

const newLike = async (req, res, next) => {
  const { post } = req.body;
  const user = req.user;

  const findLikeExist = await likeModel.findOne({
    where: { postId: post, userId: user },
  });
  if (findLikeExist) {
    return res
      .status(203)
      .json({ msg: "failed", dsc: "you already liked the post" });
  }
  const buildLike = likeModel.build({
    postId: post,
    userId: user,
  });
  let saveLike = await buildLike.save();
  let updatePostLike = await postModel.increment("likes", {
    by: 1,
    where: { postId: post },
  });
  if (saveLike && updatePostLike) {
    db.sequelize.close();
    res.status(201).json({
      msg: "success",
      dsc: "post liked",
    });
  } else {
    let err = new CustomError("failed to liked this post", 501);
    next(err);
  }
};
const removeLike = async (req, res, next) => {
  const { post } = req.params;
  const user = req.user;
  const unLike = await likeModel.destroy({
    where: { postId: post, userId: user },
  });
  const updatePostLike = await postModel.decrement("likes", {
    by: 1,
    where: {
      postId: post,
    },
  });
  if (unLike && updatePostLike) {
    db.sequelize.close();
    res.status(200).json({
      msg: "success",
      dsc: "post unliked",
    });
  } else {
    let err = new CustomError("unable to unliked the post right now", 400);
    next(err);
  }
};
const viewPostLikes = async (req, res, next) => {
  const { post } = req.params;
  const findPost = await postModel.findOne({
    where: { postId: post },
  });
  if (findPost) {
    res.status(200).json(findPost);
  } else {
    let err = new CustomError("post not found", 404);
    next(err);
  }
};
const viewUsersLikes = async (req, res, next) => {
  const { user } = req.params;
  const usersPost = await likeModel.findAll({
    where: { userId: user },
    include: [
      {
        model: userModel,
        attributes: ["email", "img"],
      },
      {
        model: postModel,
        attributes: {
          exclude: ["postId", "createdAt", "updatedAt"],
        },
      },
    ],
    attributes: ["postId"],
  });
  if (usersPost.length > 0) {
    res.status(200).json(usersPost);
  } else {
    let err = new CustomError("you dont't have any liked post", 200);
    next(err);
  }
};

export { newLike, removeLike, viewPostLikes, viewUsersLikes };
