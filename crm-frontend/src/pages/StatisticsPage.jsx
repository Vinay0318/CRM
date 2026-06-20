import React from "react";

import AdminLayout
from "../components/admin/AdminLayout";

import LeadCharts
from "../components/admin/LeadCharts";

import PropertyChart
from "../components/admin/PropertyChart";

import AdminInsights
from "../components/admin/AdminInsights";

function StatisticsPage() {

    return (

        <AdminLayout>

<div className="page-header-modern">

<div className="header-info">

    <div className="header-icon-box">

        <i className="bi bi-bar-chart-fill"></i>

    </div>

    <div>

        <h1 className="page-title-modern">
            Analytics & Statistics
        </h1>

        <p className="page-subtitle-modern">
            Complete business performance overview
        </p>

    </div>

</div>

</div>

            {/* Real KPI Cards */}

            <AdminInsights />

            {/* Charts */}

            <div className="row mt-4">

                <div className="col-lg-6">

                    <div className="dashboard-card">

                        <h4>
                            Lead Analytics
                        </h4>

                        <LeadCharts />

                    </div>

                </div>

                <div className="col-lg-6">

                    <div className="dashboard-card">

                        <h4>
                            Property Analytics
                        </h4>

                        <PropertyChart />

                    </div>

                </div>

            </div>

        </AdminLayout>

    );
}

export default StatisticsPage;