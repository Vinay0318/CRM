import React from "react";

function LeadCard({ lead, onSelect }) {

    if (!lead) return null;

    const getBadgeClass = (status) => {

        switch (status) {

            case "NEW":
                return "bg-danger";

            case "CONTACTED":
                return "bg-primary";

            case "INTERESTED":
                return "bg-warning text-dark";

            case "BOOKING":
                return "bg-success";

            default:
                return "bg-secondary";
        }

    };

    return (

        <div
            className="lead-card"
            onClick={() => onSelect(lead)}
            role="button"
            tabIndex={0}
            style={{ cursor: "pointer" }}
        >

            <div>

                <h6 className="mb-1">

                    {lead.name || "N/A"}

                </h6>

                <small className="text-muted">

                    📍 {lead.location || "Not Available"}

                </small>

                <br />

                <small className="text-success fw-bold">

                    ₹{" "}

                    {Number(lead.budget || 0).toLocaleString("en-IN")}

                </small>

            </div>

            <div>

                <span
                    className={`badge ${getBadgeClass(lead.status)}`}
                >

                    {lead.status || "UNKNOWN"}

                </span>

            </div>

        </div>

    );

}

export default React.memo(LeadCard);