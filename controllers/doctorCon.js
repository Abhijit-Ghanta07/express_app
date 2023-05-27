import doctor from "../models/doctorModel.js";

const getDoctor = async (req, res) => {
  let id = req.params;
  // const doctorFind = await doctor.findOne({ _id: id });
  res.json(id).status(200);
};
const addDoctor = async (req, res) => {};

export { addDoctor, getDoctor };
