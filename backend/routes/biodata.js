const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Biodata = require('../models/Biodata');

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// POST - Save new biodata
router.post(
  '/',
  upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'horoscopeImage', maxCount: 1 }]),
  async (req, res) => {
    try {
      const data = { ...req.body };
      if (req.files?.profileImage) data.profileImage = req.files.profileImage[0].filename;
      if (req.files?.horoscopeImage) data.horoscopeImage = req.files.horoscopeImage[0].filename;

      const biodata = new Biodata(data);
      await biodata.save();
      res.status(201).json({ success: true, data: biodata });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
);

// GET all biodatas
router.get('/', async (req, res) => {
  try {
    const all = await Biodata.find().sort({ createdAt: -1 });
    res.json({ success: true, data: all });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET single biodata
router.get('/:id', async (req, res) => {
  try {
    const item = await Biodata.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
