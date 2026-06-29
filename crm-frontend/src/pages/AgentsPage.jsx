import React, { useState } from "react";

import AdminLayout from "../components/admin/AdminLayout";
import AgentTable from "../components/admin/AgentTable";
import AgentForm from "../components/admin/AgentForm";

function AgentsPage() {

    const [showForm, setShowForm] = useState(false);

    const [reload, setReload] = useState(false);

    const handleClose = () => {

        setShowForm(false);

    };

    const handleReload = () => {

        setReload(prev => !prev);

        handleClose();

    };

    return (

        <AdminLayout>

            <section>

                {/* Header */}

                <div className="lead-page-header">

                    <div>

                        <h1 className="lead-page-title">

                            👨‍💻 Agents

                        </h1>

                        <p className="lead-page-subtitle">

                            Manage all approved agents

                        </p>

                    </div>

                    <button

                        className="manager-btn"

                        onClick={() => setShowForm(true)}

                    >

                        <i className="bi bi-person-plus-fill me-2"></i>

                        Add Agent

                    </button>

                </div>

                {/* Add Agent Modal */}

                {

                    showForm && (

                        <div className="form-modal">

                            <div className="form-modal-content">

                                <div className="d-flex justify-content-between align-items-center mb-4">

                                    <h3 className="mb-0">

                                        Add New Agent

                                    </h3>

                                    <button

                                        type="button"

                                        className="btn btn-outline-danger"

                                        onClick={handleClose}

                                    >

                                        <i className="bi bi-x-lg"></i>

                                    </button>

                                </div>

                                <AgentForm

                                    loadAgents={handleReload}

                                />

                            </div>

                        </div>

                    )

                }

                {/* Agent Table */}

                <div className="table-card">

                    <AgentTable key={reload} />

                </div>

            </section>

        </AdminLayout>

    );

}

export default React.memo(AgentsPage);