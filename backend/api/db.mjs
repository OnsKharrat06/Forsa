
import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
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
