import React, { useState } from "react";
import ProductView from "../component/productview.jsx";
import UserView from "../component/userview.jsx";

export const BackOffice = () => {
    const [activeTab, setActiveTab] = useState("products");

    return (
        <div className="container">
            <ul className="nav nav-pills nav-justified mt-3">
                <li className="nav-item">
                    <a className={`nav-link ${activeTab === "products" ? "active" : ""}`} onClick={() => setActiveTab("products")}>Productos</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${activeTab === "users" ? "active" : ""}`} onClick={() => setActiveTab("users")}>Usuarios</a>
                </li>
            </ul>

            {activeTab === "products" && <ProductView />}
            {activeTab === "users" && <UserView />}
        </div>
    );
};
