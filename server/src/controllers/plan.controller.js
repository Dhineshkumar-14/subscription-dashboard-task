import pool from "../config/db.js";

export const getPlans = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        name,
        price,
        duration,
        features
      FROM plans
      ORDER BY price ASC
    `);

    return res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Get Plans Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch plans",
    });
  }
};
