import React, { useEffect, useState } from "react";

import DashboardStats from "./DashboardStats";

import LeadService from "../../services/LeadService";
import UserService from "../../services/UserService";
import PropertyService from "../../services/PropertyService";

function AdminCards() {

    const [stats, setStats] = useState({
        leads: 0,
        managers: 0,
        agents: 0,
        properties: 0
    });

    useEffect(() => {

        loadDashboardData();

    }, []);

    const loadDashboardData = async () => {

        try {

            const leadResponse =
                await LeadService.getAllLeads();

            const managerResponse =
                await UserService.getManagers();

            const agentResponse =
                await UserService.getAgents();

            const propertyResponse =
                await PropertyService.getAllProperties();

            setStats({
                leads:
                    leadResponse.data.length,

                managers:
                    managerResponse.data.length,

                agents:
                    agentResponse.data.length,

                properties:
                    propertyResponse.data.length
            });

        } catch (error) {

            console.error(
                "Dashboard Error",
                error
            );
        }
    };

    return (

        <div className="row">

            <DashboardStats
                title="Total Leads"
                value={stats.leads}
                icon="📋"
                bgClass="bg-blue"
            />

            <DashboardStats
                title="Managers"
                value={stats.managers}
                icon="👨‍💼"
                bgClass="bg-green"
            />

            <DashboardStats
                title="Agents"
                value={stats.agents}
                icon="👨‍💻"
                bgClass="bg-orange"
            />

            <DashboardStats
                title="Properties"
                value={stats.properties}
                icon="🏠"
                bgClass="bg-purple"
            />

        </div>

    );
}

export default AdminCards;