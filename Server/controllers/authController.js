const db = require('../config/db');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');


exports.register = (req, res) => {
    const { Username, Email, Password, Role } = req.body;

    if (!Username || !Email || !Password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // 🔍 Check existing email
    const checkQuery = "SELECT * FROM users WHERE Email = ?";
    db.query(checkQuery, [Email], (err, result) => {
        if (err) return res.status(500).json({ message: "DB error" });

        if (result.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // 🔐 Hash password
        const hashed = bcrypt.hashSync(Password, 10);

        // 📸 Photo optional
        const PhotoURL = req.file ? req.file.filename : null;

        const insertQuery = `
            INSERT INTO users (Username, Email, Password, Role, PhotoURL)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(
            insertQuery,
            [Username, Email, hashed, Role || "User", PhotoURL],
            (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Insert failed" });
                }

                res.status(201).json({
                    message: "User registered successfully"
                });
            }
        );
    });
};

// exports.register = (req, res) => {
//     const { Username, Email, Password, Role, PhotoURL } = req.body;

//     if (!Username || !Email || !Password) {
//         return res.status(400).send({ error: 'Missing fields' });
//     }

//     const hashed = bcrypt.hashSync(Password, 10);
//     const finalRole = Role || "User";

//     // 👉 IMPORTANT: optional handling
//     const finalPhoto = PhotoURL || null;

//     const q = `
//         INSERT INTO users (Username, Email, Password, Role, PhotoURL)
//         VALUES (?, ?, ?, ?, ?)
//     `;

//     db.query(q, [Username, Email, hashed, finalRole, finalPhoto], (err, result) => {
//         if (err) return res.status(500).json(err);

//         res.status(201).json({
//             message: 'User created successfully'
//         });
//     });
// };

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