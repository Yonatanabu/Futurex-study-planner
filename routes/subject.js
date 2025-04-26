const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');

// Get subjects by grade
router.get('/grade/:grade', async (req, res) => {
  try {
    const subjects = await Subject.find({ grade: req.params.grade });
    res.send(subjects);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Add new subject (admin only)
router.post('/', async (req, res) => {
  try {
    const subject = new Subject(req.body);
    await subject.save();
    res.status(201).send(subject);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;