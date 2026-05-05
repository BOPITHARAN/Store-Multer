import React, { useState, useEffect } from 'react';
import axios from '../axios/axios';
import { useNavigate } from 'react-router-dom';
import './ManageProduct.css';

function ManageProduct() {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [items, setItems] = useState([]);
    const [editId, setEditId] = useState(null);

    const navigate = useNavigate();

    // 🔐 Check login (page பாதுகாப்பு)
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
        } else {
            fetchItems();
        }
    }, []);

    const fetchItems = async () => {
        try {
            const res = await axios.get('/items');
            setItems(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !quantity || !price) {
            alert('Please fill all fields.');
            return;
        }

        try {
            if (editId) {
                await axios.put(`/items/${editId}`, { name, quantity, price });
                setEditId(null);
            } else {
                await axios.post('/items', { name, quantity, price });
            }

            setName('');
            setQuantity('');
            setPrice('');
            fetchItems();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (item) => {
        setEditId(item.id);
        setName(item.name);
        setQuantity(item.quantity);
        setPrice(item.price);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this item?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`/items/${id}`);
            fetchItems();
        } catch (err) {
            console.error(err);
        }
    };

    // 🔒 Logout function
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <div className="container">

            {/* 🔐 Header with Logout */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 className="title">🛍 Simple Item Manager (CRUD)</h2>
                <button className="button logout" onClick={handleLogout}>
                    🔒 Logout
                </button>
            </div>

            <form onSubmit={handleSubmit} className="form">
                <input
                    className="input"
                    placeholder="Item Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className="input"
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    className="input"
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <button type="submit" className="button">
                    {editId ? 'Update Item' : 'Add Item'}
                </button>

                {editId && (
                    <button
                        type="button"
                        className="button cancel"
                        onClick={() => {
                            setEditId(null);
                            setName('');
                            setQuantity('');
                            setPrice('');
                        }}
                    >
                        Cancel Edit
                    </button>
                )}
            </form>

            <h3>📋 Items List</h3>

            <table className="table">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Product Quantity</th>
                        <th>Product Price</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>Rs. {item.price}</td>
                            <td>
                                <button className="action-btn" onClick={() => handleEdit(item)}>
                                    ✏ Edit
                                </button>
                            </td>
                            <td>
                                <button
                                    className="action-btn delete"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    🗑 Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default ManageProduct;