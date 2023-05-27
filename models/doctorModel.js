import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: Number,
    department: {
      type: String,
      required: true,
    },
    specilist: String,
    address: {
      type: Object,
      required: true,
    },
    phone: Number,
    timeTable: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const doctor = mongoose.model("doctor", doctorSchema);

export default doctor;
