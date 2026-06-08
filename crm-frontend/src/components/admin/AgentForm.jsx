import React, { useEffect, useState } from "react";
import UserService from "../../services/UserService";

function AgentForm({ loadAgents }) {

    const [managers, setManagers] = useState([]);

    const [agent, setAgent] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        location: "",
        assignedCity: "",
        assignedArea: "",
        assignedManagerId: "",
        role: "AGENT"
    });

    useEffect(() => {
        loadManagers();
    }, []);

    const loadManagers = async () => {

        const response =
            await UserService.getManagers();

        setManagers(response.data);
    };

    const handleChange = (e) => {

        setAgent({
            ...agent,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await UserService.addUser(agent);

            alert("Agent Added Successfully");

            setAgent({
                name: "",
                email: "",
                mobile: "",
                password: "",
                location: "",
                assignedCity: "",
                assignedArea: "",
                assignedManagerId: "",
                role: "AGENT"
            });

            loadAgents();

        } catch (error) {

            alert(
                error.response?.data ||
                "Error"
            );
        }
    };

    return (

        <div className="agent-form-card">

            <h4>Add Agent</h4>

            <form onSubmit={handleSubmit}
            autoComplete="off">

                <div className="row">

                    <div className="col-md-6 mb-3">
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Agent Name"
                            value={agent.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Email"
                            value={agent.email}
                            onChange={handleChange}
                            autoComplete="off"
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <input
                            type="text"
                            name="mobile"
                            className="form-control"
                            placeholder="Mobile"
                            value={agent.mobile}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            value={agent.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <input
                            type="text"
                            name="location"
                            className="form-control"
                            placeholder="Location"
                            value={agent.location}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <input
                            type="text"
                            name="assignedCity"
                            className="form-control"
                            placeholder="Assigned City"
                            value={agent.assignedCity}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <input
                            type="text"
                            name="assignedArea"
                            className="form-control"
                            placeholder="Assigned Area"
                            value={agent.assignedArea}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6 mb-3">

                        <select
                            name="assignedManagerId"
                            className="form-select"
                            value={agent.assignedManagerId}
                            onChange={handleChange}
                        >

                            <option value="">
                                Select Manager
                            </option>

                            {
                                managers.map(
                                    (manager) => (

                                        <option
                                            key={manager.userId}
                                            value={manager.userId}
                                        >
                                            {manager.name}
                                        </option>

                                    )
                                )
                            }

                        </select>

                    </div>

                </div>

                <button
                    type="submit"
                    className="agent-btn"
                >
                    Add Agent
                </button>

            </form>

        </div>
    );
}

export default AgentForm;