const express = require('express');
const router = express.Router();
const db = require('../models');

// Get all assets
router.get('/', async (req, res) => {
  try {
    const assets = await db.Asset.findAll({
      include: [db.Employee, db.AssetCategory],
    });
    res.render('asset', { title: 'Assets', assets });
  } catch (error) {
    console.error('Error fetching assets:', error);
    res.status(500).json({ error: 'Failed to fetch assets' });
  }
});

// Add new asset
router.post('/add', async (req, res) => {
  try {
    const { serialNumber, make, model, status, employeeId, categoryId } = req.body;
    if (!serialNumber || !make || !model || !status || !employeeId || !categoryId) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    await db.Asset.create({ serialNumber, make, model, status, employeeId, categoryId });
    res.redirect('/assets');
  } catch (error) {
    console.error('Error adding asset:', error);
    res.status(500).json({ error: 'Failed to add asset' });
  }
});

// Edit asset
router.post('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { serialNumber, make, model, status, employeeId, categoryId } = req.body;
    if (!serialNumber || !make || !model || !status || !employeeId || !categoryId) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const updated = await db.Asset.update(
      { serialNumber, make, model, status, employeeId, categoryId },
      { where: { id } }
    );
    if (updated[0] === 0) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    res.redirect('/assets');
  } catch (error) {
    console.error('Error editing asset:', error);
    res.status(500).json({ error: 'Failed to edit asset' });
  }
});

// Delete asset
router.post('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.Asset.destroy({ where: { id } });
    if (deleted === 0) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    res.redirect('/assets');
  } catch (error) {
    console.error('Error deleting asset:', error);
    res.status(500).json({ error: 'Failed to delete asset' });
  }
});

module.exports = router;
