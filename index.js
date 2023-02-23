const express = require("express");
const router = require("./routes/routers");
const mongoose = require("mongoose");
const dotenv = require("dotenv");


const PORT = 8000;
dotenv.config();

const app = express();
app.use(router);


app.listen(PORT, async () => {
  console.log(`server up on port ${PORT}`);
});

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });