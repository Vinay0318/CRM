import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import Swal from "sweetalert2";

function AgentRegisterPage() {

    const navigate = useNavigate();

    const [agent, setAgent] =
        useState({

            name: "",
            email: "",
            mobile: "",
            password: "",
            assignedCity: "",
            assignedArea: "",
            location: ""

        });

    const handleChange = (e) => {

        setAgent({

            ...agent,

            [e.target.name]:
                e.target.value
        });
    };

    const register = async (e) => {

        e.preventDefault();

        try {

            await UserService.registerAgent(agent);

            Swal.fire(
                "Success",
                "Request Sent To Admin",
                "success"
            );

            navigate("/");

        } catch (error) {

            Swal.fire(
                "Error",
                "Registration Failed",
                "error"
            );
        }
    };

    return (

        <div className="container mt-5">

            <div className="card shadow p-4">

                <h3>

                    Agent Registration

                </h3>

                <form onSubmit={register}>

                    <input
                        className="form-control mb-3"
                        placeholder="Name"
                        name="name"
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Mobile"
                        name="mobile"
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="City"
                        name="assignedCity"
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        placeholder="Area"
                        name="assignedArea"
                        onChange={handleChange}
                    />

                    <button
                        className="btn btn-primary w-100"
                    >
                        Submit Request
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AgentRegisterPage;