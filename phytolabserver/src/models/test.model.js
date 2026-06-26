import mongoose, { Schema } from "mongoose";

const testSchema = new Schema({
  testName: String,
  testCode: String,
  refRangeStart: String,
  refRangeEnd: String,
  refPostitiveNegative: Boolean,
  unit: String,
  isActive: {
    type: "Boolean",
    required: "true",
    default: "true",
  },
  isCalculated: {
    type: "Boolean",
    required: "true",
    default: "false",
  },
  formula: String,
  dependsOn: [String],
  testNote: String,
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  price: Number,
});

export const Test = mongoose.model("Test", testSchema);
