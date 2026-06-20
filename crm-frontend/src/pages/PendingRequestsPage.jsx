import React from "react";

import AdminLayout
from "../components/admin/AdminLayout";

import PendingRequestsTable
from "../components/admin/PendingRequestsTable";

function PendingRequestsPage() {

    return (

        <AdminLayout>

<div className="page-header-modern">

<div className="header-info">

    <div className="header-icon-box">

        <i className="bi bi-clock-history"></i>

    </div>

    <div>

        <h1 className="page-title-modern">
            Pending Requests
        </h1>

        <p className="page-subtitle-modern">
            Review and approve agent registrations
        </p>

    </div>

</div>

</div>

            <PendingRequestsTable />

        </AdminLayout>

    );
}

export default PendingRequestsPage;