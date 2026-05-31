import pool from "../config/db.js";

export const seedSubscriptions = async () => {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM subscriptions");

    const count = Number(result.rows[0].count);

    if (count > 0) {
      console.log("Subscriptions already seeded");
      return;
    }

    const values = [];

    for (let i = 1; i <= 30; i++) {
      const userId = i;
      const planId = ((i - 1) % 3) + 1;

      let status = "active";

      if (i % 5 === 0) {
        status = "expired";
      }

      if (i % 9 === 0) {
        status = "cancelled";
      }

      values.push(`
        (
          ${userId},
          ${planId},
          NOW() - INTERVAL '${i} days',
          NOW() + INTERVAL '${30 - i} days',
          '${status}'
        )
      `);
    }

    await pool.query(`
      INSERT INTO subscriptions
      (
        user_id,
        plan_id,
        start_date,
        end_date,
        status
      )
      VALUES
      ${values.join(",")}
    `);

    console.log("30 subscriptions seeded successfully");
  } catch (error) {
    console.error("Subscription seed failed:", error);
  }
};
