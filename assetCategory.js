const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', async (req, res) => {
  try {
    const categories = await db.AssetCategory.findAll();
    res.render('assetCategory', { title: 'Asset Categories', categories });
  } catch (error) {
    console.error('Error fetching asset categories:', error);
    res.status(500).json({ error: 'Failed to fetch asset categories' });
  }
});

router.post('/add', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    await db.AssetCategory.create({ name });
    res.redirect('/asset-categories');
  } catch (error) {
    console.error('Error adding asset category:', error);
    res.status(500).json({ error: 'Failed to add asset category' });
  }
});

router.post('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    const updated = await db.AssetCategory.update({ name }, { where: { id } });
    if (updated[0] === 0) {
      return res.status(404).json({ error: 'Asset category not found' });
    }
    res.redirect('/asset-categories');
  } catch (error) {
    console.error('Error editing asset category:', error);
    res.status(500).json({ error: 'Failed to edit asset category' });
  }
});

// Delete asset category
router.post('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.AssetCategory.destroy({ where: { id } });
    if (deleted === 0) {
      return res.status(404).json({ error: 'Asset category not found' });
    }
    res.redirect('/asset-categories');
  } catch (error) {
    console.error('Error deleting asset category:', error);
    res.status(500).json({ error: 'Failed to delete asset category' });
  }
});

module.exports = router;
