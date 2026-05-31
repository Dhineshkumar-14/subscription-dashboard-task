import bcryptjs from "bcryptjs";
import pool from "../config/db.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email],
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const result = await pool.query(
      `
      INSERT INTO users
      (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, role, created_at
      `,
      [name, email, hashedPassword],
    );

    const user = result.rows[0];

    const token = generateToken(user);

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user,
    });
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `
      SELECT
        u.id,
        u.name,
        u.email,
        u.role,

        s.id AS subscription_id,
        s.status,
        s.start_date,
        s.end_date,

        p.id AS plan_id,
        p.name AS plan_name,
        p.price,
        p.duration,
        p.features

      FROM users u

      LEFT JOIN subscriptions s
        ON u.id = s.user_id

      LEFT JOIN plans p
        ON s.plan_id = p.id

      WHERE u.id = $1

      ORDER BY s.id DESC
      LIMIT 1
      `,
      [userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const data = result.rows[0];

    res.status(200).json({
      success: true,

      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
      },

      subscription: data.subscription_id
        ? {
            id: data.subscription_id,
            status: data.status,
            startDate: data.start_date,
            endDate: data.end_date,
          }
        : null,

      plan: data.plan_id
        ? {
            id: data.plan_id,
            name: data.plan_name,
            price: data.price,
            duration: data.duration,
            features: data.features,
          }
        : null,
    });
  } catch (error) {
    console.error("Check Auth Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
