import React, { useState } from "react";

import AgentSidebar from "../components/agent/AgentSidebar";
import AgentDashboard from "../components/agent/AgentDashboard";
import AgentLeads from "../components/agent/AgentLeads";
import FollowUpManagement from "../components/agent/FollowUpManagement";
import SiteVisitManagement from "../components/agent/SiteVisitManagement";
import LeadNote from "../components/agent/LeadNote";
import AgentStatistics from "../components/agent/AgentStatistics";

function AgentDashboardPage() {

    const [activeTab, setActiveTab] = useState("dashboard");

    const renderContent = () => {

        switch (activeTab) {

            case "dashboard":
                return <AgentDashboard />;

            case "leads":
                return <AgentLeads />;

            case "followups":
                return <FollowUpManagement />;

            case "visits":
                return <SiteVisitManagement />;

            case "notes":
                return <LeadNote />;

            case "stats":
                return <AgentStatistics />;

            default:
                return <AgentDashboard />;

        }

    };

    return (

        <div className="dashboard-layout">

            <AgentSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            <main className="dashboard-content">

                {renderContent()}

            </main>

        </div>

    );

}

export default React.memo(AgentDashboardPage);