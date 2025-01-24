//glc 2025
const express = require("express");
const router = express.Router();

module.exports = (pool) => {
  // get all
  router.get("/", async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM Customer");
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch customers." });
    }
  });

  // get customer by id
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await pool.query(
        "SELECT * FROM Customer WHERE CustomerID = ?",
        [id]
      );
      if (rows.length === 0) {
        return res.status(404).json({ error: "Customer not found." });
      }
      res.json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch customer." });
    }
  });

  // add
  router.post("/", async (req, res) => {
    const { customerID, lastName, firstName, contactPhone, email, notes } =
      req.body;
    try {
      await pool.query(
        "INSERT INTO Customer (CustomerID, LastName, FirstName, ContactPhone, Email, Notes) VALUES (?, ?, ?, ?, ?, ?)",
        [customerID, lastName, firstName, contactPhone, email, notes]
      );
      res.status(201).json({ message: "Customer created successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create customer." });
    }
  });

  // update
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { lastName, firstName, phoneNumber, emailAddress, status, notes } =
      req.body;
    try {
      const [result] = await pool.query(
        "UPDATE Customer SET LastName = ?, FirstName = ?, ContactPhone = ?, Email = ?, Status = ?, Notes = ? WHERE CustomerID = ?",
        [lastName, firstName, phoneNumber, emailAddress, status, notes, id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Customer not found." });
      }
      res.json({ message: "Customer updated successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update customer." });
    }
  });

  // delete
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await pool.query(
        "DELETE FROM Customer WHERE CustomerID = ?",
        [id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Customer not found." });
      }
      res.json({ message: "Customer deleted successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete customer." });
    }
  });

  return router;
};
