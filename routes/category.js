//glc 2025
const express = require("express");
const router = express.Router();

module.exports = (pool) => {
  // get all
  router.get("/", async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM category_list");
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch category list." });
    }
  });

  // get category by id
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await pool.query(
        "SELECT * FROM category_list WHERE category_id = ?",
        [id]
      );
      if (rows.length === 0) {
        return res.status(404).json({ error: "Category not found." });
      }
      res.json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch Category." });
    }
  });

  //add
  router.post("/", async (req, res) => {
    const { categoryId, categoryDescription } = req.body;
    try {
      await pool.query(
        "INSERT INTO category_list (category_id, category_description) VALUES (?, ?)",
        [categoryId, categoryDescription]
      );
      res.status(201).json({ message: "Category created successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create category." });
    }
  });

  // update
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { categoryDescription } = req.body;
    try {
      const [result] = await pool.query(
        "UPDATE category_list SET category_description = ? WHERE category_id = ?",
        [categoryDescription, id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Category not found." });
      }
      res.json({ message: "Category updated successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update category." });
    }
  });

  // delete
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await pool.query(
        "DELETE FROM category_list WHERE category_id = ?",
        [id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Category not found." });
      }
      res.json({ message: "Category deleted successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete category." });
    }
  });

  return router;
};
