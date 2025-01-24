const express = require('express');
const router = express.Router();

module.exports = (pool) => {

  router.get('/', async (req, res) => {
    const { table, idcol } = req.query;

    if (!table || !idcol) {
      return res.status(400).json({ error: 'Table name and ID column are required.' });
    }

    try {
      const query = `SELECT MAX(${idcol}) AS NextId FROM ${table}`;

      const [results] = await pool.query(query);  

      const nextId = results[0].NextId === null ? 1 : results[0].NextId + 1;
      res.json({ nextId });
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  return router;
};
