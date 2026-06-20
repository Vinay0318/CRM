import React from "react";
import { Link, useLocation } from "react-router-dom";
import LogoutService from "../../services/LogoutService";

function AdminSidebar() {

    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path
            ? "sidebar-link active"
            : "sidebar-link";
    };

    return (

        <div className="admin-sidebar">

            {/* Logo */}

            <div className="sidebar-logo">

                <h2>
                    🏢 eState CRM
                </h2>

            </div>

            {/* User Info */}

            <div className="sidebar-user-card">

                <h5>
                    {localStorage.getItem("name")}
                </h5>

                <p>
                    ADMIN
                </p>

                <small>
                    {localStorage.getItem("email")}
                </small>

            </div>

            {/* Menu */}

            <div className="sidebar-menu">

                <Link
                    to="/admin/dashboard"
                    className={isActive("/admin/dashboard")}
                >
                    <i className="bi bi-grid-fill"></i>
                    Dashboard
                </Link>

                <Link
                    to="/admin/view/leads"
                    className={isActive("/admin/view/leads")}
                >
                    <i className="bi bi-person-lines-fill"></i>
                    Leads
                </Link>

                <Link
                    to="/admin/managers"
                    className={isActive("/admin/managers")}
                >
                    <i className="bi bi-people-fill"></i>
                    Managers
                </Link>

                <Link
                    to="/admin/agents"
                    className={isActive("/admin/agents")}
                >
                    <i className="bi bi-person-badge-fill"></i>
                    Agents
                </Link>

                <Link
                    to="/admin/properties"
                    className={isActive("/admin/properties")}
                >
                    <i className="bi bi-building-fill"></i>
                    Properties
                </Link>

                <Link
                    to="/admin/statistics"
                    className={isActive("/admin/statistics")}
                >
                    <i className="bi bi-bar-chart-fill"></i>
                    Statistics
                </Link>

                <Link
                    to="/admin/pending-requests"
                    className={isActive("/admin/pending-requests")}
                >
                    <i className="bi bi-clock-history"></i>
                    Pending Requests
                </Link>

            </div>

            {/* Logout */}

            <div className="logout-section">

                <button
                    className="logout-btn-sidebar"
                    onClick={() =>
                        LogoutService.logout()
                    }
                >
                    <i className="bi bi-box-arrow-right"></i>
                    Logout
                </button>

            </div>

        </div>
    );
}

export default AdminSidebar;