import mongoose, { Schema } from "mongoose";
const AdminSchema = new Schema(
  {
    username: String,
    password: String,
    refreshtoken: String,
  },
  {
    timestamps: true,
  }
);

export const Admin = mongoose.model("Admin", AdminSchema);
