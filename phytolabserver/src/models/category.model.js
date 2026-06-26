import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
  categoryName: String,
  isActive: {
    type: Boolean,
    default: true,
  },
});

export const Category = mongoose.model("Category", categorySchema);
