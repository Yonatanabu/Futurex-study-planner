// server.js
const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db'); // Import MongoDB connection setup
const userRoutes = require('./routes/userRoutes');
const studyPlanRoutes = require('./routes/studyPlanRoutes');
const quizRoutes=require('./routes/quizRoutes');
const aiAssist=require('./routes/aiRoute');

const app = express();
app.use(express.json());
connectDB();  // Ensure DB is connected

app.use('/api/userProfile', userRoutes);
app.use('/api/planner', studyPlanRoutes);
app.use('/api/subjects', require('./routes/subject'));
app.use('/api/quizzes', require('./routes/quizRoutes'));
app.use('/api/questions', require('./routes/question'));
app.use('/api/assist', aiAssist);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
