import cors from 'cors';
import express from 'express';

import { postUser } from './db.mjs';
import { getUserByEmail } from './db.mjs';
//import { getAllJobListings }from './db.mjs';
import { getAllCVsWithSkills } from './db.mjs';
import { postCV } from './db.mjs';
import { updateCV } from './db.mjs';
import { getCVsByUserId } from './db.mjs';
// Allow requests from the Expo tunnel URL
//test
import { getUserByID, updateUser, getMatchingPerUserID, getFavoritesPerUserID } from './db.mjs';
//New version :
import { getAllIndustries, postIndustryToUser, updateIndustry, deleteUserIndustry} from './db.mjs';
import {getAllWorkExperience, postWorkExperience, updateWorkExperience, deleteWorkExperience} from './db.mjs';
import {getAllUserLanguages, postUserLanguage, updateUserLanguage, deleteUserLanguage} from './db.mjs';
import { getAllJobListings, getJobListingById} from './db.mjs';
import {getJobSkillsByJobId} from './db.mjs';
import { getAllSkills, postSkillToUser, updateSkill, deleteUserSkill } from './db.mjs';
const app = express();
app.use(cors());
app.use(express.json());

app.post('/users', async (req, res) => {
  const { fname, lname, age, phone, email, password, city, industries } = req.body;
  try {
    // Call the postUser function to add a new user
    const result = await postUser(fname, lname, age, phone, email, password, city);
    const userid = result.insertId;
    
    // Insert industries into user_industries table
    if (industries && industries.length > 0) {
      console.log("industries:", industries)
      for (const industry_name of industries) {
        await postIndustryToUser(userid, industry_name);
      }
    }
    
    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/login',cors(), async (req, res) => {
  const {email,password} = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    if (password === user.password) {
      res.status(200).json({ message: 'Logged in successfully' });
    } else {
      res.status(401).json({ message: 'Invalid password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// app.get('/joblistings', async (req, res) => {
//   try {
//       const jobListings = await getAllJobListings();
//       res.status(200).json(jobListings);
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

app.get('/cvs', async (req, res) => {
  try {
      const cvs = await getAllCVsWithSkills();
      res.status(200).json(cvs);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/cvs', async (req, res) => {
  const { userid, education, experience, skills } = req.body;
  try {
      // Check if userid is provided
      if (!userid) {
          return res.status(400).json({ error: 'userid is required' });
      }

      // Call the postCV function to add a new CV
      await postCV(userid, education, experience, skills);
      res.status(201).json({ message: 'CV added successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/cvs/:cvID', async (req, res) => {
  const cvID = req.params.cvID;
  const { education, experience, skills } = req.body;
  try {
      await updateCV(cvID, education, experience, skills);
      res.status(200).json({ message: 'CV updated successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/cvs/user/:userid', async (req, res) => {
  const userid = req.params.userid;
  try {
      const cvs = await getCVsByUserId(userid);
      res.status(200).json(cvs);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

//get one user by ID
app.get('/users/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await getUserByID(id);
    res.status(200).json({
      message: 'User found',
      user: user
    });
  } catch (error) {
    console.error("Error on getting one user:", error);
    res.status(500).json({ error: 'Error on getting one user' });
  }
});

//Update user information  depending on the required data to be updated (not
// necessarely all of the information all at once)
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const fieldsToUpdate = req.body; 
  try {
    const result = await updateUser(id, fieldsToUpdate);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//matchings per user
app.get('/matching/:userid', async (req, res) => {
  const { userid } = req.params;
  try {
    const matchings = await getMatchingPerUserID(userid);
    if (matchings.length > 0) {
      res.status(200).json({
        message: 'Matchings found',
        matchings: matchings
      });
    } else {
      res.status(404).json({ message: 'No matchings found for the given user' });
    }
  } catch (error) {
    console.error("Error on getting matchings for the user:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//favorites per user
app.get('/favorites/:userid', async (req, res) => {
  const { userid } = req.params;
  try {
    const favorites = await getFavoritesPerUserID(userid);
    if (favorites.length > 0) {
      res.status(200).json({
        message: 'Favorites found',
        favorites: favorites
      });
    } else {
      res.status(404).json({ message: 'No favorites found for the given user' });
    }
  } catch (error) {
    console.error("Error on getting favorites for the user:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//New version

//user_industries

app.get('/user_industries/:userid',async (req, res) => {
  const { userid } = req.params;

  try {
    const industries = await getAllIndustries(userid);

      res.status(200).json({
        message: 'all indsutries retrieved',
        industries: industries
      });
  } catch (error) {
    console.error("Error on retrieving user industries", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

})

app.post('/user_industries/:userid', async (req, res) => {
  const { userid } = req.params;
  const { industry_name } = req.body;

  if (!industry_name) {
    return res.status(400).json({ error: 'Missing industry_name' });
  }

  try {
    await postIndustryToUser(userid, industry_name);

    res.status(201).json({
      message: 'Industry added successfully to user',
      userid: userid,
      industry_name: industry_name
    });
  } catch (error) {
    console.error("Error on adding industry to user", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/user_industries/:user_industryid', async (req, res) => {
  const { user_industryid } = req.params; 
  const { industry_name: new_industry_name } = req.body; 

  if (!new_industry_name) {
    return res.status(400).json({ error: 'Missing new industry name' });
  }

  try {
    await updateIndustry(user_industryid, new_industry_name);

    res.status(200).json({
      message: 'Industry name updated successfully',
      user_industryid,
      new_industry_name
    });
  } catch (error) {
    console.error("Error on updating industry name", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/user_industries/:user_industryid', async (req, res) => {
  const { user_industryid } = req.params; 

  try {
    await deleteUserIndustry(user_industryid);

    res.status(200).json({
      message: 'Industry removed successfully',
      user_industryid
    });
  } catch (error) {
    console.error("Error on deleting industry", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//work_experience
app.get('/user_work_experience/:userid', async (req, res) => {
  const { userid } = req.params;

  try {
    const workExperience = await getAllWorkExperience(userid);

    res.status(200).json({
      message: 'Work experience retrieved successfully',
      work_experience: workExperience
    });
  } catch (error) {
    console.error("Error retrieving user's work experience", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/user_work_experience/:userid', async (req, res) => {
  const { userid } = req.params;
  const {
    job_title,
    companyname,
    currently_working,
    location,
    start_date,
    end_date,
    short_description
  } = req.body;

  // Check if required fields are missing
  if (!job_title || !companyname || !location || !start_date || !short_description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await postWorkExperience(userid, job_title, companyname, currently_working, location, start_date, end_date, short_description);

    res.status(201).json({
      message: 'Work experience added successfully to user',
      userid: userid,
      job_title: job_title
    });
  } catch (error) {
    console.error("Error on adding work experience to user", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.put('/user_work_experience/:experience_id', async (req, res) => {
  const { experience_id } = req.params; 
  const { job_title, companyname, currently_working, location, start_date, end_date, short_description } = req.body; 

  // Check if new job title or company name is missing
  if (!job_title || !companyname) {
    return res.status(400).json({ error: 'Missing required fields (job_title or companyname)' });
  }

  try {
    await updateWorkExperience(experience_id, job_title, companyname, currently_working, location, start_date, end_date, short_description);

    res.status(200).json({
      message: 'Work experience updated successfully',
      experience_id,
      job_title,
      companyname
    });
  } catch (error) {
    console.error("Error updating work experience", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/user_work_experience/:experience_id', async (req, res) => {
  const { experience_id } = req.params;

  try {
    await deleteWorkExperience(experience_id);

    res.status(200).json({
      message: 'Work experience removed successfully',
      experience_id
    });
  } catch (error) {
    console.error("Error on deleting work experience", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//user_language

app.get('/user_languages/:userid', async (req, res) => {
  const { userid } = req.params;

  try {
    const userLanguages = await getAllUserLanguages(userid);

    res.status(200).json({
      message: 'User languages retrieved successfully',
      languages: userLanguages
    });
  } catch (error) {
    console.error("Error retrieving user languages", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/user_languages/:userid', async (req, res) => {
  const { userid } = req.params;
  const { language, proficiency } = req.body;

  // Check if required fields are missing
  if (!language || !proficiency) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await postUserLanguage(userid, language, proficiency);

    res.status(201).json({
      message: 'User language added successfully',
      userid: userid,
      language: language,
      proficiency: proficiency
    });
  } catch (error) {
    console.error("Error adding user language", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/user_languages/:user_language_id', async (req, res) => {
  const { user_language_id } = req.params;
  const { language, proficiency } = req.body;

  // Check if required fields are missing
  if (!language || !proficiency) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await updateUserLanguage(user_language_id, language, proficiency);

    res.status(200).json({
      message: 'User language updated successfully',
      user_language_id,
      language,
      proficiency
    });
  } catch (error) {
    console.error("Error updating user language", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/user_languages/:user_language_id', async (req, res) => {
  const { user_language_id } = req.params;

  try {
    await deleteUserLanguage(user_language_id);

    res.status(200).json({
      message: 'User language removed successfully',
      user_language_id
    });
  } catch (error) {
    console.error("Error deleting user language", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//joblistings
app.get('/joblistings', async (req, res) => {
  try {
    const jobListings = await getAllJobListings();
    res.status(200).json(jobListings);
  } catch (error) {
    console.error("Error fetching job listings:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/joblistings/:jobid', async (req, res) => {
  const { jobid } = req.params;
  try {
    const jobListing = await getJobListingById(jobid);
    if (jobListing.length === 0) {
      res.status(404).json({ message: 'Job listing not found' });
    } else {
      res.status(200).json(jobListing);
    }
  } catch (error) {
    console.error("Error fetching job listing by jobid:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//job skills
app.get('/job_skills/:jobId', async (req, res) => {
  const jobId = req.params.jobId;

  try {
    const jobSkills = await getJobSkillsByJobId(jobId);
    res.status(200).json({
      message: 'Job skills retrieved successfully',
      jobSkills: jobSkills
    });
  } catch (error) {
    console.error("Error on retrieving job skills:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



//user_skills

app.get('/user_skills/:userid',async (req, res) => {
  const { userid } = req.params;

  try {
    const skills = await getAllSkills(userid);

      res.status(200).json({
        message: 'all skills retrieved',
        skills: skills
      });
  } catch (error) {
    console.error("Error on retrieving user skills", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

})

app.post('/user_skills/:userid', async (req, res) => {
  const { userid } = req.params;
  const {skills} = req.body;

  if (!skills) {
    return res.status(400).json({ error: 'Missing skill' });
  }

  try {
    for (const {skill, skill_type} of skills) {
      await postSkillToUser(userid, skill, skill_type);
    }
    

    res.status(201).json({
      message: 'Skill added successfully to user',
      userid: userid,
      skills : skills

    });
  } catch (error) {
    console.error("Error on adding skill to user", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/user_skills/:user_skill_id', async (req, res) => {
  const { user_skill_id } = req.params; 
  const fieldsToUpdate = req.body; 

  try {
    await updateSkill(user_skill_id, fieldsToUpdate);

    res.status(200).json({
      message: 'User skill updated successfully',
      user_skill_id,
      fieldsToUpdate
    });
  } catch (error) {
    console.error("Error on updating user skill", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.delete('/user_skills/:user_skill_id', async (req, res) => {
  const { user_skill_id } = req.params; 

  try {
    await deleteUserSkill(user_skill_id);

    res.status(200).json({
      message: 'Skill removed successfully',
      user_skill_id
    });
  } catch (error) {
    console.error("Error on deleting skill", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
 //




// Start the server
app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});