import pool from "../config/db.js";

export const seedPlans = async () => {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM plans");

    const count = Number(result.rows[0].count);

    if (count > 0) {
      console.log("Plans already seeded");
      return;
    }

    await pool.query(
      `
      INSERT INTO plans
      (name, price, duration, features)

      VALUES

      (
        'Starter',
        299,
        30,
        '["5 Users","Email Support"]'
      ),

      (
        'Pro',
        999,
        30,
        '["25 Users","Priority Support","Analytics Dashboard"]'
      ),

      (
        'Enterprise',
        2999,
        30,
        '["Unlimited Users","Dedicated Manager","24/7 Support","Advanced Analytics"]'
      )
      `,
    );

    console.log("Plans seeded successfully");
  } catch (error) {
    console.error("Plan seeding failed:", error);
  }
};
