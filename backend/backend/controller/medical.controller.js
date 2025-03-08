import Dosage from "../models/dosage.model.js";
import Medical from "../models/medical.model.js";

export const getMedical = async (req, res) => {
  const medicalDetails = await Medical.find({ userId: req.session.userId });

  if (!medicalDetails) {
    res.status(400).json({ result: "Invalid User" });
  }

  //If success return 200 okk
  res.status(200).json(medicalDetails);
};

export const addMedical = async (req, res) => {
  const {
    medicineName,
    dosageQuantity,
    dosageUnit,
    frequency,
    startDate,
    endDate,
    expiryDate,
    currentQuantity,
  } = req.body;

  const newMedical = new Medical({
    userId: req.session.userId,
    medicineName,
    dosageQuantity,
    dosageUnit,
    frequency,
    startDate,
    endDate,
    expiryDate,
    currentQuantity,
  });

  await newMedical.save();
  //If success return 200 okk
  res.status(200).json({ result: "Success" });
};

export const updateMedical = async (req, res) => {
  const { id, frequency, date, time, status } = req.body;

  const medical = await Medical.findById(id);

  if (frequency) {
    medical.frequency.push(frequency);
  }

  const newDosage = new Dosage({
    date,
    time,
    status,
  });

  medical.dosageHistory.push(newDosage._id);

  await newDosage.save();
  await medical.save();
  //If success return 200 okk
  res.status(200).json({ result: "Success" });
};
