import bcrypt from "bcryptjs";
import pool from "../config/db.js";

export const seedUsers = async () => {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM users");

    const count = Number(result.rows[0].count);

    if (count > 0) {
      console.log("Users already seeded");
      return;
    }

    const password = await bcrypt.hash("password123", 10);

    await pool.query(
      `
      INSERT INTO users
      (name, email, password, role)

      VALUES

      ('John Doe', 'john.admin@test.com', $1, 'admin'),
      ('Jane Smith', 'jane@test.com', $1, 'user'),
      ('Michael Brown', 'michael@test.com', $1, 'user'),
      ('Sarah Wilson', 'sarah@test.com', $1, 'user'),
      ('David Lee', 'david@test.com', $1, 'user'),
      ('Emma Taylor', 'emma@test.com', $1, 'user'),
      ('Chris Martin', 'chris@test.com', $1, 'user'),
      ('Sophia Davis', 'sophia@test.com', $1, 'user'),
      ('Daniel White', 'daniel@test.com', $1, 'user'),
      ('Olivia Green', 'olivia@test.com', $1, 'user')
      `,
      [password],
    );

    console.log("Users seeded successfully");
  } catch (error) {
    console.error("User seed failed:", error);
  }
};
