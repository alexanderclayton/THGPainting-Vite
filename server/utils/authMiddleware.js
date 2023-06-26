import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const secret = process.env.SECRET;
const expiration = "2h";

export const authMiddleware = ({ req }) => {
  // allows token to be sent via req.body, req.query, or headers
  let token = req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return req;
  }

  // if token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
    console.log("authMiddleware:", req.user)
  } catch {
    console.log("Invalid token");
  }

  // return the request object so it can be passed to the resolver as `context`
  return req;
};

export const signToken = ({ email, name, _id }) => {
  const payload = { email, name, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};