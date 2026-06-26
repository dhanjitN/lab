import { Doctor } from "../models/doctor.model.js";
import { Phytolab } from "../models/phytolab.model.js";
import { TestData } from "../models/testData.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";

export const add = AsyncHandler(async (req, res) => {
  const { labId } = req.params;
  const { doctorName } = req.body;

  if (!doctorName) {
    return res
      .status(400)
      .json(new ApiResponse(400, "", "Doctor name is missing  "));
  }

  const testData = await TestData.findOne({ phytolabId: labId });

  if (!testData) {
    return res
      .status(404)
      .json(new ApiResponse(404, "", "Test Data not found  "));
  }

  const newDoctor = await Doctor.create({
    doctorName,
  });

  if (!newDoctor) {
    return res
      .status(500)
      .json(new ApiResponse(500, "", "Error occured while creating doctor"));
  }

  const addedDoctor = await testData.updateOne(
    {
      $addToSet: { doctors: newDoctor._id },
    },
    { new: true }
  );

  return res
    .status(201)
    .json(new ApiResponse(200, addedDoctor, "Doctor Created Successfully"));
});

export const updateOne = AsyncHandler(async (req, res) => {
  const { labId, doctorId } = req.params;
  const { doctorName } = req.body;

  const testData = await TestData.findOne({
    phytolabId: labId,
    doctors: doctorId,
  });
  if (!testData) {
    return res
      .status(404)
      .json(new ApiResponse(404, "", "Test Data not found  "));
  }

  const doctor = await Doctor.findByIdAndUpdate(
    doctorId,
    {
      doctorName,
    },
    { new: true }
  );

  if (!doctor) {
    return res.status(400).json(new ApiResponse(400, "", "Doctor not found !"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, doctor, "Doctor Updated   Successfully"));
});

export const getAll = AsyncHandler(async (req, res) => {
  const { labId } = req.params;

  const testData = await TestData.findOne({ phytolabId: labId }).populate(
    "doctors"
  );

  if (testData.doctors.length === 0) {
    return res
      .status(404)
      .json(new ApiResponse(404, "", "No Doctors Found ; Add One"));
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, testData.doctors, "Doctors Fetched Successfully")
    );
});

export const deleteOne = AsyncHandler(async (req, res) => {
  const { labId, doctorId } = req.params;

  const testData = await TestData.findOne({
    phytolabId: labId,
    doctors: doctorId,
  });
  if (!testData) {
    return res
      .status(404)
      .json(new ApiResponse(404, "", "Test Data not found  "));
  }

  const doctor = await Doctor.findByIdAndUpdate(
    doctorId,
    {
      isActive: false,
    },
    { new: true }
  );

  if (!doctor) {
    return res.status(400).json(new ApiResponse(400, "", "Doctor not found !"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, doctor, "Doctor Deleted  Successfully"));
});

export const getDoctors = AsyncHandler(async (req, res) => {
  const { id } = req.phytolab;

  if (!id) {
    return res
      .status(400)
      .json(new ApiResponse(400, "", "Phytolab Id is missing"));
  }

  const doctors = await Doctor.findOne({ phytolabId: id });

  if (!doctors) {
    return res
      .status(404)
      .json(new ApiResponse(404, "", "No Doctor Object Found "));
  }

  if (doctors.doctors.length === 0) {
    return res.status(404).json(new ApiResponse(404, "", "No Doctors Found "));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, doctors, "Doctors Fetched Successfully"));
});
