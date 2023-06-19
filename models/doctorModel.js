import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    doctorname: {
      type: String,
      required: true,
    },
    age: Number,
    department: {
      type: Array,
      required: true,
    },
    specilist: String,
    address: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: Number,
      unique: true,
      required: true,
    },
    degree: {
      type: Array,
    },
    languages: {
      type: Array,
      default: ["bengali,english"],
    },
    exp: String,
    location: String,
    timeTable: {
      type: Object,
    },
    fees: {
      type: Object,
      default: { hospital: "free" },
    },
    available: {
      type: String,
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

const doctor = mongoose.model("doctor", doctorSchema);

export default doctor;
