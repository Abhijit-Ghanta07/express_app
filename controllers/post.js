import Database from "../db/db.js";
import CustomError from "../lib/customError.js";
import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";
import likeModel from "../models/likeModel.js";
const db = new Database();

const createPost = async (req, res, next) => {
  const { title, dsc, img } = req.body;
  const user = req.user;
  const buildPost = postModel.build({
    title,
    dsc,
    img,
    userId: user,
  });
  let savePost = await buildPost.save();
  if (savePost) {
    db.sequelize.close();
    res.status(201).json({
      msg: "success",
      dsc: "new post created",
      postId: savePost.postId,
    });
  } else {
    let err = new CustomError("failed to create new post", 501);
    next(err);
  }
};
const viewPost = async (req, res, next) => {
  const { id } = req.params;
  const findPost = await postModel.findOne({
    where: { postId: id },
    include: {
      model: userModel,
      required: true,
      attributes: ["email", "img"],
    },
    attributes: {
      exclude: ["postId"],
    },
  });
  if (findPost) {
    res.status(200).json(findPost);
  } else {
    let err = new CustomError("post not found", 404);
    next(err);
  }
};
const updatePost = async (req, res, next) => {
  const { post } = req.params;
  const user = req.user;

  const updatedPost = await postModel.update(req.body, {
    where: { postId: post, userId: user },
    fields: ["title", "dsc", "img"],
  });
  if (updatedPost[1]) {
    console.log(updatedPost);
    return res.status(200).json({
      msg: "success",
      dsc: "post updated",
      updat: updatedPost[0],
    });
  } else {
    let err = new CustomError("can't update the post right now", 400);
    next(err);
  }
};
const deletePost = async (req, res, next) => {
  const { post } = req.params;
  const user = req.user;

  const deletedPost = await postModel.destroy({
    where: { postId: post, userId: user },
  });
  if (deletedPost) {
    return res
      .status(200)
      .json({ msg: "success", dsc: "post deleted sucessfull" });
  } else {
    let err = new CustomError("cant't delete the post", 400);
    next(err);
  }
};
const viewUsersPost = async (req, res, next) => {
  const user = req.user;
  const usersPost = await postModel.findAll({
    where: { userId: user },
    include: {
      model: userModel,
      attributes: ["email", "img"],
    },
    attributes: {
      exclude: ["postId"],
    },
  });
  if (usersPost) {
    res.status(200).json(usersPost);
  } else {
    let err = new CustomError("you don't have any post", 204);
    next(err);
  }
};
const addPostLikes = async (req, res, next) => {
  const { post } = req.params;
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
const removePostLikes = async (req, res, next) => {
  const { post } = req.params;
  const user = req.user;
  const unLike = await likeModel.destroy({
    where: { postId: post, userId: user },
  });
  if (unLike) {
    const updatePostLike = await postModel.decrement("likes", {
      by: 1,
      where: {
        postId: post,
      },
    });
    if (updatePostLike) {
      db.sequelize.close();
      return res.status(200).json({
        msg: "success",
        dsc: "post unliked",
      });
    }
  } else {
    let err = new CustomError("unable to unliked the post right now", 400);
    next(err);
  }
};

export {
  createPost,
  updatePost,
  deletePost,
  addPostLikes,
  removePostLikes,
  viewPost,
  viewUsersPost,
};
