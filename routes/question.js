const express = require('express');
const router = express.Router();
const Question = require('../models/questions');

// Add questions to quiz
router.post('/', async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).send(question);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get questions by quiz
router.get('/quiz/:quizId', async (req, res) => {
  try {
    const questions = await Question.find({ quizId: req.params.quizId });
    res.send(questions);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;