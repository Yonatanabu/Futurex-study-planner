
////////project description////////

 => there is a subject collection so that it contain every grade subject with their chapters.
  so every time we post a quizz we just take the subject id and chapter name for specific grades.

 => so there is a quizze,subject,question,userPofile,studyplan collection
    ->quiz related to subject by taking subject id and chapter name
    ->questions related to quiz by taking quiz id
 => for study plan we have daily plan,weekly plan,monthly plan.in each it will be store a list contains
      - isPlanned for telling if user have a plan or not like a bool type for helping me to send notification for user to plan
      - grade
      - subject name
      - chapters
         - have isFinishedReading type bool b/c to mark as done
      - startingDate for helping us to calculate the date like it's daily,weekly,monthly etc.
      - endingDate
    - to clarify something after the due date the plan will remove automatically or deleted. e.x. if user have a plan for daily plan.
        it will remove or delete automaticaly after that day and send notification to plan for today.



/////////////////backend route///////////////////

//register user info
General url
       /api/userProfile

 POST /onboard/ 
      => to register user with the onboard questions
 PUT /:userId
      => update user info based on user id

 //study planner
General url
       /api/planner
 POST /study-plan/
    => to post study plan for given user
 Get /study-plan/
    => 
 PUT /study-plan/:date

 //add quizes
General url
       /api/quizzes

 POST /
 Get /



