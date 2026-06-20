import React, {
    useEffect,
    useState
} from "react";

import LeadService
from "../../services/LeadService";

import UserService
from "../../services/UserService";

import PropertyService
from "../../services/PropertyService";

function AdminCards() {

    const [stats, setStats] =
        useState({

            leads: 0,
            managers: 0,
            agents: 0,
            properties: 0

        });

    useEffect(() => {

        loadDashboardData();

    }, []);

    const loadDashboardData =
        async () => {

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

            }

            catch (error) {

                console.error(error);

            }
        };

    return (

        <div className="row">

            {/* Leads */}

            <div className="col-lg-3 col-md-6 mb-4">

                <div className="stats-card bg-blue">

                    <div>

                        <p className="card-label">
                            Total Leads
                        </p>

                        <h2 className="card-value">
                            {stats.leads}
                        </h2>

                        <span className="card-growth">
                            ↑ 12% This Month
                        </span>

                    </div>

                    <div className="stats-icon">

                        <i className="bi bi-person-lines-fill"></i>

                    </div>

                </div>

            </div>

            {/* Managers */}

            <div className="col-lg-3 col-md-6 mb-4">

                <div className="stats-card bg-green">

                    <div>

                        <p className="card-label">
                            Managers
                        </p>

                        <h2 className="card-value">
                            {stats.managers}
                        </h2>

                        <span className="card-growth">
                            Active Team
                        </span>

                    </div>

                    <div className="stats-icon">

                        <i className="bi bi-people-fill"></i>

                    </div>

                </div>

            </div>

            {/* Agents */}

            <div className="col-lg-3 col-md-6 mb-4">

                <div className="stats-card bg-orange">

                    <div>

                        <p className="card-label">
                            Agents
                        </p>

                        <h2 className="card-value">
                            {stats.agents}
                        </h2>

                        <span className="card-growth">
                            Field Team
                        </span>

                    </div>

                    <div className="stats-icon">

                        <i className="bi bi-person-badge-fill"></i>

                    </div>

                </div>

            </div>

            {/* Properties */}

            <div className="col-lg-3 col-md-6 mb-4">

                <div className="stats-card bg-purple">

                    <div>

                        <p className="card-label">
                            Properties
                        </p>

                        <h2 className="card-value">
                            {stats.properties}
                        </h2>

                        <span className="card-growth">
                            Listed Properties
                        </span>

                    </div>

                    <div className="stats-icon">

                        <i className="bi bi-building-fill"></i>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default AdminCards;