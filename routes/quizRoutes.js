const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const Question = require('../models/questions');

// Create quiz
router.post('/', async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).send(quiz);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get quizzes by subject and chapter
router.get('/subject/:subjectId/chapter/:chapter', async (req, res) => {
  try {
    const quizzes = await Quiz.find({
      subjectId: req.params.subjectId,
      chapter: req.params.chapter
    });
    res.send(quizzes);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;