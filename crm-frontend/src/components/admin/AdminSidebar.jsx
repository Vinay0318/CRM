import React from "react";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

import LogoutService from "../../services/LogoutService";

function AdminSidebar() {

    const location = useLocation();

    const name =
        localStorage.getItem("name");

    const email =
        localStorage.getItem("email");

    const isActive = (path) =>

        location.pathname === path

            ? "sidebar-link active"

            : "sidebar-link";

    const handleLogout = () => {

        Swal.fire({

            title: "Logout?",

            text: "Do you want to logout?",

            icon: "question",

            showCancelButton: true,

            confirmButtonText: "Logout",

            confirmButtonColor: "#dc3545"

        }).then((result) => {

            if (result.isConfirmed) {

                LogoutService.logout();

            }

        });

    };

    return (

        <div className="admin-sidebar">

            {/* Logo */}

            <div className="sidebar-logo">

                <h2>

                    🏢 eState CRM

                </h2>

            </div>

            {/* Admin Information */}

            <div className="sidebar-user-card">

                <h5>

                    {name}

                </h5>

                <p>

                    ADMIN

                </p>

                <small>

                    {email}

                </small>

            </div>

            {/* Navigation */}

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

            </div>

            {/* Logout */}

            <div className="logout-section">

                <button
                    className="logout-btn-sidebar"
                    onClick={handleLogout}
                >

                    <i className="bi bi-box-arrow-right"></i>

                    Logout

                </button>

            </div>

        </div>

    );

}

export default AdminSidebar;