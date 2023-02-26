const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const cors = require("cors");
const jwt = require("jsonwebtoken")
dotenv.config();
app.use(cors());
app.use(express.json());
mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://amarsaahu1997:Qwerty123@student-cluster0.hlzlzz3.mongodb.net/blogWebsite",
    { useNewUrlParser: true }
  )
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);

app.listen(5000, () => {
  console.log("Backend is running: 5000");
});
