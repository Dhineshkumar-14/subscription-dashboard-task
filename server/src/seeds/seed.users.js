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

    const values = [];

    values.push(`('Admin', 'admin@test.com', $1, 'admin')`);

    for (let i = 1; i <= 29; i++) {
      values.push(
        `(
          'User ${i}',
          'user${i}@test.com',
          $1,
          'user'
        )`,
      );
    }

    await pool.query(
      `
      INSERT INTO users
      (name, email, password, role)

      VALUES
      ${values.join(",")}
      `,
      [password],
    );

    console.log("30 users seeded successfully");
  } catch (error) {
    console.error("User seed failed:", error);
  }
};
