import pool from "../config/db.js";

export const seedSubscriptions = async () => {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM subscriptions");

    const count = Number(result.rows[0].count);

    if (count > 0) {
      console.log("Subscriptions already seeded");
      return;
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

      (
        1,
        1,
        NOW() - INTERVAL '10 days',
        NOW() + INTERVAL '20 days',
        'active'
      ),

      (
        2,
        2,
        NOW() - INTERVAL '15 days',
        NOW() + INTERVAL '15 days',
        'active'
      ),

      (
        3,
        3,
        NOW() - INTERVAL '5 days',
        NOW() + INTERVAL '25 days',
        'active'
      ),

      (
        4,
        1,
        NOW() - INTERVAL '40 days',
        NOW() - INTERVAL '10 days',
        'expired'
      ),

      (
        5,
        2,
        NOW() - INTERVAL '60 days',
        NOW() - INTERVAL '30 days',
        'expired'
      ),

      (
        6,
        3,
        NOW() - INTERVAL '20 days',
        NOW() + INTERVAL '10 days',
        'active'
      ),

      (
        7,
        1,
        NOW() - INTERVAL '8 days',
        NOW() + INTERVAL '22 days',
        'active'
      ),

      (
        8,
        2,
        NOW() - INTERVAL '30 days',
        NOW(),
        'expired'
      ),

      (
        9,
        3,
        NOW() - INTERVAL '2 days',
        NOW() + INTERVAL '28 days',
        'active'
      ),

      (
        10,
        1,
        NOW() - INTERVAL '5 days',
        NOW() + INTERVAL '25 days',
        'cancelled'
      )
      `);

    console.log("Subscriptions seeded successfully");
  } catch (error) {
    console.error("Subscription seed failed:", error);
  }
};
