// Phytolab/lab : Normal users 
/*
add - admin adds new lab with a username + password 
get - get all phytolabs 
update - update the specific info of the lab 
deleteOne  - hard Delete a lab from the DB

login - labs login  
verify - get's the detail of the phytolab (utilify fn created to try to hit it to check if authenticated or not )
logout - labs logout (clears cookies)

*/

import { Phytolab } from "../models/phytolab.model.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../constants.js";

export const add = AsyncHandler(async (req, res) => {
  const { username, password, note } = req.body;

  if (!username) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Missing ", "Please enter your username  "));
  }
  if (!password) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Missing ", "Please enter a password "));
  }

  const existingPhytolab = await Phytolab.findOne({ username });

  if (existingPhytolab) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          400,
          "Already existing Error",
          "Phytolab already exists "
        )
      );
  }

  const hashedPassword = bcrypt.hashSync(password, 12);

  const newPhytolab = await Phytolab.create({
    username,
    password: hashedPassword,
  });

  if (!newPhytolab) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          "Server Error",
          "Some Error occured while creating phytolab"
        )
      );
  }

  return res
    .status(201)
    .json(new ApiResponse(201, newPhytolab, "Phytolab created successfully "));
});

export const get = AsyncHandler(async (req, res) => {
  const phytolabs = await Phytolab.find();

  if (phytolabs.length === 0) {
    return res
      .status(500)
      .json(new ApiResponse(500, "Not Found ", "No Phytolabs were found "));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, phytolabs, "Phytolabs fetched successfully"));
});

export const update = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const getPhytolab = await Phytolab.findById(id);

  if (!getPhytolab) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Not Found ", "Phytolab Not Found "));
  }

  const { username, password } = req.body;

  const updateObject = {};

  if (username) {
    updateObject["username"] = username;
  } else {
    updateObject["username"] = getPhytolab.username;
  }

  const hashedPassword = bcrypt.hashSync(password, 12);
  if (password) {
    updateObject["password"] = hashedPassword;
  } else {
    updateObject["password"] = getPhytolab.password;
  }

  const updated = await getPhytolab.updateOne(updateObject);

  if (!updated) {
    return res.status(200).json(200, "Server Error", "Phytolab update failed ");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Successfully updated",
        "Phytolab updated Successfully"
      )
    );
});

export const deleteOne = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Missing", "Please enter Phytolab Id "));
  }

  const existingPhytolab = await Phytolab.findByIdAndDelete(id);

  if (!existingPhytolab) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          "Server Error",
          "Please enter a valid phytolab name "
        )
      );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, existingPhytolab, "Phytolab deleted Successfully")
    );
});

export const login = AsyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!(username || password)) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          "Missing Error",
          "Username or password field is missing "
        )
      );
  }

  const phytolab = await Phytolab.findOne({ username });

  if (!phytolab) {
    return res
      .status(404)
      .json(
        new ApiResponse(
          404,
          "Not Found",
          "Phytolab with this username not found"
        )
      );
  }

  const isPasswordCorrect = bcrypt.compareSync(password, phytolab.password);

  if (!isPasswordCorrect) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          "Incorrect Password",
          "Incorrect password for this username"
        )
      );
  }

  const token = jwt.sign(
    {
      id: phytolab._id,
      username: phytolab.username,
    },
    env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
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
    domain: process.env.NODE_ENV === "production" ? `${env.DOMAIN_URL}` : "",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, token, "Phytolab Login Successfull"));
});

export const verify = AsyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.phytolab, "Phytolab Info"));
});

export const logout = AsyncHandler(async (req, res) => {
  res.cookie("accessToken", "", {
    httpOnly: process.env.NODE_ENV === "production" ? true : false,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    domain: process.env.NODE_ENV === "production" ? `${env.DOMAIN_URL}` : "",
  });

  return res.status(200).json(new ApiResponse(200, "", "Logout Successfull"));
});
