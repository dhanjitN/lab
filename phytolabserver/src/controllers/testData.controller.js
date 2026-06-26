import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import { TestData } from "../models/testData.model.js";
import { Phytolab } from "../models/phytolab.model.js";
import { Category } from "../models/category.model.js";
import { populate } from "dotenv";

// for admins
export const addTestData = AsyncHandler(async (req, res) => {
  const { phytolabId, note } = req.body;

  const phytolab = await Phytolab.findById(phytolabId);

  if (!phytolab) {
    return res.status(404).json(new ApiResponse(404, "", "Phytolab not found"));
  }

  const existingTestData = await TestData.findOne({ phytolabId });

  if (existingTestData) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, "", "Test Data for this phytolab already exists")
      );
  }

  const newTestData = await TestData.create({
    phytolabId,
    testData: [],
    note,
  });

  if (!newTestData) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          "",
          "Some Server Error while creating new test data"
        )
      );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        newTestData,
        ` Test Data created for ${phytolab.username} `
      )
    );
});

export const getAll = AsyncHandler(async (req, res) => {
  const testData = await TestData.find();

  if (testData.length === 0) {
    return res.status(404).json(new ApiResponse(404, "", "No Test Data Found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, testData, "Test Data Fetched Sucessfully"));
});

export const updateTestData = AsyncHandler(async (req, res) => {
  const { testDataId } = req.params;
  const { note } = req.body;

  const testData = await TestData.findById(testDataId);

  if (!testData) {
    return res
      .status(404)
      .json(new ApiResponse(404, "", "test data not found"));
  }

  const updatedTestData = testData.updateOne({
    note,
  });

  if (!updatedTestData) {
    return res
      .status(500)
      .json(new ApiResponse(500, "", "Failed Updating Test Data "));
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        updateTestData,
        ` Test Data updated for Successfully `
      )
    );
});

export const deleteTestData = AsyncHandler(async (req, res) => {
  const { testDataId } = req.params;

  const testData = await TestData.findById(testDataId);

  if (!testData) {
    return res
      .status(400)
      .json(new ApiResponse(400, "", "Test Data Not found"));
  }

  const deletedTestData = await testData.deleteOne();

  if (!deletedTestData) {
    return res
      .status(500)
      .json(new ApiResponse(500, "", "Failed Deleting Test Data"));
  }

  return res
    .status(204)
    .json(new ApiResponse(204, testData, "Test Data Successfully Deleted"));
});

export const linkTestData = AsyncHandler(async (req, res) => {
  const { testDataId } = req.params;
  const { testCategoryId } = req.body;

  const testData = await TestData.findById(testDataId);

  if (!testData) {
    return res
      .status(404)
      .json(new ApiResponse(404, "", "Test Data Not Found"));
  }

  const testCategory = await TestCategory.findById(testCategoryId);

  if (!testCategory) {
    return res
      .status(404)
      .json(new ApiResponse(404, "", "Test Category Found Found"));
  }

  const updatedTestData = await testData.updateOne({
    $addToSet: { testData: [testCategory._id] },
  });

  if (!updatedTestData) {
    return res
      .status(500)
      .json(
        new ApiResponse(500, "", "Some Error Occured while updating Test Data")
      );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedTestData,
        `${testCategory.testCategoryName} is linked successfully`
      )
    );
});

export const unlinkTestData = AsyncHandler(async (req, res) => {
  const { testDataId } = req.params;
  const { testCategoryId } = req.body;

  const testData = await TestData.findById(testDataId);

  if (!testData) {
    return res
      .status(404)
      .json(new ApiResponse(404, "", "Test Data Not Found"));
  }

  const testCategory = await TestCategory.findById(testCategoryId);

  if (!testCategory) {
    return res
      .status(404)
      .json(new ApiResponse(404, "", "Test Category Found Found"));
  }

  const updatedTestData = await testData.updateOne({
    $pull: { testData: { $in: [testCategory._id] } },
  });

  if (!updatedTestData) {
    return res
      .status(500)
      .json(
        new ApiResponse(500, "", "Some Error Occured while updating Test Data")
      );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedTestData,
        `${testCategory.testCategoryName} is unlinked successfully`
      )
    );
});

export const getOne = AsyncHandler(async (req, res) => {
  const { phytolabId } = req.params;

  /* const testData = await TestData.findOne({ phytolabId }).populate({
    path: "testData",
    populate: {
      path: "testCollections",
      model: "TestCollection",
      populate: "tests",
    },
  }); */
  const testData = await TestData.findOne({phytolabId})

  if (!testData) {
    return res
      .status(404)
      .json(
        new ApiResponse(404, null, "Test Data for this phytolab not found ")
      );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, testData, "Test Data Fetched Successfully "));
});

// for phytolabs

export const getTestData = AsyncHandler(async (req, res) => {
  const { id } = req.phytolab;

  const testData = await TestData.findOne({ phytolabId: id }).populate({
    path: "testData",
    populate: {
      path: "testCollections",
      model: "TestCollection",
      populate: "tests",
    },
  });

  if (!testData) {
    return res.status(404).json(new ApiResponse(404, "", "No Test Data found"));
  }
  return res.status(200).json(new ApiResponse(200, testData, "Data Fetched"));
});
