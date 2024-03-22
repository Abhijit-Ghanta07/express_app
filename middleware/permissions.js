import { UnauthError } from "../lib/customError.js";

const verifypermission = (req, res, next) => {
  const { rules } = req.body;
  let rulesArr = rules.split(",") || [];

  if (rulesArr.length > 0 && rulesArr.includes("write")) {
    next();
  } else {
    const err = new UnauthError("you don't have permission ", 401);
    next(err);
  }
};
const adminPermit = (req, res, next) => {
  req.user = 3;
  return next();
};

export { verifypermission, adminPermit };
