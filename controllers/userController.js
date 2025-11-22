import db from "../db.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
    try {
        const { full_name, email, password, phone, role } = req.body;

        // Required field validation
        if (!full_name?.trim() || !email?.trim() || !password) {
            return res.status(400).json({
                success: false,
                error: "Full name, email, and password are required"
            });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: "Invalid email format"
            });
        }

        // Password strength validation
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                error: "Password must be at least 6 characters long"
            });
        }

        // Role validation with default
        const validRoles = ["admin", "user"];
        const userRole = role && validRoles.includes(role) ? role : "user";

        // Hash password asynchronously
        const password_hash = await bcrypt.hash(password, 12);

        // Using promise-based database queries
        const sql = `
            INSERT INTO users (full_name, email, password_hash, phone, role)
            VALUES (?, ?, ?, ?, ?)
        `;
        
        const [result] = await db.promise().query(sql, [
            full_name.trim(), 
            email.trim().toLowerCase(), 
            password_hash, 
            phone?.trim(), 
            userRole
        ]);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            userId: result.insertId
        });

    } catch (error) {
        console.error("Registration error:", error);
        
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                success: false,
                error: "Email already registered"
            });
        }
        
        res.status(500).json({
            success: false,
            error: "Registration failed. Please try again."
        });
    }
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = result[0];
    const match = bcrypt.compareSync(password, user.password_hash);

    if (!match) return res.status(401).json({ message: "Incorrect password" });

    res.json({ message: "Login successful", user });
  });
};
