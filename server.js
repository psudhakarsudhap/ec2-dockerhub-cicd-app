import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  ward: { type: String, required: true },
});
const Patient = mongoose.model("Patient", patientSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/v1/patients", async (req, res) => {
  const newPatient = new Patient(req.body);
  await newPatient.save();
  res
    .status(201)
    .json({ message: "Patient added successfully", data: newPatient });
});

app.get("/api/v1/patients", async (req, res) => {
  const patients = await Patient.find();
  res.json({ message: "Patients retrieved successfully", data: patients });
});

app.get("/api/v1/patients/:id", async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }
  res.json({ message: "Patient retrieved successfully", data: patient });
});

app.put("/api/v1/patients/:id", async (req, res) => {
  const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }
  res.json({ message: "Patient updated successfully", data: patient });
});

app.delete("/api/v1/patients/:id", async (req, res) => {
  const patient = await Patient.findByIdAndDelete(req.params.id);
  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }
  res.json({ message: "Patient deleted successfully", data: patient });
});

app.get("/", (req, res) => {
  res.json({ message: "Patients API is running" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
