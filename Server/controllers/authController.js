const db = require('../config/db');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');


exports.register = (req, res) => {
    const { Username, Email, Password, Role } = req.body;

    if (!Username || !Email || !Password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const checkQuery = "SELECT * FROM users WHERE Email = ?";
    db.query(checkQuery, [Email], (err, result) => {
        if (err) return res.status(500).json({ message: "DB error" });

        if (result.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashed = bcrypt.hashSync(Password, 10);
        const PhotoURL = req.file ? req.file.filename : null;

        const insertQuery = `
            INSERT INTO users (Username, Email, Password, Role, PhotoURL)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(
            insertQuery,
            [Username, Email, hashed, Role || "User", PhotoURL],
            (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Insert failed" });
                }

                // ✅ CREATE TOKEN
                const token = jwt.sign(
                    { id: result.insertId },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                );

                // ✅ RETURN USER + TOKEN
                res.status(201).json({
                    message: "User registered successfully",
                    token,
                    user: {
                        id: result.insertId,
                        username: Username,
                        email: Email,
                        role: Role || "User",
                        photoURL: PhotoURL
                    }
                });
            }
        );
    });
};


exports.login = (req, res) => {
    const { Username, Password } = req.body;

    if (!Username || !Password) {
        return res.status(400).json({ message: "Missing credentials" });
    }

    const q = "SELECT * FROM users WHERE Username = ?";
    db.query(q, [Username], (err, data) => {
        if (err) return res.status(500).json({ message: "Database error" });

        if (data.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = data[0];

        const isPasswordValid = bcrypt.compareSync(Password, user.Password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign(
            { id: user.ID },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            token,
            user: {
                id: user.ID,
                username: user.Username,
                email: user.Email,
                role: user.Role,
                photoURL: user.PhotoURL
            }
        });
    });
};

exports.getme = (req, res) => {
    const userID = req.userID;

    const q = 'SELECT ID, Username, Email, Role, PhotoURL FROM users WHERE ID = ?';

    db.query(q, [userID], (err, data) => {
        if (err) return res.status(500).json(err);

        if (data.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(data[0]);
    });
};