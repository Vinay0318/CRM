import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import LeadService from "../../services/LeadService";

function LeadDetails({ lead, refreshLeads }) {

    const [status, setStatus] = useState("");

    useEffect(() => {

        if (lead) {
            setStatus(lead.status);
        }

    }, [lead]);

    if (!lead) {

        return (

            <div className="details-card">

                <h3>Select Lead</h3>

            </div>

        );
    }

    const updateStatus = async () => {

        try {

            const leadId =
                lead.Leadid ||
                lead.leadid;

            const updatedLead = {
                ...lead,
                status: status
            };

            console.log(
                "Updating Lead:",
                leadId
            );

            await LeadService.updateLead(
                leadId,
                updatedLead
            );

            toast.success(
                "Lead Status Updated"
            );

            refreshLeads();

        } catch (error) {

            console.log(error);

            toast.error(
                "Update Failed"
            );
        }
    };

    return (

        <div className="details-card">

            <h2 className="text-primary mb-4">
                Lead Details
            </h2>

            <hr />

            <p>
                <strong>Name:</strong>
                {" "}
                {lead.name}
            </p>

            <p>
                <strong>Email:</strong>
                {" "}
                {lead.email}
            </p>

            <p>
                <strong>Mobile:</strong>
                {" "}
                {lead.mobile_no}
            </p>

            <p>
                <strong>Location:</strong>
                {" "}
                {lead.location}
            </p>

            <p>
                <strong>Property Type:</strong>
                {" "}
                {lead.property_type}
            </p>

            <p>
                <strong>Budget:</strong>
                {" "}
                ₹ {lead.budget}
            </p>

            <p>
                <strong>Requirement:</strong>
                {" "}
                {lead.Additional_requirement}
            </p>

            <hr />

            <label className="form-label fw-bold">
                Lead Status
            </label>

            <select
                className="form-select mb-3"
                value={status}
                onChange={(e) =>
                    setStatus(
                        e.target.value
                    )
                }
            >

                <option value="NEW">
                    NEW
                </option>

                <option value="CONTACTED">
                    CONTACTED
                </option>

                <option value="INTERESTED">
                    INTERESTED
                </option>

                <option value="BOOKING">
                    BOOKING
                </option>

            </select>

            <button
                className="btn btn-success"
                onClick={updateStatus}
            >

                Update Status

            </button>

        </div>

    );
}

export default LeadDetails;