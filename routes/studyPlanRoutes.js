const express = require('express');
const router = express.Router();
const StudyPlan = require('../models/StudyPlan');

// Create study plan
router.post('/', async (req, res) => {
  try {
    // Set expiration date based on plan type
    const planData = req.body;
    if (planData.planType === 'Daily') {
      planData.expiresAt = new Date(planData.endingDate);
    } else if (planData.planType === 'Weekly') {
      planData.expiresAt = new Date(planData.endingDate);
    } else { // Monthly
      planData.expiresAt = new Date(planData.endingDate);
    }

    const plan = new StudyPlan(planData);
    console.log("saving.....");
    await plan.save();
    res.status(201).send(plan);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get user's active plans
router.get('/user/:userId', async (req, res) => {
  try {
    const plans = await StudyPlan.find({
      userId: req.params.userId,
      endingDate: { $gte: new Date() } // Only future plans
    });
    res.send(plans);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;