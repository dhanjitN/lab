// Handles admin validation 
// Intercepts the request and captures the jwt token and pass it on to next middleware
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import env from "../constants.js";

export const verifyAdmin = AsyncHandler(async (req, res, next) => {
  const token =
    req?.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer", "").trim();

  if (!token) {
    return res
      .status(401)
      .json(
        new ApiResponse(
          401,
          "Invalid Token",
          "Authentication token or cookie  is missing "
        )
      );
  }

  const decodedJwt = jwt.verify(token, env.JWT_SECRET);

  decodedJwt.payload = req.admin;

  next();
});
