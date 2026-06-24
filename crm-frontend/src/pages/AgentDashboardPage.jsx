import React, { useState } from "react";

import AgentSidebar from "../components/agent/AgentSidebar";
import FollowUpManagement from "../components/agent/FollowUpManagement"
import AgentDashboard from "../components/agent/AgentDashboard";
import AgentLeads from "../components/agent/AgentLeads";
import LeadNote from "../components/agent/LeadNote";
import AgentStatistics from "../components/agent/AgentStatistics";
import SiteVisitManagement from "../components/agent/SiteVisitManagement";

function AgentDashboardPage() {

    const [activeTab, setActiveTab] =
        useState("dashboard");

    return (

        <div className="dashboard-layout">

            <AgentSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            <div className="dashboard-content">

                {
                    activeTab === "dashboard" &&
                    <AgentDashboard />
                }

                {
                    activeTab === "leads" &&
                    <AgentLeads />
                }

                {
                    activeTab === "followups" &&
                    <FollowUpManagement />
                }

                {
                    activeTab === "visits" &&
                    <SiteVisitManagement />
                }

                {
                    activeTab === "notes" &&
                    <LeadNote />
                }

                {
                    activeTab === "stats" &&
                    <AgentStatistics />
                }

            </div>

        </div>

    );
}

export default AgentDashboardPage;