//glc 2025
require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise"); // we like promises
const app = express();

// middleware
app.use(express.json());

// db connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// test
app.get("/", (req, res) => {
  res.send("Server works!");
});

// additional tests for routing
const testRouter = require("./routes/test");
app.use("/test", testRouter(pool));

//next id
const nextIdRouter = require("./routes/nextid");
app.use("/nextid", nextIdRouter(pool));

//customers
const customerRouter = require("./routes/customers");
app.use("/customers", customerRouter(pool));

//category
const categoryRouter = require("./routes/category");
app.use("/category", categoryRouter(pool));

//equipment
const categoryEquipment = require("./routes/equipment");
app.use("/equipment", categoryEquipment(pool));

//rental
const rentalInformation = require("./routes/rental");
app.use("/rental", rentalInformation(pool));

// fire up server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, pool };
