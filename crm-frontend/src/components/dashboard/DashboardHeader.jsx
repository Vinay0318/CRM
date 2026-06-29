import React from "react";

function DashboardHeader({

    title,

    subtitle,

    icon

}) {

    const managerName =
        localStorage.getItem("name") || "Manager";

    const assignedCity =
        localStorage.getItem("assignedCity") || "-";

    return (

        <div className="lead-page-header dashboard-header">

            <div>

                <h2>

                    {icon} {title}

                </h2>

                <p>

                    {subtitle}

                </p>

                <small
                    style={{
                        color: "#64748b",
                        fontSize: "14px"
                    }}
                >

                    Welcome back,
                    <strong>
                        {" "}
                        {managerName}
                    </strong>

                </small>

            </div>

            <div className="city-badge">

                📍 {assignedCity}

            </div>

        </div>

    );

}

export default React.memo(DashboardHeader);