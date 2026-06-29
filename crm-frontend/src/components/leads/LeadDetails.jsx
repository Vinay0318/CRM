import React, {
    useEffect,
    useState
} from "react";

import Swal from "sweetalert2";
import { toast } from "react-toastify";

import UserService from "../../services/UserService";
import LeadService from "../../services/LeadService";
import PropertyService from "../../services/PropertyService";

function LeadDetails({

    lead,
    refreshLeads,
    clearLead,
    mode

}) {

    const [agents, setAgents] = useState([]);

    const [properties, setProperties] = useState([]);

    const [selectedAgent, setSelectedAgent] =
        useState("");

    const [selectedProperty, setSelectedProperty] =
        useState("");

    const [status, setStatus] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    // ==========================
    // Load Agents
    // ==========================

    useEffect(() => {

        loadAgents();

    }, []);

    const loadAgents = async () => {

        try {

            const managerId =
                localStorage.getItem("userId");

            const response =
                await UserService.getAgentsByManager(
                    managerId
                );

            setAgents(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    // ==========================
    // Load Properties
    // ==========================

    useEffect(() => {

        if (selectedAgent && lead) {

            loadAvailableProperties();

        }

    }, [

        selectedAgent,

        lead

    ]);

    const loadAvailableProperties =
        async () => {

            try {

                const response =
                    await PropertyService.getByLocation(
                        lead.location
                    );

                const availableProperties =
                    response.data.filter(

                        property =>

                            property.propertyStatus ===

                            "AVAILABLE"

                    );

                setProperties(

                    availableProperties

                );

            }

            catch (error) {

                console.error(error);

            }

        };

    // ==========================
    // Selected Lead
    // ==========================

    useEffect(() => {

        if (!lead) return;

        setStatus(

            lead.status

        );

        setSelectedAgent(

            lead.assignedAgentId || ""

        );

        setSelectedProperty("");

    }, [

        lead

    ]);

    if (!lead) {

        return (

            <div className="details-card empty-details">

                <div className="text-center">

                    <i className="bi bi-person-lines-fill empty-icon"></i>

                    <h3>

                        Select a Lead

                    </h3>

                    <p>

                        Click any lead from the left panel
                        to view complete details.

                    </p>

                </div>

            </div>

        );

    }

    // ==========================
    // Assign Lead
    // ==========================

    const assignLead = async () => {

        if (!selectedAgent) {

            toast.error(

                "Please Select Agent"

            );

            return;

        }

        if (!selectedProperty) {

            toast.error(

                "Please Select Property"

            );

            return;

        }

        const agent =

            agents.find(

                a =>

                    a.userId ===

                    selectedAgent

            );

        try {

            setLoading(true);

            await PropertyService.assignProperty({

                agentId:
                    selectedAgent,

                propertyId:
                    selectedProperty

            });

            const updatedLead = {

                ...lead,

                assignedAgentId:
                    agent.userId,

                assignedAgentName:
                    agent.name,

                assignedArea:
                    agent.assignedArea,

                status:
                    "CONTACTED"

            };

            await LeadService.updateLead(

                lead.leadid,

                updatedLead

            );

            toast.success(

                "Lead Assigned Successfully"

            );

            refreshLeads();

            clearLead?.();

        }

        catch (error) {

            console.error(error);

            toast.error(

                "Assignment Failed"

            );

        }

        finally {

            setLoading(false);

        }

    };

        // ==========================
    // Update Lead Status
    // ==========================

    const updateStatus = async (newStatus) => {

        try {

            setLoading(true);

            const updatedLead = {

                ...lead,

                status: newStatus

            };

            await LeadService.updateLead(

                lead.leadid,

                updatedLead

            );

            setStatus(newStatus);

            toast.success(

                `Lead marked as ${newStatus}`

            );

            refreshLeads();

        }

        catch (error) {

            console.error(error);

            toast.error(

                "Unable to update lead status."

            );

        }

        finally {

            setLoading(false);

        }

    };

    // ==========================
    // Delete Lead
    // ==========================

    const deleteLead = async () => {

        const result = await Swal.fire({

            title: "Delete Lead?",

            text: "This action cannot be undone.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#dc3545",

            cancelButtonColor: "#6c757d",

            confirmButtonText: "Delete"

        });

        if (!result.isConfirmed) {

            return;

        }

        try {

            setLoading(true);

            await LeadService.deleteLead(

                lead.leadid

            );

            toast.success(

                "Lead deleted successfully."

            );

            refreshLeads();

            clearLead?.();

        }

        catch (error) {

            console.error(error);

            toast.error(

                "Unable to delete lead."

            );

        }

        finally {

            setLoading(false);

        }

    };

    // ==========================
    // JSX
    // ==========================

    return (

        <div className="details-card">

            <div className="details-header">

                <div className="lead-profile">

                    <img

                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            lead.name
                        )}&background=0d6efd&color=fff&size=256`}

                        alt={lead.name}

                        className="lead-avatar"

                    />

                    <div>

                        <h3>

                            {lead.name}

                        </h3>

                        <p>

                            {lead.email}

                        </p>

                    </div>

                </div>

                <span

                    className={`badge ${

                        status === "NEW"

                            ? "bg-danger"

                            : status === "CONTACTED"

                            ? "bg-primary"

                            : status === "INTERESTED"

                            ? "bg-warning text-dark"

                            : status === "BOOKING"

                            ? "bg-success"

                            : "bg-secondary"

                    }`}

                >

                    {status}

                </span>

            </div>

            <div className="details-body">

                <div className="row">

                    <div className="col-md-6 mb-3">

                        <strong>

                            Mobile

                        </strong>

                        <p>

                            {lead.mobileNo}

                        </p>

                    </div>

                    <div className="col-md-6 mb-3">

                        <strong>

                            Location

                        </strong>

                        <p>

                            {lead.location}

                        </p>

                    </div>

                    <div className="col-md-6 mb-3">

                        <strong>

                            Property Type

                        </strong>

                        <p>

                            {lead.property_type}

                        </p>

                    </div>

                    <div className="col-md-6 mb-3">

                        <strong>

                            Budget

                        </strong>

                        <p>

                            ₹{" "}

                            {Number(

                                lead.budget || 0

                            ).toLocaleString("en-IN")}

                        </p>

                    </div>

                    <div className="col-12 mb-4">

                        <strong>

                            Additional Requirement

                        </strong>

                        <p>

                            {

                                lead.Additional_requirement ||

                                "No additional requirement."

                            }

                        </p>

                    </div>

                                        {/* ========================= */}
                    {/* Agent Selection */}
                    {/* ========================= */}

                    {

                        mode === "new" && (

                            <>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label fw-bold">

                                        Assign Agent

                                    </label>

                                    <select

                                        className="form-select"

                                        value={selectedAgent}

                                        onChange={(e) =>
                                            setSelectedAgent(
                                                e.target.value
                                            )
                                        }

                                    >

                                        <option value="">

                                            Select Agent

                                        </option>

                                        {

                                            agents.map((agent) => (

                                                <option

                                                    key={agent.userId}

                                                    value={agent.userId}

                                                >

                                                    {agent.name} ({agent.assignedArea})

                                                </option>

                                            ))

                                        }

                                    </select>

                                </div>

                                <div className="col-md-6 mb-4">

                                    <label className="form-label fw-bold">

                                        Assign Property

                                    </label>

                                    <select

                                        className="form-select"

                                        value={selectedProperty}

                                        onChange={(e) =>
                                            setSelectedProperty(
                                                e.target.value
                                            )
                                        }

                                    >

                                        <option value="">

                                            Select Property

                                        </option>

                                        {

                                            properties.map((property) => (

                                                <option

                                                    key={property.propertyId}

                                                    value={property.propertyId}

                                                >

                                                    {property.propertyName}
                                                    {" | "}
                                                    {property.location}
                                                    {" | "}
                                                    ₹
                                                    {Number(
                                                        property.price
                                                    ).toLocaleString("en-IN")}

                                                </option>

                                            ))

                                        }

                                    </select>

                                </div>

                            </>

                        )

                    }

                    {/* ========================= */}
                    {/* Assigned Information */}
                    {/* ========================= */}

                    {

                        lead.assignedAgentName && (

                            <div className="col-12 mb-4">

                                <div className="alert alert-info">

                                    <strong>

                                        Assigned Agent :

                                    </strong>

                                    {" "}

                                    {lead.assignedAgentName}

                                    {

                                        lead.assignedArea && (

                                            <>

                                                {" "}

                                                (

                                                {lead.assignedArea}

                                                )

                                            </>

                                        )

                                    }

                                </div>

                            </div>

                        )

                    }

                </div>

                {/* ========================= */}
                {/* Buttons */}
                {/* ========================= */}

                <div className="d-flex flex-wrap gap-2 mt-3">

                    {

                        mode === "new" && (

                            <button

                                className="btn btn-primary"

                                onClick={assignLead}

                                disabled={loading}

                            >

                                {

                                    loading

                                        ? (

                                            <>

                                                <span

                                                    className="spinner-border spinner-border-sm me-2"

                                                ></span>

                                                Assigning...

                                            </>

                                        )

                                        : (

                                            "Assign Lead"

                                        )

                                }

                            </button>

                        )

                    }

                    {

                        mode === "assigned" && (

                            <>

                                <button

                                    className="btn btn-success"

                                    disabled={loading}

                                    onClick={() =>
                                        updateStatus(
                                            "INTERESTED"
                                        )
                                    }

                                >

                                    Interested

                                </button>

                                <button

                                    className="btn btn-warning"

                                    disabled={loading}

                                    onClick={() =>
                                        updateStatus(
                                            "BOOKING"
                                        )
                                    }

                                >

                                    Booking

                                </button>

                                <button

                                    className="btn btn-secondary"

                                    disabled={loading}

                                    onClick={() =>
                                        updateStatus(
                                            "CONTACTED"
                                        )
                                    }

                                >

                                    Contacted

                                </button>

                            </>

                        )

                    }

                    <button

                        className="btn btn-danger ms-auto"

                        disabled={loading}

                        onClick={deleteLead}

                    >

                        <i className="bi bi-trash me-2"></i>

                        Delete Lead

                    </button>

                </div>

            </div>

        </div>

            );

}

export default React.memo(LeadDetails);