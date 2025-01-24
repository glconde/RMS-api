//glc 2025
const express = require("express");
const router = express.Router();

module.exports = (pool) => {
  router.get("/", async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM rental_info");
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch rental information." });
    }
  });

  // get rental by id
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await pool.query(
        "SELECT * FROM rental_info WHERE rental_id = ?",
        [id]
      );
      if (rows.length === 0) {
        return res.status(404).json({ error: "Rental Information not found." });
      }
      res.json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch equipment." });
    }
  });

  //get rental by customer or rental date
  router.get("/", async (req, res) => {
    const { customer_id, rental_date } = req.query; // filters
    try {
      let query = "SELECT * FROM rental_info";
      const params = [];

      // add filters based on query parameters
      if (customer_id || rental_date) {
        query += " WHERE ";
        const conditions = [];
        if (customer_id) {
          conditions.push("customer_id = ?");
          params.push(customer_id);
        }
        if (rental_date) {
          conditions.push("DATE(rental_date) = ?");
          params.push(rental_date);
        }
        query += conditions.join(" AND ");
        console.log(query);
      }

      const [rows] = await pool.query(query, params);
      if (rows.length === 0) {
        return res.status(404).json({ error: "No rental information found." });
      }

      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch rental information." });
    }
  });

  // add
  router.post("/", async (req, res) => {
    const {
      RentalId,
      CurrentDate,
      CustomerId,
      EquipmentId,
      RentalDate,
      ReturnDate,
      Cost,
    } = req.body;
    console.log(JSON.stringify(req.body, null, 2));
    try {
      await pool.query(
        "INSERT INTO rental_info (rental_id, currentdate, customer_id, equipment_id, rental_date, return_date, cost) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          RentalId,
          CurrentDate,
          CustomerId,
          EquipmentId,
          RentalDate,
          ReturnDate,
          Cost,
        ]
      );
      res
        .status(201)
        .json({ message: "Rental Information created successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create rental information." });
    }
  });

  // update
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const {
      CurrentDate,
      CustomerId,
      EquipmentId,
      RentalDate,
      ReturnDate,
      Cost,
    } = req.body;
    console.log(JSON.stringify(req.body, null, 2));
    try {
      const [result] = await pool.query(
        "UPDATE rental_info SET currentdate = ?, customer_id = ?, equipment_id = ?, rental_date = ?, return_date = ?, cost = ? WHERE rental_id = ?",
        [CurrentDate, CustomerId, EquipmentId, RentalDate, ReturnDate, Cost, id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Rental Information not found." });
      }
      res.json({ message: "Rental Information updated successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update rental information." });
    }
  });

  // delete
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await pool.query(
        "DELETE FROM rental_info WHERE rental_id = ?",
        [id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Rental Information not found." });
      }
      res.json({ message: "Rental Information deleted successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete rental information." });
    }
  });

  return router;
};
