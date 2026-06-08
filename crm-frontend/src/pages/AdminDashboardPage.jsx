import React from "react";
import { Link } from "react-router-dom";

import "../styles/Admin.css";


import AdminCards from "../components/admin/AdminCards";
import LeadCharts from "../components/admin/LeadCharts";
import PropertyChart from "../components/admin/PropertyChart";
import ManagerChart from "../components/admin/ManagerChart";

function AdminDashboardPage() {

    return (

        <div className="admin-page">

            <div className="dashboard-header">

                <h2>
                    Admin Dashboard
                </h2>

                <p>
                    Real Estate CRM Analytics Overview
                </p>

            </div>

            <AdminCards />

            <div className="row mt-4">

    <div className="col-md-4 mb-3">

        <Link
            to="/admin/managers"
            className="btn btn-primary w-100"
        >
            Manage Managers
        </Link>

    </div>

    <div className="col-md-4 mb-3">

        <Link
            to="/admin/agents"
            className="btn btn-success w-100"
        >
            Manage Agents
        </Link>

    </div>

    <div className="col-md-4 mb-3">

        <Link
            to="/admin/properties"
            className="btn btn-warning w-100"
        >
            Manage Properties
        </Link>

    </div>

</div>

            <div className="row mt-4">

                <div className="col-lg-6 mb-4">
                    <LeadCharts />
                </div>

                <div className="col-lg-6 mb-4">
                    <PropertyChart />
                </div>

            </div>

            <div className="row">

                <div className="col-lg-12">

                    <ManagerChart />

                </div>

            </div>

        </div>
    );
}

export default AdminDashboardPage;