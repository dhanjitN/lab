// RERPORT COLLECTION : collection of all the reports of a particular phytolab
/*
- add: adds it to a phytolab for the first time 
- get : get the report collection with reports populated 
*/

import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import { ReportCollection } from "../models/reportCollection.model.js";
import { Phytolab } from "../models/phytolab.model.js";
import { Report } from "../models/report.model.js";

export const add = AsyncHandler(async (req, res) => {
  const { id } = req.phytolab;

  if (!id) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, "Missing ", "Missing phytolab name in params ")
      );
  }

  const existingPhytolab = await Phytolab.findById(id);

  if (!existingPhytolab) {
    return res
      .status(500)
      .json(new ApiResponse(500, "Not Found", "Phytholab not found "));
  }

  const existingReportCollection = await ReportCollection.findOne({
    phytolabId: id,
  });

  if (existingReportCollection) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          "Already Exists",
          "A report collection for this phytolab already exists "
        )
      );
  }

  const newReportCollection = await ReportCollection.create({
    phytolabId: existingPhytolab._id,
    reports: [],
  });

  if (!newReportCollection) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          "Server Error",
          "Some Error occured while creating new report collection "
        )
      );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        newReportCollection,
        "New Report Created Successfully"
      )
    );
});

export const getOne = AsyncHandler(async (req, res) => {
  const { id } = req.phytolab;

  if (!id) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Missing", "Missing Phytolab ID"));
  }

  const getPhytolab = await Phytolab.findById(id);
  if (!getPhytolab) {
    return res
      .status(404)
      .json(new ApiResponse(404, "Not Found", "Phytolab not found"));
  }

  const getReportCollection = await ReportCollection.findOne({
    phytolabId: id,
  }).populate("reports");

  if (!getReportCollection) {
    return res
      .status(404)
      .json(new ApiResponse(404, "Not Found", "Report collection not found"));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        getReportCollection,
        "Report collection fetched successfully"
      )
    );
});
