import React, { useState } from "react";
import Swal from "sweetalert2";

import LeadService from "../../services/LeadService";

function EnquiryForm() {

    const [formData, setFormData] = useState({

        name: "",
        email: "",
        mobileNo: "",
        location: "",
        property_type: "",
        budget: "",
        Additional_requirement: ""

    });

    const [errors, setErrors] = useState({});

    const [serverError, setServerError] = useState("");

    const [loading, setLoading] = useState(false);

    // =============================
    // Handle Input Change
    // =============================

    const handleChange = (e) => {

        let { name, value } = e.target;

        if (name === "name") {

            value = value.replace(/[^a-zA-Z\s]/g, "");

        }

        if (name === "mobileNo") {

            value = value.replace(/\D/g, "").slice(0, 10);

        }

        setFormData((prev) => ({

            ...prev,

            [name]: value

        }));

        setErrors((prev) => ({

            ...prev,

            [name]: ""

        }));

        setServerError("");

    };

    // =============================
    // Validation
    // =============================

    const validate = () => {

        const temp = {};

        if (!formData.name.trim()) {

            temp.name = "Name is required";

        }

        if (!formData.email.trim()) {

            temp.email = "Email is required";

        }

        else if (

            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)

        ) {

            temp.email = "Invalid Email Address";

        }

        if (!formData.mobileNo.trim()) {

            temp.mobileNo = "Mobile Number is required";

        }

        else if (

            !/^[0-9]{10}$/.test(formData.mobileNo)

        ) {

            temp.mobileNo = "Enter Valid 10 Digit Mobile Number";

        }

        if (!formData.location.trim()) {

            temp.location = "Location is required";

        }

        if (!formData.property_type) {

            temp.property_type = "Property Type is required";

        }

        if (!formData.budget) {

            temp.budget = "Budget is required";

        }

        setErrors(temp);

        return Object.keys(temp).length === 0;

    };

    // =============================
    // Submit Form
    // =============================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setServerError("");

        if (!validate()) {

            return;

        }

        try {

            setLoading(true);

            const payload = {

                ...formData,

                name: formData.name.trim(),

                email: formData.email.trim(),

                location: formData.location.trim(),

                Additional_requirement:
                    formData.Additional_requirement.trim()

            };

            await LeadService.addLead(payload);

            Swal.fire({

                icon: "success",

                title: "Enquiry Submitted",

                text: "Our Team Will Contact You Soon",

                confirmButtonColor: "#0d6efd"

            });

            setFormData({

                name: "",

                email: "",

                mobileNo: "",

                location: "",

                property_type: "",

                budget: "",

                Additional_requirement: ""

            });

            setErrors({});

        }

        catch (error) {

            if (error.response) {

                const message = error.response.data;

                if (message.includes("Email")) {

                    setErrors((prev) => ({

                        ...prev,

                        email: message

                    }));

                }

                else if (message.includes("Mobile")) {

                    setErrors((prev) => ({

                        ...prev,

                        mobileNo: message

                    }));

                }

                else {

                    setServerError(message);

                }

            }

            else {

                setServerError(

                    "Something went wrong. Please try again."

                );

            }

        }

        finally {

            setLoading(false);

        }

    };
        return (

        <div className="card enquiry-card">

            <div className="card-body">

                <form onSubmit={handleSubmit} noValidate>

                    <div className="row">

                        {/* Name */}

                        <div className="col-md-6 mb-3">

                            <label className="form-label">

                                Name

                            </label>

                            <input

                                type="text"

                                name="name"

                                className={
                                    errors.name
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }

                                placeholder="Enter Full Name"

                                value={formData.name}

                                onChange={handleChange}

                                maxLength={50}

                                required

                            />

                            <div className="invalid-feedback">

                                {errors.name}

                            </div>

                        </div>

                        {/* Email */}

                        <div className="col-md-6 mb-3">

                            <label className="form-label">

                                Email

                            </label>

                            <input

                                type="email"

                                name="email"

                                className={
                                    errors.email
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }

                                placeholder="Enter Email"

                                value={formData.email}

                                onChange={handleChange}

                                required

                            />

                            <div className="invalid-feedback">

                                {errors.email}

                            </div>

                        </div>

                        {/* Mobile */}

                        <div className="col-md-6 mb-3">

                            <label className="form-label">

                                Mobile Number

                            </label>

                            <input

                                type="text"

                                name="mobileNo"

                                className={
                                    errors.mobileNo
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }

                                placeholder="Enter Mobile Number"

                                value={formData.mobileNo}

                                onChange={handleChange}

                                maxLength={10}

                                required

                            />

                            <div className="invalid-feedback">

                                {errors.mobileNo}

                            </div>

                        </div>

                        {/* Location */}

                        <div className="col-md-6 mb-3">

                            <label className="form-label">

                                Location

                            </label>

                            <input

                                type="text"

                                name="location"

                                className={
                                    errors.location
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }

                                placeholder="Preferred Location"

                                value={formData.location}

                                onChange={handleChange}

                                required

                            />

                            <div className="invalid-feedback">

                                {errors.location}

                            </div>

                        </div>

                        {/* Property Type */}

                        <div className="col-md-6 mb-3">

                            <label className="form-label">

                                Property Type

                            </label>

                            <select

                                name="property_type"

                                className={
                                    errors.property_type
                                        ? "form-select is-invalid"
                                        : "form-select"
                                }

                                value={formData.property_type}

                                onChange={handleChange}

                                required

                            >

                                <option value="">

                                    Select Property Type

                                </option>

                                <option value="1 BHK">1 BHK</option>

                                <option value="2 BHK">2 BHK</option>

                                <option value="3 BHK">3 BHK</option>

                                <option value="Villa">Villa</option>

                                <option value="Plot">Plot</option>

                            </select>

                            <div className="invalid-feedback">

                                {errors.property_type}

                            </div>

                        </div>

                        {/* Budget */}

                        <div className="col-md-6 mb-3">

                            <label className="form-label">

                                Budget

                            </label>

                            <input

                                type="number"

                                name="budget"

                                className={
                                    errors.budget
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }

                                placeholder="Enter Budget"

                                value={formData.budget}

                                onChange={handleChange}

                                min="100000"

                                required

                            />

                            <div className="invalid-feedback">

                                {errors.budget}

                            </div>

                        </div>

                        {/* Additional Requirement */}

                        <div className="col-md-12 mb-3">

                            <label className="form-label">

                                Additional Requirement

                            </label>

                            <textarea

                                rows="4"

                                name="Additional_requirement"

                                className="form-control"

                                placeholder="Enter any additional requirements"

                                value={formData.Additional_requirement}

                                onChange={handleChange}

                            />

                        </div>

                    </div>

                    {

                        serverError && (

                            <div className="alert alert-danger">

                                {serverError}

                            </div>

                        )

                    }

                    <button

                        type="submit"

                        className="btn-submit"

                        disabled={loading}

                    >

                        {

                            loading

                                ? (

                                    <>

                                        <span

                                            className="spinner-border spinner-border-sm me-2"

                                            role="status"

                                        ></span>

                                        Submitting...

                                    </>

                                )

                                : (

                                    "Submit Enquiry"

                                )

                        }

                    </button>

                </form>

            </div>

        </div>

    );

}

export default EnquiryForm;