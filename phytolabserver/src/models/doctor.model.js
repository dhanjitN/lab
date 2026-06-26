import mongoose, { Schema } from "mongoose";

const doctorSchema = new Schema({
  doctorName: String,
  isActive: {
    type: Boolean,
    default: true,
  },
});

export const Doctor = mongoose.model("Doctor", doctorSchema);
