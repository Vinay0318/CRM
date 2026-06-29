import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import UserService from "../../services/UserService";
import LeadService from "../../services/LeadService";

function ManagerAgentTable() {

    const [agents, setAgents] = useState([]);

    const [leads, setLeads] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadData();

    }, []);

    // ===========================
    // Load Data
    // ===========================

    const loadData = async () => {

        try {

            setLoading(true);

            const managerId =
                localStorage.getItem("userId");

            const city =
                localStorage.getItem("assignedCity");

            const [

                agentRes,

                leadRes

            ] = await Promise.all([

                UserService.getAgentsByManager(managerId),

                LeadService.getLeadsByCity(city)

            ]);

            setAgents(agentRes.data || []);

            setLeads(leadRes.data || []);

        }

        catch (error) {

            console.error(

                "Failed to load manager dashboard data",

                error

            );

        }

        finally {

            setLoading(false);

        }

    };

    // ===========================
    // Lead Count By Agent
    // ===========================

    const leadCountMap = useMemo(() => {

        const map = {};

        leads.forEach((lead) => {

            if (lead.assignedAgentName) {

                map[lead.assignedAgentName] =

                    (map[lead.assignedAgentName] || 0) + 1;

            }

        });

        return map;

    }, [leads]);

    if (loading) {

        return (

            <div className="chart-card text-center py-5">

                <div className="spinner-border text-primary"></div>

                <h6 className="mt-3">

                    Loading Agents...

                </h6>

            </div>

        );

    }

    return (

        <div className="chart-card">

            <div className="table-title">

                <i className="bi bi-people-fill"></i>

                <h5>

                    Agent Performance

                </h5>

            </div>

            <div className="table-responsive">

                <table className="table table-hover">

                    <thead>

                        <tr>

                            <th>Name</th>

                            <th>Area</th>

                            <th>Email</th>

                            <th>Mobile</th>

                            <th>Total Leads</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            agents.length === 0 ? (

                                <tr>

                                    <td

                                        colSpan="5"

                                        className="text-center py-4"

                                    >

                                        No Agents Found

                                    </td>

                                </tr>

                            ) : (

                                agents.map((agent) => (

                                    <tr

                                        key={agent.userId}

                                    >

                                        <td>

                                            {agent.name || "-"}

                                        </td>

                                        <td>

                                            {

                                                agent.assignedArea ||

                                                "-"

                                            }

                                        </td>

                                        <td>

                                            {agent.email || "-"}

                                        </td>

                                        <td>

                                            {agent.mobile || "-"}

                                        </td>

                                        <td>

                                            <span className="badge bg-primary">

                                                {

                                                    leadCountMap[

                                                        agent.name

                                                    ] || 0

                                                }

                                            </span>

                                        </td>

                                    </tr>

                                ))

                            )

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default React.memo(ManagerAgentTable);