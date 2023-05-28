import express from "express";
import patient from "../models/patientModel.js";
import verifyDoctorAndAdmin from "../controllers/patientCon.js";
import { verifyAdmin } from "../controllers/auth.js";
const router = express.Router();

router.get("/get/:id", verifyDoctorAndAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const findPatient = await patient.findOne({ _id: id });
    res.json(findPatient).status(200);
  } catch (err) {
    res.json(err).status(500);
  }
});
router.post("/add", verifyAdmin, async (req, res) => {
  const newPatient = new patient(req.body);
  try {
    const savePatient = await newPatient.save();
    res.json(savePatient).status(201);
  } catch (err) {
    res.json(err).status(500);
  }
});
router.patch("/update/:id", verifyAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const updatePatient = await patient.updateOne(
      { _id: id },
      { $set: req.body }
    );
    if (updatePatient) {
      res.json("update suceefully").status(200);
    } else {
      res.json("error in udating patient data").status(500);
    }
  } catch (err) {
    res.json(err).status(500);
  }
});
router.delete("/remove/:id", verifyAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const removePatient = await patient.deleteOne({ _id: id });
    res.json("delte suceefully").status(200);
  } catch (err) {
    res.json(err).status(500);
  }
});
router.get("/allpatient", verifyAdmin, async (req, res) => {
  try {
    const allPatients = await patient.find();
    res.json(allPatients).status(200);
  } catch (err) {
    res.json(err).status(500);
  }
});

export default router;
