import React, { useCallback } from "react";
import "../../styles/Sidebar.css";

import Swal from "sweetalert2";
import LogoutService from "../../services/LogoutService";

function Sidebar({ activeTab, setActiveTab }) {

    const managerName =
        localStorage.getItem("name") || "Manager";

    const menuItems = [

        {
            key: "dashboard",
            label: "Dashboard",
            icon: "bi bi-grid-fill"
        },

        {
            key: "new",
            label: "New Leads",
            icon: "bi bi-bell-fill"
        },

        {
            key: "assigned",
            label: "Assigned Leads",
            icon: "bi bi-person-check-fill"
        },

        {
            key: "properties",
            label: "Properties",
            icon: "bi bi-buildings-fill"
        },

        {
            key: "agents",
            label: "Agents",
            icon: "bi bi-people-fill"
        },

        {
            key: "stats",
            label: "Statistics",
            icon: "bi bi-bar-chart-fill"
        }

    ];

    const handleLogout = useCallback(() => {

        Swal.fire({

            title: "Logout?",

            text: "Do you really want to logout?",

            icon: "question",

            showCancelButton: true,

            confirmButtonText: "Logout",

            cancelButtonText: "Cancel",

            confirmButtonColor: "#dc3545"

        }).then((result) => {

            if (result.isConfirmed) {

                LogoutService.logout();

            }

        });

    }, []);

    return (

        <div className="sidebar">

            <div>

                {/* Logo */}

                <div className="sidebar-header">

                    <div className="sidebar-logo">

                        🏢

                    </div>

                    <h4 className="sidebar-title">

                        CRM Panel

                    </h4>

                    <small className="sidebar-subtitle">

                        Manager Portal

                    </small>

                </div>

                {/* Manager Info */}

                <div className="manager-profile">

                    <div>

                        <h6>

                            {managerName}

                        </h6>

                        <small>

                            Manager

                        </small>

                    </div>

                </div>

                {/* Sidebar Menu */}

                <div className="sidebar-menu">

                    {

                        menuItems.map((item) => (

                            <button

                                key={item.key}

                                className={`sidebar-link ${
                                    activeTab === item.key
                                        ? "active"
                                        : ""
                                }`}

                                onClick={() =>
                                    setActiveTab(item.key)
                                }

                            >

                                <i className={item.icon}></i>

                                {item.label}

                            </button>

                        ))

                    }

                </div>

            </div>

            {/* Logout */}

            <div className="sidebar-footer">

                <button

                    className="logout-btn"

                    onClick={handleLogout}

                >

                    <i className="bi bi-box-arrow-right"></i>

                    Logout

                </button>

            </div>

        </div>

    );

}

export default React.memo(Sidebar);