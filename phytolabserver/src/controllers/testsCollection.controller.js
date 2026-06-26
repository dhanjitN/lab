import AsyncHandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { TestCollection } from "../models/collection.model.js";
import { TestData } from "../models/testData.model.js";
import { Category } from "../models/category.model.js";

const add = AsyncHandler(async (req, res) => {
  const { labId } = req.params;
  const { collectionName, tests, isActive, price, note, category } = req.body;

  if (!collectionName) {
    return res
      .status(400)
      .json(new ApiResponse(400, " ", "Collection Name is missing  "));
  }

  if (!category) {
    return res
      .status(400)
      .json(new ApiResponse(400, "", "Category  is missing"));
  }

  const categoryExists = await Category.findById(category);

  if (!categoryExists) {
    return res
      .status(404)
      .jsong(new ApiResponse(400, "", "Category Not Found "));
  }

  const testData = await TestData.findOne({ phytolabId: labId });
  if (!testData) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, "", "Test Data for the requested lab not found !")
      );
  }

  const newCollection = await TestCollection.create({
    collectionName,
    tests,
    isActive,
    price,
    note,
    category,
  });

  if (!newCollection) {
    return res
      .status(500)
      .json(
        new ApiResponse(500, "", "Server Error while creating collection ")
      );
  }

  const addedCollection = await testData.updateOne(
    {
      $addToSet: { collections: newCollection._id },
    },
    { new: true }
  );

  if (!addedCollection) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          "",
          "Server error @ adding collection to test data"
        )
      );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        addedCollection,
        "Test Collection Created Successfully "
      )
    );
});

const getOne = AsyncHandler(async (req, res) => {
  const { labId, collectionId } = req.params;

  if (!collectionId) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Not found ", "Test Collection not found "));
  }

  const testData = await TestData.findOne({
    phytolabId: labId,
    collections: collectionId,
  });

  if (!testData) {
    return res
      .status(404)
      .json(new ApiResponse(404, "", "Test Data not found "));
  }

  const collection = await TestCollection.findById(collectionId);
  if (!collection) {
    return res
      .status(404)
      .json(new ApiResponse(404, "", "Collection Not Found"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, collection, "Collection fetched successfully"));
});

const update = AsyncHandler(async (req, res) => {
  const { labId, collectionId } = req.params;
  const { collectionName, tests, isActive, price, note, category } = req.body;

  const testData = await TestData.findOne({
    phytolabId: labId,
    collections: collectionId,
  });

  if (!testData) {
    return res
      .status(404)
      .json(new ApiResponse(404, "", "Collection not Found "));
  }

  const collection = await TestCollection.findByIdAndUpdate(
    collectionId,
    {
      collectionName,
      tests,
      isActive,
      price,
      note,
      category,
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, collection, "Collection deleted successfully "));
});

const deleteOne = AsyncHandler(async (req, res) => {
  const { labId, collectionId } = req.params;

  const testData = await TestData.findOne({
    phytolabId: labId,
    collections: collectionId,
  });

  if (!testData) {
    return res
      .status(404)
      .json(new ApiResponse(404, "", "Collection not Found "));
  }

  const collection = await TestCollection.findByIdAndUpdate(
    collectionId,
    {
      isActive: false,
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, collection, "Collection deleted successfully "));
});

export { add, update, getOne, deleteOne };
