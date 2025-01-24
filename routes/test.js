//glc 2025
const express = require("express");
const router = express.Router();

module.exports = (pool) => {
  router.get("/", async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM customer");
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database query failed" });
    }
  });

  return router;
};
