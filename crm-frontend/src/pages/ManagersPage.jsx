import React, {
    useState
} from "react";

import AdminLayout
from "../components/admin/AdminLayout";

import ManagerForm
from "../components/admin/ManagerForm";

import ManagerTable
from "../components/admin/ManagerTable";

function ManagersPage() {

    const [showForm,
        setShowForm] =
        useState(false);

    return (

        <AdminLayout>

<div className="lead-page-header">

<div>

    <h1 className="lead-page-title">
        👨‍💼 Managers
    </h1>

    <p className="lead-page-subtitle">
        Manage all managers and assigned cities
    </p>

</div>

<button
    className="add-btn"
    onClick={() => setShowForm(true)}
>
    + Add Manager
</button>

</div>

            {/* Popup Form */}

            {
                showForm && (

                    <div
                        className="form-modal"
                    >

                        <div
                            className="form-modal-content"
                        >

                            <div
                                style={{
                                    display:"flex",
                                    justifyContent:"space-between",
                                    alignItems:"center",
                                    marginBottom:"20px"
                                }}
                            >

                                <h3>
                                    Add Manager
                                </h3>

                                <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                        setShowForm(false)
                                    }
                                >
                                    X
                                </button>

                            </div>

                            <ManagerForm />

                        </div>

                    </div>

                )
            }

            <div className="table-card">

                <ManagerTable />

            </div>

        </AdminLayout>

    );
}

export default ManagersPage;