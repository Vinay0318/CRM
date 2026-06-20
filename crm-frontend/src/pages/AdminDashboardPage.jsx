import React from "react";

import AdminLayout from "../components/admin/AdminLayout";

import AdminCards from "../components/admin/AdminCards";
import LeadCharts from "../components/admin/LeadCharts";
import PropertyChart from "../components/admin/PropertyChart";
import AdminInsights from "../components/admin/AdminInsights";
import RecentActivities from "../components/admin/RecentActivities";

import "../styles/Admin.css";

function AdminDashboardPage() {

    return (

        <AdminLayout>

            {/* Header */}

            <div className="dashboard-hero">

    <div>

        <div className="hero-icon">
            📊
        </div>

        <h1>
            Dashboard
        </h1>

        <p>
            Welcome back, {localStorage.getItem("name")}
        </p>

    </div>

</div>

            {/* Statistics Cards */}

            <AdminCards />

            {/* Lead Chart + Activities */}

            <div className="row mt-4">

                <div className="col-lg-8">

                    <div className="dashboard-card">

                        <h4>
                            Lead Overview
                        </h4>

                        <LeadCharts />

                    </div>

                </div>

                <div className="col-lg-4">

                    <div className="dashboard-card">

                        <h4>
                            Recent Activities
                        </h4>

                        <RecentActivities />

                    </div>

                </div>

            </div>

            {/* Property Chart */}

            <div className="row mt-4">

                <div className="col-lg-12">

                    <div className="dashboard-card">

                        <h4>
                            Property Overview
                        </h4>

                        <PropertyChart />

                    </div>

                </div>

            </div>

            {/* Business Insights */}

            <div className="row mt-4">

                <div className="col-lg-12">

                    <div className="dashboard-card">

                        <h4>
                            Business Insights
                        </h4>

                        <AdminInsights />

                    </div>

                </div>

            </div>

        </AdminLayout>

    );
}

export default AdminDashboardPage;