import { Report } from "../models/report.model.js";
import { ReportCollection } from "../models/reportCollection.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";

export const add = AsyncHandler(async (req, res) => {
  const { id } = req.phytolab;
  const {
    referenceNumber,
    testDate,
    reportDate,
    referenceDoctor,
    patientName,
    patientAge,
    patientGender,
    reportData,
  } = req.body;

  if (!id) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Missing ", "Report Collection  is missing "));
  }

  const existingReportCollection = await ReportCollection.findOne({
    phytolabId: id,
  });

  console.log("existing collection", existingReportCollection);
  if (!existingReportCollection) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Not Found ", "Report Collection not Found "));
  }

  const newReport = await Report.create({
    referenceNumber,
    testDate,
    reportDate,
    referenceDoctor,
    patientName,
    patientAge,
    patientGender,
    reportData,
  });

  if (!newReport) {
    return res
      .status(500)
      .json(new ApiResponse(500, "Server Error", "Failed Adding New Report"));
  }

  const updated = await existingReportCollection.updateOne({
    $addToSet: { reports: [newReport._id] },
  });

  if (!updated) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          "Server Error",
          "Failed Adding Report to Report Collection"
        )
      );
  }

  const result = {
    newReport,
    updated,
  };

  return res
    .status(201)
    .json(new ApiResponse(201, result, "Report created Successfully"));
});

export const update = AsyncHandler(async (req, res) => {
  const { reportId } = req.params;
  const { id } = req.phytolab;

  const {
    referenceNumber,
    testDate,
    reportDate,
    referenceDoctor,
    patientName,
    patientAge,
    patientGender,
    reportData,
  } = req.body;

  const reportCollection = await ReportCollection.findOne({
    phytolabId: id,
  }).populate("reports");

  console.log(reportCollection);

  const existingReport = reportCollection.reports.filter(
    (report) => report._id === reportId
  );

  if (!existingReport) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          "Not Found",
          "Report is not available in your report Collection"
        )
      );
  }

  const report = await Report.findById(reportId);

  if (!report) {
    return res
      .status(404)
      .json(new ApiResponse(400, "Not Found ", "Report  not Found "));
  }

  const newReport = await report.updateOne({
    referenceNumber: referenceNumber || report.referenceNumber,
    testDate: testDate || report.testDate,
    reportDate: reportDate || report.reportDate,
    referenceDoctor: referenceDoctor || report.referenceDoctor,
    patientName: patientName || report.patientName,
    patientAge: patientAge || report.patientAge,
    patientGender: patientGender || report.patientGender,
    reportDate: reportData || report.reportData,
  });

  if (!newReport) {
    return res
      .status(500)
      .json(new ApiResponse(500, "Server Error", "Failed Adding New Report"));
  }

  return res
    .status(201)
    .json(new ApiResponse(201, newReport, "Report created Successfully"));
});

export const getOne = AsyncHandler(async (req, res) => {
  const { reportId } = req.params;

  const { id } = req.phytolab;

  const reportCollection = await ReportCollection.findOne({
    phytolabId: id,
  }).populate("reports");

  if (!reportCollection) {
    return res
      .status(404)
      .json(
        new ApiResponse(
          404,
          "Not Found",
          "Report Collection not found , create one"
        )
      );
  }

  const report = reportCollection.reports.filter((r) => reportId == r._id);

  console.log(reportCollection);

  if (!report) {
    return res
      .status(404)
      .json(
        new ApiResponse(
          404,
          "Missing Error",
          "Missing Report with this report Id "
        )
      );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, report, "Report Fetched Successfully"));
});

export const deleteOne = AsyncHandler(async (req, res) => {
  const { reportId } = req.params;
  const { id } = req.phytolab;

  const reportCollection = await ReportCollection.findOne({
    phytolabId: id,
  }).populate("reports");

  if (!reportCollection) {
    return res
      .status(404)
      .json(new ApiResponse(404, "Not Found", "Report Collection not Found"));
  }

  const isAvailable = reportCollection.reports.filter(
    (r) => r._id === reportId
  );

  if (!isAvailable) {
    return res
      .status(404)
      .json(
        new ApiResponse(
          404,
          "not found",
          "Report id is not in your report Collection"
        )
      );
  }

  const deleted = await Report.findByIdAndDelete(reportId);

  if (!deleted) {
    return res
      .status(500)
      .json(new ApiResponse(500, "Delete Error", "Failed Deleting Report"));
  }

  return res
    .status(204)
    .json(new ApiResponse(200, deleted, "Successfully Deleted the report"));
});

export const clientDelete = AsyncHandler(async (req, res) => {
  const { reportId } = req.params;
  const { id } = req.phytolab;

  const reportCollection = await ReportCollection.findOne({
    phytolabId: id,
  }).populate("reports");

  console.log(reportCollection);

  const existingReport = reportCollection.reports.filter(
    (report) => report._id === reportId
  );

  if (!existingReport) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          "Not Found",
          "Report is not available in your report Collection"
        )
      );
  }

  const report = await Report.findById(reportId);

  if (!report) {
    return res.status(404).json(new ApiResponse(404, "", "Report Not Found `"));
  }

  const newReport = await report.updateOne({
    referenceNumber: report.referenceNumber,
    patientName: report.patientName,
    patientAge: report.patientAge,
    patientGender: report.patientGender,
    testDate: report.testDate,
    reportDate: report.reportDate,
    reportData: report.reportData,
    deleted: true,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, newReport, "Report Updated Successfully"));
});
