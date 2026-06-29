import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import UserService from "../../services/UserService";
import { areaMap } from "../../data/areaMap";

function AgentForm({ loadAgents }) {

    const [loading, setLoading] = useState(false);

    const [managers, setManagers] = useState([]);

    const [areas, setAreas] = useState([]);

    const [agent, setAgent] = useState({

        name: "",
        email: "",
        mobile: "",
        password: "",
        assignedManagerId: "",
        assignedCity: "",
        assignedArea: ""

    });

    useEffect(() => {

        loadManagers();

    }, []);

    const loadManagers = async () => {

        try {

            const res = await UserService.getManagers();

            setManagers(res.data);

        }

        catch (error) {

            console.error("Unable to load managers", error);

        }

    };

    const handleManagerChange = (e) => {

        const managerId = e.target.value;

        const manager = managers.find(

            m => m.userId === managerId

        );

        if (!manager) {

            setAreas([]);

            return;

        }

        setAgent(prev => ({

            ...prev,

            assignedManagerId: manager.userId,

            assignedCity: manager.assignedCity,

            assignedArea: ""

        }));

        setAreas(

            areaMap[manager.assignedCity] || []

        );

    };

    const handleChange = (e) => {

        setAgent(prev => ({

            ...prev,

            [e.target.name]: e.target.value

        }));

    };

    const validate = () => {

        if (!agent.name.trim()) {

            Swal.fire(
                "Validation",
                "Please enter agent name.",
                "warning"
            );

            return false;

        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(agent.email)) {

            Swal.fire(
                "Validation",
                "Please enter a valid email.",
                "warning"
            );

            return false;

        }

        if (!/^[0-9]{10}$/.test(agent.mobile)) {

            Swal.fire(
                "Validation",
                "Mobile number must contain 10 digits.",
                "warning"
            );

            return false;

        }

        if (agent.password.length < 6) {

            Swal.fire(
                "Validation",
                "Password must be at least 6 characters.",
                "warning"
            );

            return false;

        }

        if (!agent.assignedManagerId) {

            Swal.fire(
                "Validation",
                "Please select a manager.",
                "warning"
            );

            return false;

        }

        if (!agent.assignedArea) {

            Swal.fire(
                "Validation",
                "Please select an area.",
                "warning"
            );

            return false;

        }

        return true;

    };

    const saveAgent = async (e) => {

        e.preventDefault();

        if (!validate()) return;

        try {

            setLoading(true);

            await UserService.addAgent(agent);

            Swal.fire({

                icon: "success",

                title: "Success",

                text: "Agent added successfully."

            });

            setAgent({

                name: "",
                email: "",
                mobile: "",
                password: "",
                assignedManagerId: "",
                assignedCity: "",
                assignedArea: ""

            });

            setAreas([]);

            loadAgents();

        }

        catch (error) {

            console.error("Agent Creation Error:", error);

            Swal.fire({

                icon: "error",

                title: "Error",

                text:
                    error.response?.data?.message ||
                    error.response?.data ||
                    "Unable to add agent."

            });

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <form onSubmit={saveAgent}>

            <div className="row">

                <div className="col-md-6 mb-3">

                    <label className="form-label">
                        Agent Name
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={agent.name}
                        onChange={handleChange}
                    />

                </div>

                <div className="col-md-6 mb-3">

                    <label className="form-label">
                        Email
                    </label>

                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={agent.email}
                        onChange={handleChange}
                    />

                </div>

                <div className="col-md-6 mb-3">

                    <label className="form-label">
                        Mobile
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="mobile"
                        maxLength="10"
                        value={agent.mobile}
                        onChange={handleChange}
                    />

                </div>

                <div className="col-md-6 mb-3">

                    <label className="form-label">
                        Password
                    </label>

                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={agent.password}
                        onChange={handleChange}
                    />

                </div>

                <div className="col-md-6 mb-3">

                    <label className="form-label">
                        Manager
                    </label>

                    <select
                        className="form-select"
                        value={agent.assignedManagerId}
                        onChange={handleManagerChange}
                    >

                        <option value="">
                            Select Manager
                        </option>

                        {

                            managers.map(manager => (

                                <option
                                    key={manager.userId}
                                    value={manager.userId}
                                >

                                    {manager.name} ({manager.assignedCity})

                                </option>

                            ))

                        }

                    </select>

                </div>

                <div className="col-md-6 mb-3">

                    <label className="form-label">
                        Assigned City
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value={agent.assignedCity}
                        readOnly
                    />

                </div>

                <div className="col-md-6 mb-3">

                    <label className="form-label">
                        Assigned Area
                    </label>

                    <select
                        className="form-select"
                        name="assignedArea"
                        value={agent.assignedArea}
                        onChange={handleChange}
                    >

                        <option value="">
                            Select Area
                        </option>

                        {

                            areas.map(area => (

                                <option
                                    key={area}
                                    value={area}
                                >

                                    {area}

                                </option>

                            ))

                        }

                    </select>

                </div>

            </div>

            <button
                className="manager-btn"
                type="submit"
                disabled={loading}
            >

                <i className="bi bi-person-plus-fill me-2"></i>

                {

                    loading

                        ? "Adding Agent..."

                        : "Add Agent"

                }

            </button>

        </form>

    );

}

export default AgentForm;