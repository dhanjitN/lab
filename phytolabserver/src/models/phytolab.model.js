import mongoose, { Schema } from "mongoose";

const phytolabSchema = new Schema(
  {
    username: String,
    password: String,
    refreshToken: String,
  },
  {
    timestamps: true,
  }
);

export const Phytolab = mongoose.model("Phytolab", phytolabSchema);
