import CustomError from "../lib/customError.js";
import likeModel from "../models/likeModel.js";
import userModel from "../models/userModel.js";
import postModel from "../models/postModel.js";

// get user
const getUserProfile = async (req, res, next) => {
  const user = req.user;
  const userDetails = await userModel.findOne({
    where: { userId: user },
    attributes: {
      exclude: ["password", "createdAt", "updatedAt"],
    },
  });
  if (userDetails) {
    res.status(200).json({
      msg: "sucsess",
      data: { ...userDetails.dataValues },
    });
  } else {
    let err = new CustomError("Can't get your profile details", 404);
    next(err);
  }
};
// update user
const updateProfile = async (req, res, next) => {
  const user = req.user;

  const updateUser = await userModel.update(req.body, {
    where: { userId: user },
    fields: ["password", "img"],
  });
  if (updateUser[1]) {
    res.status(200).json({
      msg: "success",
      dsc: "user profile updated",
    });
  } else {
    let err = new CustomError("can't update user profile", 500);
    next(err);
  }
};

// delete user
const deleteUser = async (req, res, next) => {
  const user = req.user;

  const deleteUser = await userModel.destroy({
    where: { userId: user },
  });
  if (deleteUser) {
    re.status(200).json({
      msg: "success",
      dsc: "user delete successfull",
    });
  } else {
    let err = new CustomError("cant't delete the user right now", 400);
    next(err);
  }
};

const getUserLikePost = async (req, res, next) => {
  const user = req.user;
  const userLikePosts = await likeModel.findAll({
    where: { userId: user },
    include: [
      {
        model: postModel,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    ],
    attributes: {
      exclude: ["createdAt", "updatedAt", "likeId", "userId"],
    },
  });

  if (userLikePosts.length > 0) {
    res.status(200).json({
      msg: "success",
      dsc: "Here is the posts you liked",
      data: userLikePosts,
    });
  } else {
    let err = new CustomError("you don't have any liked post", 400);
    next(err);
  }
};
// get pecific user posts
const getUserPosts = async (req, res, next) => {
  const user = req.user;
  const userPosts = await postModel.findAll({
    where: { userId: user },
    attributes: {
      exclude: ["updatedAt", "postId"],
    },
  });
  if (userPosts) {
    if (userPosts.length <= 0) {
      return res.status(200).json({
        msg: "success",
        dsc: "you don't have any posts",
      });
    } else {
      return res.status(200).json({
        msg: "success",
        data: userPosts,
      });
    }
  } else {
    let err = new CustomError("sorry unable to finds your posts", 500);
    next(err);
  }
};
export {
  getUserProfile,
  updateProfile,
  deleteUser,
  getUserLikePost,
  getUserPosts,
};
