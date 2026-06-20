import React from "react";

function DashboardStats({
    title,
    value,
    icon,
    bgClass
}) {

    return (

        <div className="col-lg-3 col-md-6 mb-4">

            <div className={`stats-card ${bgClass}`}>

                <div>

                    <p
                        style={{
                            marginBottom: "8px",
                            opacity: "0.9",
                            fontWeight: "500"
                        }}
                    >
                        {title}
                    </p>

                    <h2
                        style={{
                            fontWeight: "700",
                            marginBottom: "10px"
                        }}
                    >
                        {value}
                    </h2>

                    <small
                        style={{
                            opacity: "0.8"
                        }}
                    >
                        Updated Today
                    </small>

                </div>

                <div>

                    <div className="stats-icon">

                        {icon}

                    </div>

                </div>

            </div>

        </div>

    );
}

export default DashboardStats;