import cors from 'cors';
import express from 'express';

import { postUser } from './db.mjs';
import { getUserByEmail } from './db.mjs';
// Allow requests from the Expo tunnel URL


const app = express();
app.use(cors());
app.use(express.json());

app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Call the postProvider function to add a new provider
    await postUser(name, email, password);
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
// Start the server
app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});