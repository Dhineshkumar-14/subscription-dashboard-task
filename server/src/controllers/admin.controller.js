import pool from "../config/db.js";

export const getAllSubscriptions = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", plan = "" } = req.query;

    const offset = (page - 1) * limit;

    const values = [];
    let whereClause = "";

    if (search) {
      values.push(`%${search}%`);

      whereClause += `
        AND (
          LOWER(u.name) LIKE LOWER($${values.length})
          OR LOWER(u.email) LIKE LOWER($${values.length})
        )
      `;
    }

    if (plan) {
      values.push(plan);

      whereClause += `
        AND p.name = $${values.length}
      `;
    }


    const countQuery = `
      SELECT COUNT(*) AS total
      FROM subscriptions s
      JOIN users u ON s.user_id = u.id
      JOIN plans p ON s.plan_id = p.id
      WHERE 1=1
      ${whereClause}
    `;

    const countResult = await pool.query(countQuery, values);

    const total = Number(countResult.rows[0].total);


    const statsQuery = `
      SELECT
        COUNT(*) AS total,

        COUNT(*) FILTER (
          WHERE LOWER(s.status) = 'active'
        ) AS active,

        COUNT(*) FILTER (
          WHERE LOWER(s.status) = 'expired'
        ) AS expired,

        COUNT(*) FILTER (
          WHERE LOWER(s.status) = 'cancelled'
        ) AS cancelled

      FROM subscriptions s
      JOIN users u ON s.user_id = u.id
      JOIN plans p ON s.plan_id = p.id

      WHERE 1=1
      ${whereClause}
    `;

    const statsResult = await pool.query(statsQuery, values);

    const stats = {
      total: Number(statsResult.rows[0].total),
      active: Number(statsResult.rows[0].active),
      expired: Number(statsResult.rows[0].expired),
      cancelled: Number(statsResult.rows[0].cancelled),
    };


    const queryValues = [...values];

    queryValues.push(limit);
    queryValues.push(offset);

    const query = `
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

      WHERE 1=1
      ${whereClause}

      ORDER BY s.id DESC

      LIMIT $${queryValues.length - 1}
      OFFSET $${queryValues.length}
    `;

    const result = await pool.query(query, queryValues);

    return res.status(200).json({
      success: true,

      subscriptions: result.rows,

      stats,

      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get subscriptions error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
