const UserProfile = require('../models/UserProfile');

// Create a new user profile during onboarding
exports.onboardUser = async (req, res) => {
  try {
    console.log('Received data for onboarding:', req.body);
    const {
      name,
      grade,
      school,
      curriculumType,
      avgGrade,
      rank,
      studyDuration,        // Changed from studyDurationMin/Max
      weekendStudyHours,    // New field
      preferredTimes,
      restDay,              // Changed from restDaysPerWeek
      wakeUpTime,
      learningStyle,
      favoriteSubjects,
      improveSubjects,
      reasonForLoveOfSubject, // New field
      finalExamDate,
      dreamCareer,
      motivations,
      competeWithFriends,
      friendInFuturex,      // New field
      friendName,          // New field
      admiredFigure,
      admiredReason,
      hobbies             
    } = req.body;
    
    // Create a new user profile with schema-compatible fields
    const userProfile = new UserProfile({
      name,
      grade,
      school,
      curriculumType,
      avgGrade,
      rank,
      studyDuration,        // Single duration instead of min/max
      weekendStudyHours,    // Required by schema
      preferredTimes,
      restDay,              // Single day instead of days count
      wakeUpTime,
      learningStyle,
      favoriteSubjects,
      improveSubjects,
      reasonForLoveOfSubject,
      finalExamDate,
      dreamCareer,
      motivations,
      competeWithFriends,
      friendInFuturex,      
      friendName,
      admiredFigure,
      admiredReason,
      hobbies              
    });

    // Save the user profile to the database
    await userProfile.save();
    console.log("Profile saved:", userProfile);
    res.status(201).json({ message: 'User onboarded successfully', userProfile });
    
  } catch (error) {
    console.error('Error in onboardUser:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.updateUserProfile = async (req, res) => {
  const { userId } = req.params; // Extract userId from the URL parameter
  const updateData = req.body;  // Get the data from the request body

  try {
    // Find the user profile by ID and update it
    const updatedProfile = await UserProfile.findByIdAndUpdate(
      userId,        // User's profile ID to find the document
      updateData,    // Data to update in the profile
      { new: true }   // Return the updated document, not the original
    );

    // Check if the profile exists
    if (!updatedProfile) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    // Respond with the updated profile
    res.status(200).json({ message: 'User profile updated successfully', updatedProfile });
  } catch (err) {
    // Handle any errors, such as validation errors or other issues
    res.status(500).json({ error: err.message });
  }
};