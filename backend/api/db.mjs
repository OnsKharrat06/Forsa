
import mysql from 'mysql2';
//test
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fursadashs1',
}).promise()


export async function postUser(fname, lname, age, phone, email, password, city, industries) {
  try {
    const [result] = await pool.query("INSERT INTO users (fname, lname, age, phone, email, password, city) VALUES (?, ?, ?, ?, ?, ?, ?)", [fname, lname, age, phone, email, password, city]);
    console.log("User added successfully:", result);

    // Add industries for the user
    if (industries && industries.length > 0) {
      for (const industry of industries) {
        await postIndustryToUser(result.insertId, industry);
      }
    }

    return result;
  } catch (error) {
    console.error("Error adding user to the database:", error);
    throw error;
  }
}

export async function getUserByEmail(email) {
  const [result] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return result[0]; // Assuming there's only one user with a given email
}

// export async function getAllJobListings() {
//   try {
//       const [rows] = await pool.query('SELECT * FROM joblisting');
//       return rows;
//   } catch (error) {
//       console.error("Error fetching job listings:", error);
//       throw error;
//   }
// }
export async function getAllCVsWithSkills() {
  try {
      const [rows] = await pool.query('SELECT CV.*, GROUP_CONCAT(CV_Skills.skill) AS skills FROM CV LEFT JOIN CV_Skills ON CV.cvID = CV_Skills.cvID GROUP BY CV.cvID');
      return rows;
  } catch (error) {
      console.error("Error fetching CVs with skills:", error);
      throw error;
  }
}

export async function postCV(userid, education, experience, skills) {
  try {
      // Insert data into the CV table
      const [result] = await pool.query("INSERT INTO CV (userid, education, experience) VALUES (?, ?, ?)", [userid, education, experience]);
      console.log("CV added successfully:", result);
      const cvID = result.insertId;
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
    const updateParams = [];
    let updateQuery = "UPDATE CV SET";

    if (education !== undefined) {
      updateQuery += " education = ?,";
      updateParams.push(education);
    }

    if (experience !== undefined) {
      updateQuery += " experience = ?,";
      updateParams.push(experience);
    }

    // Remove the trailing comma from the query if any fields are updated
    if (updateParams.length > 0) {
      updateQuery = updateQuery.slice(0, -1);
    } else {
      // If no education or experience fields are provided for update, we proceed to check skills
      if (skills !== undefined) {
        await pool.query("DELETE FROM CV_Skills WHERE cvID = ?", [cvID]);

        // Insert updated skills into the CV_Skills table
        const skillArray = skills.split(',').map(skill => skill.trim());
        for (const skill of skillArray) {
          await pool.query("INSERT INTO CV_Skills (cvID, skill) VALUES (?, ?)", [cvID, skill]);
        }

        console.log("Skills updated successfully");
        return; // Exit the function after updating skills
      } else {
        // If no fields are provided for update, we won't perform the update
        console.log("No fields to update.");
        return;
      }
    }

    updateQuery += " WHERE cvID = ?";
    updateParams.push(cvID);

    // Update data in the CV table
    await pool.query(updateQuery, updateParams);

    // If skills are provided along with education and experience, update them too
    if (skills !== undefined) {
      await pool.query("DELETE FROM CV_Skills WHERE cvID = ?", [cvID]);

      // Insert updated skills into the CV_Skills table
      const skillArray = skills.split(',').map(skill => skill.trim());
      for (const skill of skillArray) {
        await pool.query("INSERT INTO CV_Skills (cvID, skill) VALUES (?, ?)", [cvID, skill]);
      }

      console.log("Skills updated successfully");
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




// New Version :

//User industries

//get user_industries
export async function getAllIndustries(userid) {
  try {
      const [rows] = await pool.query('select * from user_industries where userid = ?', [userid]);
      return rows;
  } catch (error) {
      console.error("Error getting user industries", error);
      throw error;
  }
}

//post user_industries

export async function postIndustryToUser(userid, industry_name) {
  try {
    const result = await pool.query('INSERT INTO user_industries (userid, industry_name) VALUES (?, ?)', [userid, industry_name]);
    return result;
  } catch (error) {
    console.error("Error adding industry to user", error);
    throw error;
  }
}


//update user_industries

export async function updateIndustry(user_industryid, new_industry_name) {
  try {
    const result = await pool.query('UPDATE user_industries SET industry_name = ? WHERE user_industry_id = ?', [new_industry_name, user_industryid]);
    return result;
  } catch (error) {
    console.error("Error updating industry name", error);
    throw error;
  }
}

export async function deleteUserIndustry(user_industryid) {
  try {
    const result = await pool.query('DELETE FROM user_industries WHERE user_industry_id = ?', [user_industryid]);
    return result;
  } catch (error) {
    console.error("Error deleting user industry", error);
    throw error;
  }
}

//get work_experience
export async function getAllWorkExperience(userid) {
  try {
    const [rows] = await pool.query('SELECT * FROM work_experience WHERE userid = ?', [userid]);
    return rows;
  } catch (error) {
    console.error("Error getting user's work experience", error);
    throw error;
  }
}
//post work_experience
export async function postWorkExperience(userid, job_title, companyname, currently_working, location, start_date, end_date, short_description) {
  try {
    const result = await pool.query('INSERT INTO work_experience (userid, job_title, companyname, currently_working, location, start_date, end_date, short_description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [userid, job_title, companyname, currently_working, location, start_date, end_date, short_description]);
    return result;
  } catch (error) {
    console.error("Error adding work experience to user", error);
    throw error;
  }
}
//update work_experience
export async function updateWorkExperience(experience_id, job_title, companyname, currently_working, location, start_date, end_date, short_description) {
  try {
    const result = await pool.query('UPDATE work_experience SET job_title = ?, companyname = ?, currently_working = ?, location = ?, start_date = ?, end_date = ?, short_description = ? WHERE experience_id = ?', [job_title, companyname, currently_working, location, start_date, end_date, short_description, experience_id]);
    return result;
  } catch (error) {
    console.error("Error updating work experience", error);
    throw error;
  }
}
//delete work_experience
export async function deleteWorkExperience(experience_id) {
  try {
    const result = await pool.query('DELETE FROM work_experience WHERE experience_id = ?', [experience_id]);
    return result;
  } catch (error) {
    console.error("Error deleting work experience", error);
    throw error;
  }
}

//get user language

export async function getAllUserLanguages(userid) {
  try {
    const [rows] = await pool.query('SELECT * FROM user_languages WHERE userid = ?', [userid]);
    return rows;
  } catch (error) {
    console.error("Error retrieving user languages", error);
    throw error;
  }
}

//post language
export async function postUserLanguage(userid, language, proficiency) {
  try {
    const result = await pool.query('INSERT INTO user_languages (userid, language, proficiency) VALUES (?, ?, ?)', [userid, language, proficiency]);
    return result;
  } catch (error) {
    console.error("Error adding user language", error);
    throw error;
  }
}

//put language
export async function updateUserLanguage(user_language_id, language, proficiency) {
  try {
    const result = await pool.query('UPDATE user_languages SET language = ?, proficiency = ? WHERE user_language_id = ?', [language, proficiency, user_language_id]);
    return result;
  } catch (error) {
    console.error("Error updating user language", error);
    throw error;
  }
}
// delete language
export async function deleteUserLanguage(user_language_id) {
  try {
    const result = await pool.query('DELETE FROM user_languages WHERE user_language_id = ?', [user_language_id]);
    return result;
  } catch (error) {
    console.error("Error deleting user language", error);
    throw error;
  }
}

// get all joblistings
export async function getAllJobListings() {
  try {
    const [rows] = await pool.query('SELECT * FROM joblisting');
    return rows;
  } catch (error) {
    console.error("Error fetching job listings:", error);
    throw error;
  }
}


//get joblistings by jobid
export async function getJobListingById(jobid) {
  try {
    const [rows] = await pool.query('SELECT * FROM joblisting WHERE jobid = ?', [jobid]);
    return rows;
  } catch (error) {
    console.error("Error fetching job listing by jobid:", error);
    throw error;
  }
}

//get jobskills of a specefic job
export async function getJobSkillsByJobId(jobId) {
  try {
    const [rows] = await pool.query(
      `SELECT js.skill, js.skill_type 
       FROM job_skills js 
       JOIN joblisting jl ON js.jobid = jl.jobid 
       WHERE jl.jobid = ?`,
      [jobId]
    );
    return rows;
  } catch (error) {
    console.error("Error fetching job skills by job ID:", error);
    throw error;
  }
}



//user_skills:


//get user_skills
export async function getAllSkills(userid) {
  try {
      const [rows] = await pool.query('select * from user_skills where userid = ?', [userid]);
      return rows;
  } catch (error) {
      console.error("Error getting user skills", error);
      throw error;
  }
}

//post user_skills

export async function postSkillToUser(userid, skill, skill_type) {
  try {
    const result = await pool.query('INSERT INTO user_skills (userid, skill, skill_type) VALUES (?, ?, ?)', [userid, skill, skill_type]);
    return result;
  } catch (error) {
    console.error("Error adding skill to user", error);
    throw error;
  }
}

//update user_skills

// Function to update user skills
export async function updateSkill(user_skill_id, fieldsToUpdate) {
  const setClause = [];
  const values = [];

  for (const [key, value] of Object.entries(fieldsToUpdate)) {
    setClause.push(`${key} = ?`);
    values.push(value);
  }

  if (!setClause.length) {
    throw new Error("No fields provided for update");
  }

  values.push(user_skill_id); 

  const query = `UPDATE user_skills SET ${setClause.join(', ')} WHERE user_skill_id = ?`;

  try {
    const [result] = await pool.query(query, values);
    console.log("Skill updated successfully:", result);
    return result;
  } catch (error) {
    console.error("Error updating skill in the database:", error);
    throw error;
  }
}


export async function deleteUserSkill(user_skill_id) {
  try {
    const result = await pool.query('DELETE FROM user_skills WHERE user_skill_id = ?', [user_skill_id]);
    return result;
  } catch (error) {
    console.error("Error deleting user skill", error);
    throw error;
  }
}

//education

//get education
export async function getEducation(userid) {
  try {
      const [rows] = await pool.query('select * from education where userid = ?', [userid]);
      return rows;
  } catch (error) {
      console.error("Error getting user education", error);
      throw error;
  }
}


//post education

export async function postEducation(userid, fields) {
  try {
    const setClause = [];
    const values = [];
  
    for (const [key, value] of Object.entries(fields)) {
      setClause.push(`${key}`);
      values.push(value);
    }
  
    if (!setClause.length) {
      throw new Error("No fields provided for update");
    }
    setClause.push("userid");
    values.push(userid); 


    const result = await pool.query(`INSERT INTO education (${setClause.join(', ')}) VALUES(${setClause.map(e => "?").join(', ')})`, values);
    return result;
  } catch (error) {
    console.error("Error adding skill to user", error);
    throw error;
  }
}

export async function deleteEducation(education_id) {
  try {
    const result = await pool.query('DELETE FROM education WHERE education_id = ?', [education_id]);
    return result;
  } catch (error) {
    console.error("Error deleting education", error);
    throw error;
  }
}