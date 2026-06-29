import React from "react";

function RecentLeadsTable({

    leads = []

}) {

    return (

        <div className="chart-card">

            <div className="table-title">

                <i className="bi bi-file-earmark-text"></i>

                <h5>

                    Recent Leads

                </h5>

            </div>

            <div className="table-responsive">

                <table className="table table-hover align-middle">

                    <thead>

                        <tr>

                            <th>Name</th>

                            <th>Location</th>

                            <th>Status</th>

                            <th>Budget</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            leads.length === 0 ? (

                                <tr>

                                    <td

                                        colSpan="4"

                                        className="text-center py-4"

                                    >

                                        <span className="text-muted">

                                            No Leads Available

                                        </span>

                                    </td>

                                </tr>

                            ) : (

                                leads

                                    .slice(0, 5)

                                    .map((lead) => (

                                        <tr

                                            key={lead.leadid}

                                        >

                                            <td>

                                                {lead.name}

                                            </td>

                                            <td>

                                                {lead.location}

                                            </td>

                                            <td>

                                                <span

                                                    className={`badge
                                                    ${
                                                        lead.status === "NEW"
                                                            ? "bg-danger"
                                                            : lead.status === "CONTACTED"
                                                            ? "bg-primary"
                                                            : lead.status === "INTERESTED"
                                                            ? "bg-success"
                                                            : "bg-warning text-dark"
                                                    }`}

                                                >

                                                    {lead.status}

                                                </span>

                                            </td>

                                            <td>

                                                ₹{" "}

                                                {Number(

                                                    lead.budget || 0

                                                ).toLocaleString("en-IN")}

                                            </td>

                                        </tr>

                                    ))

                            )

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default React.memo(RecentLeadsTable);