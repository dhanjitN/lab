// ADMIN : Special User who has access/control of all other users including other special users
/*
Functions 
- register : creates new admin using username + password (using secret)
- login : new / old admins login to the platform
*/
import { Admin } from "../models/admin.model.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import env from "../constants.js";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

export const register = AsyncHandler(async (req, res) => {
  const { secret, username, password } = req.body;

  if (!(secret || username || password)) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          req.body,
          "Secret , Username or Password is missing "
        )
      );
  }

  const existingUser = await Admin.findOne({ username });

  if (existingUser) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          "Existing Error",
          "username with this user already exists"
        )
      );
  }

  const match = secret === env.ADMIN_SECRET;

  // console.log(env.SECRET, secret);

  if (!match) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, "Secret Error", "Secret code doesn't match ! ")
      );
  }

  const hashedPassword = bcrypt.hashSync(password, 12);

  const newAdmin = await Admin.create({ username, password: hashedPassword });

  if (!newAdmin) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          "Server Error",
          "server error when creating new admin "
        )
      );
  }

  return res
    .status(201)
    .json(new ApiResponse(201, newAdmin, "Admin Registered Successfully"));
});

export const login = AsyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!(username && password)) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, "Missing Error", "Username or Password is missing")
      );
  }

  const admin = await Admin.findOne({ username });

  if (!admin) {
    return res
      .status(404)
      .json(new ApiResponse(404, "Not Found", "Admin Not Found "));
  }

  const isPasswordCorrect = bcrypt.compareSync(password, admin.password);

  if (!isPasswordCorrect) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, "Password Error", "Incorrect Password entered")
      );
  }

  const token = jwt.sign(
    {
      id: admin._id,
      username: admin.username,
    },
    env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  if (!token) {
    return res
      .status(500)
      .json(new ApiResponse(500, "Server Error", "Failed Generating Token"));
  }

  res.cookie("accessToken", token, {
    httpOnly: process.env.NODE_ENV === "production" ? true : false,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    domain: process.env.NODE_ENV === "production" ? `${env.DOMAIN_URL}` : undefined,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, { token }, "Admin Login Successfull"));
});
