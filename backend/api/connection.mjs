import cors from 'cors';
import express from 'express';

import { postUser } from './db.mjs';
import { getUserByEmail } from './db.mjs';
import { getAllJobListings }from './db.mjs';
import { getAllCVsWithSkills } from './db.mjs';
import { postCV } from './db.mjs';
import { updateCV } from './db.mjs';
import { getCVsByUserId } from './db.mjs';
// Allow requests from the Expo tunnel URL


const app = express();
app.use(cors());
app.use(express.json());

app.post('/users', async (req, res) => {
  const {fname,lname, email, phone, password} = req.body;
  try {
    // Call the postProvider function to add a new provider
    await postUser(fname,lname, email, phone, password);
    res.status(201).json({ message: 'user added successfully' });
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

app.get('/joblistings', async (req, res) => {
  try {
      const jobListings = await getAllJobListings();
      res.status(200).json(jobListings);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

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
  const { cvID, userid, education, experience, skills } = req.body;
  try {
      // Call the postCV function to add a new CV
      await postCV(cvID, userid, education, experience, skills);
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
// Start the server
app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});