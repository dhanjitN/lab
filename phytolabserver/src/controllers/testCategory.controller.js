import { Category } from "../models/category.model.js";
import { TestData } from "../models/testData.model.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

const add = AsyncHandler(async (req, res) => {
  const { labId } = req.params;
  const { categoryName } = req.body;

  if (!categoryName) {
    return res
      .status(400)
      .json(new ApiResponse(400, "", "Category Name is missing"));
  }

  const testData = await TestData.findOne({ phytolabId: labId });

  if (!testData) {
    return res.status(404).json(new ApiResponse(404, "", "Lab not Found"));
  }

  const newCategory = await Category.create({
    categoryName,
  });

  const addedCategory = await testData.updateOne(
    {
      $addToSet: { category: newCategory._id },
    },
    { new: true }
  );

  return res
    .status(201)
    .json(
      new ApiResponse(201, addedCategory, "Test Category created successfully")
    );
});

const getOne = AsyncHandler(async (req, res) => {
  const { labId, categoryId } = req.params;

  const testData = await TestData.findOne({
    phytolabId: labId,
    category: categoryId,
  });

  if (!testData) {
    return res
      .status(404)
      .json(new ApiResponse(404, "", " not found in test data  ! "));
  }

  const category = await Category.findById(categoryId);

  if (!category) {
    return res.status(404).json(new ApiResponse(404, "", "Category not Found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, category, "Test Category Fetched Successfully"));
});

const update = AsyncHandler(async (req, res) => {
  const { labId, categoryId } = req.params;
  const { categoryName } = req.body;

  const testData = await TestData.findOne({
    phytolabId: labId,
    category: categoryId,
  });

  if (!testData) {
    return res
      .status(404)
      .json(new ApiResponse(404, "", "Not Found in Test Data "));
  }

  const category = await Category.findByIdAndUpdate(
    categoryId,
    {
      categoryName,
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, category, "Test Category updated successfully"));
});

const deleteOne = AsyncHandler(async (req, res) => {
  const { labId, categoryId } = req.params;

  const testData = await TestData.findOne({
    phytolabId: labId,
    category: categoryId,
  });

  if (!testData) {
    return res
      .status(404)
      .json(new ApiResponse(404, "", "Not Found in Test Data "));
  }

  const category = await Category.findByIdAndUpdate(
    categoryId,
    {
      isActive: false,
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, category, "Test Category deleted successfully"));
});

const getAll = AsyncHandler(async (req, res) => {
  const { labId } = req.params;

  const testData = await TestData.findOne({
    phytolabId: labId,
  }).populate("category");
  if (!testData) {
    return res
      .status(404)
      .json(new ApiResponse(404, "", "Not Found in Test Data "));
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        testData.category,
        "Categories Fetched Successfully!"
      )
    );
});

export { add, getOne, update, deleteOne, getAll };
