const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', async (req, res) => {
  try {
    const employees = await db.Employee.findAll();
    res.render('employee', { title: 'Employees', employees });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

router.post('/add', async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const { name, status, email } = req.body;
    if (!name || !status || !email) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    await db.Employee.create({ name, status, email });
    res.redirect('/employees');
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).json({ error: 'Failed to add employee' });
  }
});

router.post('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status, email } = req.body;
    if (!name || !status || !email) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const updated = await db.Employee.update({ name, status, email }, { where: { id } });
    if (updated[0] === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.redirect('/employees');
  } catch (error) {
    console.error('Error editing employee:', error);
    res.status(500).json({ error: 'Failed to edit employee' });
  }
});

router.post('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.Employee.destroy({ where: { id } });
    if (deleted === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.redirect('/employees');
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Failed to delete employee' });
  }
});

module.exports = router;
