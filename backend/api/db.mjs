
import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '98215062Mlina',
    database: 'fursadashs',
}).promise()


export async function postUser(fname,lname, email, phone, password) {
  try {
    const [result] = await pool.query("INSERT INTO users (fname,lname, email, phone, password) VALUES (?, ?, ?, ?,?)", [fname,lname, email, phone, password]);
    console.log("User added successfully:", result);
    return result;
  } catch (error) {
    console.error("Error adding user to the database:", error);
    throw error; // Rethrow the error to be caught in the calling function
  }
}
export async function getUserByEmail(email) {
  const [result] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return result[0]; // Assuming there's only one user with a given email
}


export async function getAllJobListings() {
  try {
      const [rows] = await pool.query('SELECT * FROM joblisting');
      return rows;
  } catch (error) {
      console.error("Error fetching job listings:", error);
      throw error;
  }
}
export async function getAllCVsWithSkills() {
  try {
      const [rows] = await pool.query('SELECT CV.*, GROUP_CONCAT(CV_Skills.skill) AS skills FROM CV LEFT JOIN CV_Skills ON CV.cvID = CV_Skills.cvID GROUP BY CV.cvID');
      return rows;
  } catch (error) {
      console.error("Error fetching CVs with skills:", error);
      throw error;
  }
}

export async function postCV(cvID, userid, education, experience, skills) {
  try {
      // Insert data into the CV table
      const [result] = await pool.query("INSERT INTO CV (cvID, userid, education, experience) VALUES (?, ?, ?, ?)", [cvID, userid, education, experience]);
      console.log("CV added successfully:", result);

      // Insert skills into the CV_Skills table
      if (skills) {
          const skillArray = skills.split(',').map(skill => skill.trim());
          for (const skill of skillArray) {
              await pool.query("INSERT INTO CV_Skills (cvID, skill) VALUES (?, ?)", [cvID, skill]);
          }
      }

      return result;
  } catch (error) {
      console.error("Error adding CV to the database:", error);
      throw error;
  }
}

export async function updateCV(cvID, education, experience, skills) {
  try {
      // Update data in the CV table
      await pool.query("UPDATE CV SET education = ?, experience = ? WHERE cvID = ?", [education, experience, cvID]);
      
      // Delete existing skills for the CV
      await pool.query("DELETE FROM CV_Skills WHERE cvID = ?", [cvID]);

      // Insert updated skills into the CV_Skills table
      if (skills) {
          const skillArray = skills.split(',').map(skill => skill.trim());
          for (const skill of skillArray) {
              await pool.query("INSERT INTO CV_Skills (cvID, skill) VALUES (?, ?)", [cvID, skill]);
          }
      }

      console.log("CV updated successfully");
  } catch (error) {
      console.error("Error updating CV in the database:", error);
      throw error;
  }
}
// Function to get CVs by userid
export async function getCVsByUserId(userid) {
  try {
      const [rows] = await pool.query('SELECT CV.*, GROUP_CONCAT(CV_Skills.skill) AS skills FROM CV LEFT JOIN CV_Skills ON CV.cvID = CV_Skills.cvID WHERE CV.userid = ? GROUP BY CV.cvID', [userid]);
      return rows;
  } catch (error) {
      console.error("Error fetching CVs by userid:", error);
      throw error;
  }
}

//get one user by its id
export async function getUserByID(id){
  const [row] = await pool.query('SELECT * FROM users WHERE userid = ?', [id]);
  return row[0];
}

//update user information
export async function updateUser(id, fields) {
  const setClause = [];
  const values = [];

  for (const [key, value] of Object.entries(fields)) {
    setClause.push(`${key} = ?`);
    values.push(value);
  }

  if (!setClause.length) {
    throw new Error("No fields provided for update");
  }

  const query = `UPDATE users SET ${setClause.join(', ')} WHERE userid = ?`;
  values.push(id); 

  try {
    const [result] = await pool.query(query, values);
    console.log("User updated successfully:", result);
    return result;
  } catch (error) {
    console.error("Error updating user in the database:", error);
    throw error;
  }
}

//get matchings per user
export async function getMatchingPerUserID(userid) {
  try {
    // Query to retrieve all matching entries for a given userid, including job details if needed
    const query = `
      SELECT 
        m.MatchID, m.userid, m.jobid, m.matchingScore, 
        j.position, j.company, j.location 
      FROM AIMatching m
      JOIN joblisting j ON m.jobid = j.jobid
      WHERE m.userid = ?`;

    const [results] = await pool.query(query, [userid]);

    console.log("Matchings retrieved successfully for userid:", userid, results);
    return results; // Returns an array of matching entries for the user
  } catch (error) {
    console.error("Error retrieving matchings from the database:", error);
    throw error; // Rethrow the error to be caught in the calling function
  }
}

//get favorites per user
export async function getFavoritesPerUserID(userid) {
  try {
    const query = `
      SELECT 
        f.favoriteID, f.userid, f.jobid, 
        j.position, j.company, j.location 
      FROM favorites f
      JOIN joblisting j ON f.jobid = j.jobid
      WHERE f.userid = ?`;

    const [results] = await pool.query(query, [userid]);
    console.log("Favorite jobs retrieved successfully for userid:", userid, results);
    return results;
  } catch (error) {
    console.error("Error jobs favorite entries from the database:", error);
    throw error;
  }
}



