import React from "react";
import AdminSidebar from "./AdminSidebar";
import "../../styles/Admin.css";

function AdminLayout({ children }) {

    return (

        <div className="admin-layout">

            <AdminSidebar />

            <main className="admin-content">

                {children}

            </main>

        </div>

    );

}

export default AdminLayout;