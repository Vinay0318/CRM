import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import LeadService from "../../services/LeadService";

import AdminLayout from "./AdminLayout";

import {
    Modal,
    Button
} from "react-bootstrap";

import "../../styles/viewPages.css";

function LeadsViewPage() {

    const [leads, setLeads] = useState([]);

    const [search, setSearch] = useState("");

    const [selectedLead, setSelectedLead] =
        useState(null);

    const [show, setShow] =
        useState(false);

    useEffect(() => {

        loadLeads();

    }, []);

    const loadLeads = async () => {

        try {

            const response =
                await LeadService.getAllLeads();

            setLeads(response.data);

        }

        catch (error) {

            console.error(
                "Unable to load leads",
                error
            );

        }

    };

    // Avatar Helper

    const getAvatar = (name) =>

        `https://ui-avatars.com/api/?name=${encodeURIComponent(
            name
        )}&background=f59e0b&color=ffffff&size=256`;

    // Optimized Search

    const filteredLeads = useMemo(() => {

        const keyword =
            search.toLowerCase();

        return leads.filter(lead =>

            lead.name
                ?.toLowerCase()
                .includes(keyword)

            ||

            lead.email
                ?.toLowerCase()
                .includes(keyword)

            ||

            lead.mobileNo
                ?.includes(search)

            ||

            lead.location
                ?.toLowerCase()
                .includes(keyword)

            ||

            lead.property_type
                ?.toLowerCase()
                .includes(keyword)

            ||

            lead.status
                ?.toLowerCase()
                .includes(keyword)

        );

    }, [leads, search]);

    return (

        <AdminLayout>

            <div className="view-page">

                {/* Header */}

                <div className="page-header">

                    <div>

                        <h1 className="page-title">

                            📋 Leads Overview

                        </h1>

                        <p className="page-subtitle">

                            Monitor all customer enquiries and leads

                        </p>

                    </div>

                    <div className="header-count">

                        {filteredLeads.length}

                        <span>

                            Leads

                        </span>

                    </div>

                </div>

                {/* Search */}

                <div className="search-wrapper">

                    <i className="bi bi-search search-icon"></i>

                    <input

                        type="text"

                        className="form-control search-box"

                        placeholder="Search by Name, Email, Mobile, City..."

                        value={search}

                        onChange={(e) =>

                            setSearch(e.target.value)

                        }

                    />

                </div>

                {/* Lead Cards Start */}

                <div className="row mt-4">
                    {
    filteredLeads.length > 0 ?

        filteredLeads.map((lead) => (

            <div
                className="col-lg-4 col-md-6 mb-4"
                key={lead.leadid}
            >

                <div className="manager-card h-100">

                    <div className="manager-banner"></div>

                    <div className="manager-avatar">

                        <img
                            src={getAvatar(lead.name)}
                            alt={lead.name}
                        />

                    </div>

                    <div className="manager-content">

                        <h4>

                            {lead.name}

                        </h4>

                        <div className="city-badge">

                            {lead.location}

                        </div>

                        <p>

                            {lead.email}

                        </p>

                        <div className="status-badge">

                            {lead.status}

                        </div>

                        <button

                            type="button"

                            className="view-btn mt-4"

                            onClick={() => {

                                setSelectedLead(lead);

                                setShow(true);

                            }}

                        >

                            <i className="bi bi-eye me-2"></i>

                            View Details

                        </button>

                    </div>

                </div>

            </div>

        ))

        :

        <div className="col-12">

            <div
                className="text-center py-5"
            >

                <i
                    className="bi bi-search"
                    style={{
                        fontSize: "50px",
                        color: "#bdbdbd"
                    }}
                ></i>

                <h4
                    className="mt-3 text-secondary"
                >

                    No Leads Found

                </h4>

                <p
                    className="text-muted"
                >

                    No leads match your search.

                </p>

            </div>

        </div>

}
</div>
</div>

{/* Lead Details Modal */}

<Modal

    show={show}

    centered

    size="lg"

    onHide={() => setShow(false)}

>

        <Modal.Header closeButton>

        <Modal.Title>

            📋 Lead Details

        </Modal.Title>

    </Modal.Header>

    <Modal.Body>

        {

            selectedLead && (

                <>

                    <div className="text-center mb-4">

                        <img

                            src={getAvatar(selectedLead.name)}

                            alt={selectedLead.name}

                            style={{

                                width: "110px",

                                height: "110px",

                                borderRadius: "50%",

                                border: "4px solid #f59e0b",

                                objectFit: "cover"

                            }}

                        />

                    </div>

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <strong>Name</strong>

                            <p>{selectedLead.name}</p>

                        </div>

                        <div className="col-md-6 mb-3">

                            <strong>Email</strong>

                            <p>{selectedLead.email}</p>

                        </div>

                        <div className="col-md-6 mb-3">

                            <strong>Mobile</strong>

                            <p>{selectedLead.mobileNo}</p>

                        </div>

                        <div className="col-md-6 mb-3">

                            <strong>Location</strong>

                            <p>{selectedLead.location}</p>

                        </div>

                        <div className="col-md-6 mb-3">

                            <strong>Property Type</strong>

                            <p>{selectedLead.property_type}</p>

                        </div>

                        <div className="col-md-6 mb-3">

                            <strong>Budget</strong>

                            <p>

                                ₹{" "}

                                {Number(

                                    selectedLead.budget || 0

                                ).toLocaleString("en-IN")}

                            </p>

                        </div>

                        <div className="col-md-6 mb-3">

                            <strong>Status</strong>

                            <p>

                                <span className="badge bg-primary">

                                    {selectedLead.status}

                                </span>

                            </p>

                        </div>

                        <div className="col-md-6 mb-3">

                            <strong>Assigned Agent</strong>

                            <p>

                                {

                                    selectedLead.assignedAgentName ||

                                    "Not Assigned"

                                }

                            </p>

                        </div>

                        <div className="col-12">

                            <strong>

                                Additional Requirement

                            </strong>

                            <div
                                className="border rounded p-3 mt-2 bg-light"
                            >

                                {

                                    selectedLead.Additional_requirement ||

                                    "No additional requirement provided."

                                }

                            </div>

                        </div>

                    </div>

                </>

            )

        }

    </Modal.Body>

    <Modal.Footer>

        <Button

            variant="dark"

            onClick={() => setShow(false)}

        >

            Close

        </Button>

    </Modal.Footer>

</Modal>

</AdminLayout>

);

}

export default React.memo(LeadsViewPage);


