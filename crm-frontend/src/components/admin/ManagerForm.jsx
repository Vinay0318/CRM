import React, { useState } from "react";
import UserService from "../../services/UserService";
import Swal from "sweetalert2";

import { locationMap } from "../../data/locationMap";

function ManagerForm({ loadManagers }) {

    const [loading, setLoading] = useState(false);

    const [manager, setManager] = useState({

        name: "",
        email: "",
        mobile: "",
        password: "",
        location: "",
        assignedCity: "",
        role: "MANAGER"

    });

    const handleChange = (e) => {

        setManager(prev => ({

            ...prev,

            [e.target.name]: e.target.value

        }));

    };

    const handleStateChange = (e) => {

        setManager(prev => ({

            ...prev,

            location: e.target.value,

            assignedCity: ""

        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const payload = {

                ...manager,

                name: manager.name.trim(),

                email: manager.email.trim(),

                mobile: manager.mobile.trim()

            };

            await UserService.addManager(payload);

            Swal.fire({

                icon: "success",

                title: "Success",

                text: "Manager Added Successfully",

                timer: 1500,

                showConfirmButton: false

            });

            setManager({

                name: "",

                email: "",

                mobile: "",

                password: "",

                location: "",

                assignedCity: "",

                role: "MANAGER"

            });

            if (loadManagers) {

                loadManagers();

            }

        }

        catch (error) {

            console.error(error);

            Swal.fire({

                icon: "error",

                title: "Error",

                text:

                    error.response?.data?.message ||

                    error.response?.data ||

                    "Unable to add manager."

            });

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="manager-form-card">

            <h4>Add Manager</h4>

            <form
                onSubmit={handleSubmit}
                autoComplete="off"
            >

                <div className="row">

                    {/* Name */}

                    <div className="col-md-6 mb-3">

                        <input

                            type="text"

                            name="name"

                            placeholder="Manager Name"

                            className="form-control"

                            value={manager.name}

                            onChange={handleChange}

                            required

                        />

                    </div>

                    {/* Email */}

                    <div className="col-md-6 mb-3">

                        <input

                            type="email"

                            name="email"

                            placeholder="Email Address"

                            className="form-control"

                            value={manager.email}

                            onChange={handleChange}

                            autoComplete="off"

                            required

                        />

                    </div>

                    {/* Mobile */}

                    <div className="col-md-6 mb-3">

                        <input

                            type="tel"

                            name="mobile"

                            placeholder="Mobile Number"

                            className="form-control"

                            value={manager.mobile}

                            onChange={handleChange}

                            maxLength={10}

                            pattern="[0-9]{10}"

                            required

                        />

                    </div>

                    {/* Password */}

                    <div className="col-md-6 mb-3">

                        <input

                            type="password"

                            name="password"

                            placeholder="Password"

                            className="form-control"

                            value={manager.password}

                            onChange={handleChange}

                            autoComplete="new-password"

                            minLength={6}

                            required

                        />

                    </div>

                    {/* State */}

                    <div className="col-md-6 mb-3">

                        <select

                            name="location"

                            className="form-select"

                            value={manager.location}

                            onChange={handleStateChange}

                            required

                        >

                            <option value="">

                                Select State

                            </option>

                            {

                                Object.keys(locationMap).map(state => (

                                    <option

                                        key={state}

                                        value={state}

                                    >

                                        {state}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                    {/* City */}

                    <div className="col-md-6 mb-3">

                        <select

                            name="assignedCity"

                            className="form-select"

                            value={manager.assignedCity}

                            onChange={handleChange}

                            disabled={!manager.location}

                            required

                        >

                            <option value="">

                                Select City

                            </option>

                            {

                                manager.location &&

                                locationMap[manager.location]?.map(city => (

                                    <option

                                        key={city}

                                        value={city}

                                    >

                                        {city}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                </div>

                <button

                    type="submit"

                    className="manager-btn"

                    disabled={loading}

                >

                    <i className="bi bi-person-plus-fill"></i>

                    <span>

                        {

                            loading

                                ? " Adding..."

                                : " Add Manager"

                        }

                    </span>

                </button>

            </form>

        </div>

    );

}

export default React.memo(ManagerForm);