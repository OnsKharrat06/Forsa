import dotenv from "dotenv";
dotenv.config();
import mysql from 'mysql2';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);


// Database connection configuration
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'adminadmin',
    database: 'fursadashs1',
}).promise()

// Function to load job listings from the database
async function loadJobListingsFromDatabase() {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM joblisting');
      return rows;
    } finally {
      connection.release();
    }
  }
// Function to format job listings for chat history
function formatJobListing(job) {
  return `**Job Title:** ${job.title}
**Company:** ${job.companyid}
**Location:** ${job.city}, ${job.country}
**Type:** ${job.type}
**Experience Level:** ${job.experience_level}
**Description:** ${job.description}`;
}

async function matchJobs(seekerInfo) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  // Load job listings from your database
  const jobListings = await loadJobListingsFromDatabase(); // Replace with your database logic

  // Format job listings for chat history
  const formattedJobListings = jobListings.map(formatJobListing);

  // Create chat history with job listings and seeker information
  const history = [
    ...formattedJobListings,
    `**Job Seeker Information:** ${seekerInfo}`,
  ];

  const chat = model.startChat({
    history,
    generationConfig: {
      maxOutputTokens: 500,
    },
  });

  // Prompt the model to find best match jobs
  const result = await chat.sendMessage("Based on the job seeker information and available job listings, please provide the best matching job offers in JSON format.");
  const response = await result.response;
  const text = await response.text();

  // Parse JSON response 
  try {
    const jobMatches = JSON.parse(text);
    return jobMatches;
  } catch (error) {
    console.error("Error parsing JSON response:", error);
    return []; // Return an empty array on error
  }
}

// Example usage
const seekerInfo = "Experienced software developer with 5+ years of experience in Java and Python. Looking for a full-time remote position.";
matchJobs(seekerInfo).then((matches) => {
  console.log("Matching Jobs:", matches);
});
