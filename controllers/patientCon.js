import { verifyToken } from "./auth.js";

function verifyUserAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.role.includes("user") || req.user.role.includes("admin")) {
      next();
    } else {
      res.status(403).json("you are not allowed");
    }
  });
}

export { verifyUserAndAdmin };
