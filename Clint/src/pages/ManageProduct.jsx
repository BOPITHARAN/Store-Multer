import React, { useState, useEffect } from 'react';
import axios from '../axios/axios';
import ItemModal from '../components/ItemModal';
import './ManageProduct.css';

function ManageProduct() {
    const [items, setItems] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 40;

    // 🔍 search states
    const [liveSearch, setLiveSearch] = useState("");
    const [backendSearch, setBackendSearch] = useState("");

    const fetchItems = async () => {
        const res = await axios.get('/items');
        setItems(res.data);
    };

    const toTitleCase = (str) => {
        return str
            .toLowerCase()
            .trim()
            .split(/\s+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const clearSearch = async () => {
        setLiveSearch("");
        setBackendSearch("");
        setCurrentPage(1);
        fetchItems(); // 🔥 original full data reload
    };

    useEffect(() => {
        fetchItems();
    }, []);

    // 🔥 LIVE SEARCH (frontend)
    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(liveSearch.toLowerCase())
    );

    // 🔥 PAGINATION
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    // 🔥 BACKEND SEARCH
    const handleBackendSearch = async () => {
        if (!backendSearch) return;

        const res = await axios.get(`/items/search?name=${backendSearch}`);
        setItems(res.data);
        setCurrentPage(1);
    };

    const handleSubmit = async (form) => {
        const { name, price, quantity } = form;

        if (!name || !price || !quantity) {
            return alert("Please fill all fields");
        }

        const formattedForm = {
            ...form,
            name: toTitleCase(name)   // 🔥 AUTO FORMAT HERE
        };

        if (editItem) {
            await axios.put(`/items/${editItem.id}`, formattedForm);
        } else {
            await axios.post('/items', formattedForm);
        }

        setModalOpen(false);
        setEditItem(null);
        fetchItems();
    };

    const openModal = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setEditItem(null);
        setModalOpen(true);
    };

    const handleEdit = (item) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setEditItem(item);
        setModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this item?")) return;
        await axios.delete(`/items/${id}`);
        fetchItems();
    };

    return (
        <div className="container">
            <h2 className="title">🛍 Product Manager</h2>

            {/* 🔍 SEARCH SECTION */}
            <div className="top-bar">

                {/* LIVE SEARCH */}
                <input
                    type="text"
                    placeholder="🔍 Live Search..."
                    value={liveSearch}
                    onChange={(e) => {
                        setLiveSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="search-input"
                />

                {/* BACKEND SEARCH */}
                <input
                    type="text"
                    placeholder="🔎 Backend Search..."
                    value={backendSearch}
                    onChange={(e) => setBackendSearch(e.target.value)}
                    className="search-input"
                />

                <button className="search-btn" onClick={handleBackendSearch}>
                    Search
                </button>
                <button className="clear-btn" onClick={clearSearch}>
                    ❌ Clear
                </button>

                <button className="add-btn" onClick={openModal}>
                    + Add Item
                </button>
            </div>

            {/* TABLE */}
            <div className="table-wrapper">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{items.length - (indexOfFirstItem + index)}</td>

                                    {/* DATABASE ID */}
                                    <td style={{ color: 'red' }}>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>Rs. {Number(item.price).toFixed(2)}</td>
                                    <td>
                                        <button onClick={() => handleEdit(item)}>✏</button>
                                        <button onClick={() => handleDelete(item.id)}>🗑</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No items found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* PAGINATION */}
            <div className="pagination">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>⬅</button>
                <span>Page {currentPage}</span>
                <button disabled={indexOfLastItem >= filteredItems.length} onClick={() => setCurrentPage(currentPage + 1)}>➡</button>
            </div>

            <ItemModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
                editItem={editItem}
            />
        </div>
    );
}

export default ManageProduct;