import express from "express";
import patient from "../models/patientModel.js";
import { verifyUserAndAdmin } from "../controllers/patientCon.js";
import { verifyAuthAndAdmin } from "../controllers/auth.js";
const router = express.Router();

router.get("/get/:id", verifyUserAndAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const findPatient = await patient.findOne({ _id: id });
    res.json(findPatient).status(200);
  } catch (err) {
    res.json(err).status(500);
  }
});
router.post("/add", verifyUserAndAdmin, async (req, res) => {
  const newPatient = new patient(req.body);
  try {
    const savePatient = await newPatient.save();
    res.json(savePatient).status(201);
  } catch (err) {
    res.json(err).status(500);
  }
});
router.patch("/update/:id", verifyUserAndAdmin, async (req, res) => {
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
router.delete("/remove/:id", verifyAuthAndAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const removePatient = await patient.deleteOne({ _id: id });
    res.json({ message: "delte suceefully" }).status(200);
  } catch (err) {
    res.json(err).status(500);
  }
});
router.get("/allpatient", verifyAuthAndAdmin, async (req, res) => {
  try {
    const allPatients = await patient.find();
    res.json(allPatients).status(200);
  } catch (err) {
    res.json(err).status(500);
  }
});

export default router;
