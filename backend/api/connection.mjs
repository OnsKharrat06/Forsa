import cors from 'cors';
import express from 'express';

import { postUser } from './db.mjs';
import { getUserByEmail, getUserByID, updateUser, getMatchingPerUserID, getFavoritesPerUserID } from './db.mjs';


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

//login
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

// Start the server
app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});