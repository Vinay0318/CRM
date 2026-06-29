import React from "react";

import LeadCharts from "./LeadCharts";
import PropertyChart from "./PropertyChart";
import ManagerChart from "./ManagerChart";
import AdminInsights from "../admin/AdminInsights";

function ManagerStats() {

    return (

        <>

            {/* Top Insights */}

            <div className="mb-4">

                <AdminInsights />

            </div>

            {/* Charts */}

            <div className="row">

                <div className="col-lg-8 mb-4">

                    <LeadCharts />

                </div>

                <div className="col-lg-4 mb-4">

                    <PropertyChart />

                </div>

            </div>

            <div className="row">

                <div className="col-lg-12">

                    <ManagerChart />

                </div>

            </div>

        </>

    );

}

export default React.memo(ManagerStats);