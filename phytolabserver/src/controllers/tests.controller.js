import AsyncHandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Test } from "../models/test.model.js";
import { Category } from "../models/category.model.js";
import { Phytolab } from "../models/phytolab.model.js";
import { TestData } from "../models/testData.model.js";

const add = AsyncHandler(async (req, res) => {
  const { labId } = req.params;
  const {
    testName,
    testCode,
    refRangeStart,
    refRangeEnd,
    refPostitiveNegative,
    unit,
    isActive,
    isCalculated,
    formula,
    dependsOn,
    testNote,
    categoryId,
    price,
  } = req.body;

  if (!(testName || testCode)) {
    return res
      .status(400)
      .json(new ApiResponse(400, "", "Missing: test name or test code "));
  }

  const testData = await TestData.findOne({ phytolabId: labId });

  if (!testData) {
    return res
      .status(404)
      .json(
        new ApiResponse(404, "", "Lab and Test Data with this id not found ")
      );
  }

  const existingTest = await Test.findOne({
    _id: { $in: testData.tests },
    testCode: testCode,
  });

  if (existingTest) {
    return res
      .status(409)
      .json(new ApiResponse(409, "", "Already existing Test "));
  }

  const newTest = await Test.create({
    testName,
    testCode,
    refRangeStart,
    refRangeEnd,
    refPostitiveNegative,
    unit,
    isActive,
    isCalculated,
    formula,
    dependsOn,
    testNote,
    categoryId,
    price,
  });

  if (!newTest) {
    return res
      .status(500)
      .json(new ApiResponse(500, "", "Server Error while creating new test"));
  }

  const addedTest = await testData.updateOne({
    $addToSet: { tests: newTest.id },
  });

  // console.log(addedTest);

  return res
    .status(200)
    .json(new ApiResponse(200, addedTest, "Test Added Successfully "));
});

const update = AsyncHandler(async (req, res) => {
  const { testId, labId } = req.params;

  const {
    testName,
    testCode,
    refRangeStart,
    refRangeEnd,
    refPostitiveNegative,
    unit,
    isActive,
    isCalculated,
    formula,
    dependsOn,
    testNote,
    categoryId,
    price,
  } = req.body;

  const testData = await TestData.findOne({ phytolabId: labId, tests: testId });

  if (!testData) {
    return res.status(404).json(new ApiResponse(404, "", "Test Not Found "));
  }

  const test = await Test.findByIdAndUpdate(testId, {
    testName,
    testCode,
    refRangeStart,
    refRangeEnd,
    refPostitiveNegative,
    unit,
    isActive,
    isCalculated,
    formula,
    dependsOn,
    testNote,
    categoryId,
    price,
  });

  if (!test) {
    return res
      .status(500)
      .json(new ApiResponse(500, "", "server error while creating test"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, test, "Successfully updated Test"));
});

const deleteOne = AsyncHandler(async (req, res) => {
  const { labId, testId } = req.params;

  const testData = await TestData.findOne({ phytolabId: labId, tests: testId });

  if (!testData) {
    return res.status(404).json(new ApiResponse(404, "", "Test  Not Found "));
  }

  const test = await Test.findByIdAndUpdate(
    testId,
    {
      isActive: false,
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, test, "Test Deleted  Successfully"));
});

const getOne = AsyncHandler(async (req, res) => {
  const { testId, labId } = req.params;

  const testData = await TestData.findOne({
    phytolabId: labId,
    tests: testId,
  });

  if (!testData) {
    return res.status(404).json(new ApiResponse(404, "", "Test  Not Found "));
  }

  const test = await Test.findById(testId);

  return res
    .status(200)
    .json(new ApiResponse(200, test, "Test Fetched Successfully "));
});

const getAll = AsyncHandler(async (req, res) => {
  const { labId } = req.params;

  const testData = await TestData.findOne({ phytolabId: labId }).populate(
    "tests"
  );

  if (!testData) {
    return res
      .status(404)
      .json(new ApiResponse(404, "", "Test Data Not Found "));
  }

  const allTests = testData.tests || [];

  if (allTests.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, "", "All Tests are empty"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, allTests, "Tests Fetched Successfully"));
});

export { add, update, deleteOne, getOne, getAll };
