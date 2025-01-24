//glc 2025
const express = require("express");
const router = express.Router();

module.exports = (pool) => {
  // get all
  router.get("/", async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM rental_equipment");
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch equipment list." });
    }
  });

  // get equipment by id
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await pool.query(
        "SELECT * FROM rental_equipment WHERE equipment_id = ?",
        [id]
      );
      if (rows.length === 0) {
        return res.status(404).json({ error: "Equipment not found." });
      }
      res.json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch equipment." });
    }
  });

  // add
  router.post("/", async (req, res) => {
    const { equipmentId, categoryId, name, description, dailyCost } = req.body;
    console.log(JSON.stringify(req.body, null, 2));
    try {
      await pool.query(
        "INSERT INTO rental_equipment (equipment_id, category, name, description, daily_rental_cost) VALUES (?, ?, ?, ?, ?)",
        [equipmentId, categoryId, name, description, dailyCost]
      );
      res.status(201).json({ message: "Equipment created successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create equipment." });
    }
  });

  // update
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { categoryId, name, description, dailyCost } = req.body;
    try {
      const [result] = await pool.query(
        "UPDATE rental_equipment SET category = ?, name = ?, description = ?, daily_rental_cost = ? WHERE equipment_id = ?",
        [categoryId, name, description, dailyCost, id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Equipment not found." });
      }
      res.json({ message: "Equipment updated successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update equipment." });
    }
  });

  // delete
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await pool.query(
        "DELETE FROM rental_equipment WHERE equipment_id = ?",
        [id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Equipment not found." });
      }
      res.json({ message: "Equipment deleted successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete equipment." });
    }
  });

  return router;
};
