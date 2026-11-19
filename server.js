import express from "express";

const app = express();
const port = 5000;
const patients = [
  { id: 1, name: "John Doe", age: 30, ward: "A1" },
  { id: 2, name: "Jane Smith", age: 25, ward: "B2" },
  { id: 3, name: "Alice Johnson", age: 40, ward: "C3" },
];

app.use(express.json());

app.post("/api/v1/patients", (req, res) => {
  const newPatient = { id: patients.length + 1, ...req.body };
  patients.push(newPatient);
  res
    .status(201)
    .json({ message: "Patient added successfully", data: newPatient });
});

app.get("/api/v1/patients", (req, res) => {
  res.json({ message: "Patients retrieved successfully", data: patients });
});

app.get("/api/v1/patients/:id", (req, res) => {
  const patient = patients.find(p => p.id === parseInt(req.params.id));
  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }
  res.json({ message: "Patient retrieved successfully", data: patient });
});

app.put("/api/v1/patients/:id", (req, res) => {
  const patient = patients.find(p => p.id === parseInt(req.params.id));
  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }
  Object.assign(patient, req.body);
  res.json({ message: "Patient updated successfully", data: patient });
});

app.delete("/api/v1/patients/:id", (req, res) => {
  const patientIndex = patients.findIndex(p => p.id === parseInt(req.params.id));
  if (patientIndex === -1) {
    return res.status(404).json({ message: "Patient not found" });
  }
  const deletedPatient = patients.splice(patientIndex, 1)[0];
  res.json({ message: "Patient deleted successfully", data: deletedPatient });
});

app.get("/", (req, res) => {
  res.json({ message: "Express Server is running EC2 instance" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
