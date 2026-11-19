import express from "express";

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.json({ message: "Express Server is running EC2 instance" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
