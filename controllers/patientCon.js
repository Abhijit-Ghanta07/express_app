import jwt from "jsonwebtoken";
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        return res.status(400).json("token is invalid");
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(403).json("you are not authticated");
  }
}

function verifyDoctorAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.isdoctor || req.user.isadmin) {
      next();
    } else {
      res.status(403).json("you are not allowed");
    }
  });
}

export default verifyDoctorAndAdmin;
