import mongoose, { Schema } from "mongoose";

const collectionSchema = new Schema({
  collectionName: String,
  tests: [
    {
      type: Schema.Types.ObjectId,
      ref: "Test",
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  note: String,
});

export const TestCollection = mongoose.model("Collection", collectionSchema);
