import React, { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import Swal from "sweetalert2";

function AgentTable() {

    const [agents, setAgents] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadAgents();
    }, []);

    const loadAgents = async () => {

        try {

            const response =
                await UserService.getAgents();

            const approvedAgents =
                response.data.filter(
                    agent =>
                        agent.status === "APPROVED"
                        || !agent.status
                );

            setAgents(approvedAgents);

        } catch (error) {

            console.log(error);

        }
    };

    const viewAgent = (agent) => {

        Swal.fire({

            title: agent.name,

            html: `
                <div style="text-align:left">
                    <p><b>Email:</b> ${agent.email}</p>
                    <p><b>Mobile:</b> ${agent.mobile}</p>
                    <p><b>City:</b> ${agent.assignedCity}</p>
                    <p><b>Area:</b> ${agent.assignedArea}</p>
                    <p><b>Manager:</b> ${agent.assignedManagerName || "-"}</p>
                </div>
            `,
            width: 600

        });
    };

    const deleteAgent = async (id) => {

        Swal.fire({

            title: "Delete Agent?",
            icon: "warning",
            showCancelButton: true

        }).then(async (result) => {

            if (result.isConfirmed) {

                await UserService.deleteUser(id);

                Swal.fire(
                    "Deleted!",
                    "Agent Removed",
                    "success"
                );

                loadAgents();
            }
        });
    };

    const filteredAgents =
        agents.filter(agent =>
            agent.name
                ?.toLowerCase()
                .includes(search.toLowerCase())
        );

    return (

        <div className="agent-table-card">

            <div className="table-header">

                <div>

                    <h3>Approved Agents</h3>

                    <p>
                        Total Agents :
                        <strong>
                            {" "}
                            {filteredAgents.length}
                        </strong>
                    </p>

                </div>

                <input
                    type="text"
                    className="form-control agent-search"
                    placeholder="Search Agent..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

            </div>

            <table className="table agent-table">

                <thead>

                    <tr>

                        <th>Agent Name</th>
                        <th>Manager Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>City</th>
                        <th>Area</th>
                        <th>Status</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {filteredAgents.map((agent) => (

                        <tr key={agent.userId}>

                            <td>{agent.name}</td>

                            <td>
                                {agent.assignedManagerName || "-"}
                            </td>

                            <td>{agent.email}</td>

                            <td>{agent.mobile}</td>

                            <td>{agent.assignedCity}</td>

                            <td>{agent.assignedArea}</td>

                            <td>

                                <span className="badge bg-success">

                                    APPROVED

                                </span>

                            </td>

                            <td>

                                <button
                                    className="btn btn-info btn-sm me-2"
                                    onClick={() =>
                                        viewAgent(agent)
                                    }
                                >
                                    <i className="bi bi-eye"></i>
                                </button>

                                <button
                                    className="btn btn-warning btn-sm me-2"
                                >
                                    <i className="bi bi-pencil-square"></i>
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                        deleteAgent(
                                            agent.userId
                                        )
                                    }
                                >
                                    <i className="bi bi-trash"></i>
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default AgentTable;