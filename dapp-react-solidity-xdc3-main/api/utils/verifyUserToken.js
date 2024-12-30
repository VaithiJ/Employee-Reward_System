import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyTokenn = (req, res, next) => {
  const token = req.cookies.employee_token;
  console.log(req.cookies)
  if (!token) {
    console.log(token)
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    console.log(user)
    next();
  });
};

export const verifyUserr = (req, res, next) => {
  verifyTokenn(req, res, (err) => {
    if (err) return next(createError(403, "Token is not valid!"));

    if (req.user.id === req.params.id) {
      console.log(req.user.id)
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
