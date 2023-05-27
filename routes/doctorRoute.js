import express from "express";
import doctor from "../models/doctorModel.js";
const router = express.Router();

router.get("/getdoc/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const finddoctor = await doctor.findOne({ _id: id });
    res.json(finddoctor).status(200);
  } catch (err) {
    res.json(err).status(500);
  }
});
router.post("/adddoc", async (req, res) => {
  const newDoctor = new doctor(req.body);
  try {
    const saveDoc = await newDoctor.save();
    res.json(saveDoc).status(201);
  } catch (err) {
    res.json(err).status(500);
  }
});
router.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updateDoctor = await doctor.updateOne(
      { _id: id },
      { $set: req.body }
    );
    res.json("update suceefully").status(200);
  } catch (err) {
    res.json(err).status(500);
  }
});
router.delete("/remove/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const removeDoctor = await doctor.deleteOne({ _id: id });
    res.json("delte suceefully").status(200);
  } catch (err) {
    res.json(err).status(500);
  }
});
router.get("/allDoc", async (req, res) => {
  const doctors = await doctor.find();
  res.json(doctors).status(200);
});

export default router;