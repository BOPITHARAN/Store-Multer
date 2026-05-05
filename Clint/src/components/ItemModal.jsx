import React, { useEffect, useState } from "react";

function ItemModal({ isOpen, onClose, onSubmit, editItem }) {
    const [form, setForm] = useState({
        name: "",
        price: "",
        quantity: ""
    });

    useEffect(() => {
        if (editItem) {
            setForm(editItem);
        } else {
            setForm({ name: "", price: "", quantity: "" });
        }
    }, [editItem]);
    
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    // 🔥 body scroll lock
    // useEffect(() => {
    //     if (isOpen) {
    //         document.body.style.overflow = "hidden";
    //     } else {
    //         document.body.style.overflow = "auto";
    //     }

    //     return () => {
    //         document.body.style.overflow = "auto";
    //     };
    // }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">

                <h2>{editItem ? "Edit Item" : "Add Item"}</h2>

                <input
                    placeholder="Item Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                    type="number"
                    placeholder="Price"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                />

                <input
                    type="number"
                    placeholder="Quantity"
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                />

                <div className="modal-buttons">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={() => onSubmit(form)}>
                        {editItem ? "Update" : "Add"}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default ItemModal;