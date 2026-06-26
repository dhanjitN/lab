import mongoose, { Schema } from "mongoose";

const testDataSchema = new Schema({
  phytolabId: {
    type: Schema.Types.ObjectId,
    ref: "Phytolab",
  },
  collections: [
    {
      type: Schema.Types.ObjectId,
      ref: "Collection",
    },
  ],
  tests: [
    {
      type: Schema.Types.ObjectId,
      ref: "Test",
    },
  ],
  category: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  doctors: [
    {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
    },
  ],
  note: String,
});

export const TestData = mongoose.model("TestData", testDataSchema);
