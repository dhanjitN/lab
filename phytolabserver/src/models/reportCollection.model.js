import mongoose, { Schema } from "mongoose";

const reportCollectionSchema = new Schema(
  {
    phytolabId: {
      type: Schema.Types.ObjectId,
      ref: "Phytolab",
    },
    reports: [
      {
        type: Schema.Types.ObjectId,
        ref: "Report",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const ReportCollection = mongoose.model(
  "ReportCollection",
  reportCollectionSchema
);
