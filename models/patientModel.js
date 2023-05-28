import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: Number,
    phone: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    referby: String,
    reports: { type: Array },
    doctor: String,
    payementstatus: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const patient = mongoose.model("patient", patientSchema);

export default patient;
