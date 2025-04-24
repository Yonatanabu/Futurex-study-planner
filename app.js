// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import MongoDB connection setup
const userRoutes = require('./routes/userRoutes');
const studyPlanRoutes = require('./routes/studyPlanRoutes');
const quizRoutes=require('./routes/quizRoutes');
dotenv.config();
const app = express();

app.use(express.json());
connectDB();  // Ensure DB is connected

app.use('/api/userProfile', userRoutes);
app.use('/api', studyPlanRoutes);
app.use('/api/quizzes', quizRoutes);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
