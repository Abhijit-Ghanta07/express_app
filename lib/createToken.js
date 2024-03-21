import jwt from "jsonwebtoken";

function createToken(user) {
  const acceesToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SEC
  );
  return acceesToken;
}

export default createToken;
