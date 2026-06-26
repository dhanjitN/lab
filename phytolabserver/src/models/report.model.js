import mongoose, { Schema } from "mongoose";

const reportSchema = new Schema(
  {
    referenceNumber: String,
    testDate: String,
    reportDate: String,
    referenceDoctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
    },
    patientName: String,
    patientAge: String,
    patientGender: String,
    reportData: String,
    deleted: Boolean,
  },
  {
    timestamps: true,
  }
);

export const Report = mongoose.model("Report", reportSchema);
