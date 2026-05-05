const db = require('../config/db');

// CREATE
exports.createItem = (req, res) => {
    const { name, price, quantity } = req.body;

    db.query(
        'INSERT INTO items (name, price, quantity) VALUES (?,?,?)',
        [name, price, quantity],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            res.json({
                id: result.insertId,
                name,
                price,
                quantity
            });
        }
    );
};

// READ
exports.getItems = (req, res) => {
    db.query('SELECT * FROM items ORDER BY id DESC', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// UPDATE
exports.updateItem = (req, res) => {
    const { id } = req.params;
    const { name, price, quantity } = req.body;

    db.query(
        'UPDATE items SET name=?, price=?, quantity=? WHERE id=?',
        [name, price, quantity, id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Item updated' });
        }
    );
};

// DELETE
exports.deleteItem = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM items WHERE id=?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Item deleted' });
    });
};

// SEARCH
exports.searchItems = (req, res) => {
    const { name } = req.query;
    db.query(
        'SELECT * FROM items WHERE name LIKE ?',
        [`%${name}%`],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        }
    );
};