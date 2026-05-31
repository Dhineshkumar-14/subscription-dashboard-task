import pool from "../config/db.js";

export const subscribeToPlan = async (req, res) => {
  try {
    const { planId } = req.params;
    const userId = req.user.id;

    const planResult = await pool.query("SELECT * FROM plans WHERE id = $1", [
      planId,
    ]);

    if (planResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    const plan = planResult.rows[0];

    const existingSubscription = await pool.query(
      `SELECT * FROM subscriptions
       WHERE user_id = $1
       AND status = 'active'
       AND end_date > NOW()`,
      [userId],
    );

    if (existingSubscription.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "You already have an active subscription",
      });
    }

    const startDate = new Date();

    const endDate = new Date();

    endDate.setDate(endDate.getDate() + plan.duration);

    const result = await pool.query(
      `INSERT INTO subscriptions
       (user_id, plan_id, start_date, end_date, status)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [userId, planId, startDate, endDate, "active"],
    );

    res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      subscription: result.rows[0],
    });
  } catch (error) {
    console.error("Subscribe Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getMySubscription = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT
        s.id,
        s.start_date,
        s.end_date,
        s.status,
        p.name,
        p.price,
        p.duration,
        p.features
      FROM subscriptions s
      JOIN plans p ON p.id = s.plan_id
      WHERE s.user_id = $1
      ORDER BY s.created_at DESC
      `,
      [userId],
    );

    res.json({
      success: true,
      subscriptions: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
