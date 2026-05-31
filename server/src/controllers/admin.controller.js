import pool from "../config/db.js";

export const getAllSubscriptions = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        s.id,
        s.start_date,
        s.end_date,
        s.status,

        u.id AS user_id,
        u.name AS user_name,
        u.email,

        p.id AS plan_id,
        p.name AS plan_name,
        p.price,
        p.duration,
        p.features

      FROM subscriptions s
      JOIN users u
        ON s.user_id = u.id
      JOIN plans p
        ON s.plan_id = p.id

      ORDER BY s.id DESC
    `);

    res.status(200).json({
      success: true,
      count: result.rows.length,
      subscriptions: result.rows,
    });
  } catch (error) {
    console.error("Get subscriptions error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
