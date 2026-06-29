import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import Swal from "sweetalert2";

import PropertyService from "../../services/PropertyService";

function PropertyTable() {

    const [properties, setProperties] = useState([]);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadProperties();

    }, []);

    // =============================
    // Load Properties
    // =============================

    const loadProperties = async () => {

        try {

            setLoading(true);

            const response =
                await PropertyService.getAllProperties();

            setProperties(response.data);

        }

        catch (error) {

            console.error(error);

            Swal.fire({

                icon: "error",

                title: "Error",

                text: "Unable to load properties."

            });

        }

        finally {

            setLoading(false);

        }

    };

    // =============================
    // Delete Property
    // =============================

    const deleteProperty = (id) => {

        Swal.fire({

            title: "Delete Property?",

            text: "This action cannot be undone.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#dc3545",

            confirmButtonText: "Yes, Delete",

            cancelButtonText: "Cancel"

        }).then(async (result) => {

            if (!result.isConfirmed) return;

            try {

                await PropertyService.deleteProperty(id);

                Swal.fire({

                    icon: "success",

                    title: "Deleted",

                    text: "Property removed successfully."

                });

                loadProperties();

            }

            catch (error) {

                Swal.fire({

                    icon: "error",

                    title: "Delete Failed",

                    text:

                        error.response?.data ||

                        "Unable to delete property."

                });

            }

        });

    };

    // =============================
    // View Property
    // =============================

    const viewProperty = (property) => {

        Swal.fire({

            title: property.name,

            width: 700,

            html: `

                <div style="text-align:left">

                    <p><b>Type :</b> ${property.type}</p>

                    <p><b>Price :</b> ₹ ${Number(property.price).toLocaleString("en-IN")}</p>

                    <p><b>Location :</b> ${property.location}</p>

                    <p><b>Area :</b> ${property.areaSqft} Sq Ft</p>

                    <p><b>Builder :</b> ${property.builderName || "-"}</p>

                    <p><b>Status :</b> ${property.propertyStatus}</p>

                    <p><b>Description :</b> ${property.description || "-"}</p>

                </div>

            `

        });

    };

    // =============================
    // View Image
    // =============================

    const viewImage = (property) => {

        if (!property.imageUrl) {

            Swal.fire({

                icon: "info",

                title: "No Image Found"

            });

            return;

        }

        Swal.fire({

            title: property.name,

            imageUrl:

                property.imageUrl ||

                process.env.REACT_APP_DEFAULT_PROPERTY_IMAGE,

            imageWidth: 700,

            imageHeight: 400,

            imageAlt: "Property",

            showCloseButton: true

        });

    };

    // =============================
    // Open Google Map
    // =============================

    const openMap = (property) => {

        if (

            property.latitude &&

            property.longitude

        ) {

            window.open(

                `https://www.google.com/maps?q=${property.latitude},${property.longitude}`,

                "_blank"

            );

        }

        else {

            Swal.fire({

                icon: "warning",

                title: "Location Not Available"

            });

        }

    };

    // =============================
    // Update Status
    // =============================

    const updatePropertyStatus = async (

        propertyId,

        status

    ) => {

        try {

            await PropertyService.updatePropertyStatus(

                propertyId,

                status

            );

            Swal.fire({

                icon: "success",

                title: "Updated",

                text: "Property status updated."

            });

            loadProperties();

        }

        catch (error) {

            Swal.fire({

                icon: "error",

                title: "Update Failed",

                text:

                    error.response?.data ||

                    "Unable to update property status."

            });

        }

    };
        // =============================
    // Search Filter
    // =============================

    const filteredProperties = useMemo(() => {

        const txt = search.toLowerCase();

        return properties.filter((property) =>

            property.name?.toLowerCase().includes(txt)

            ||

            property.location?.toLowerCase().includes(txt)

            ||

            property.builderName?.toLowerCase().includes(txt)

            ||

            property.type?.toLowerCase().includes(txt)

            ||

            property.propertyStatus?.toLowerCase().includes(txt)

        );

    }, [properties, search]);

    // =============================
    // Dashboard Stats
    // =============================

    const totalCount = filteredProperties.length;

    const availableCount =
        filteredProperties.filter(
            p => p.propertyStatus === "AVAILABLE"
        ).length;

    const bookedCount =
        filteredProperties.filter(
            p => p.propertyStatus === "BOOKED"
        ).length;

    const soldCount =
        filteredProperties.filter(
            p => p.propertyStatus === "SOLD"
        ).length;

    const underConstructionCount =
        filteredProperties.filter(
            p =>
                p.propertyStatus ===
                "UNDER_CONSTRUCTION"
        ).length;

    // =============================
    // Loading
    // =============================

    if (loading) {

        return (

            <div
                className="text-center py-5"
            >

                <div
                    className="spinner-border text-primary"
                ></div>

                <h5 className="mt-3">

                    Loading Properties...

                </h5>

            </div>

        );

    }

    return (

        <div className="property-table-card">

            {/* Dashboard Cards */}

            <div className="property-stats-row">

                <div className="property-stat-card">

                    <div className="stat-icon purple">

                        <i className="bi bi-grid"></i>

                    </div>

                    <div>

                        <h6>Total</h6>

                        <h3>{totalCount}</h3>

                    </div>

                </div>

                <div className="property-stat-card">

                    <div className="stat-icon green">

                        <i className="bi bi-check-lg"></i>

                    </div>

                    <div>

                        <h6>Available</h6>

                        <h3>{availableCount}</h3>

                    </div>

                </div>

                <div className="property-stat-card">

                    <div className="stat-icon orange">

                        <i className="bi bi-bookmark"></i>

                    </div>

                    <div>

                        <h6>Booked</h6>

                        <h3>{bookedCount}</h3>

                    </div>

                </div>

                <div className="property-stat-card">

                    <div className="stat-icon red">

                        <i className="bi bi-cart"></i>

                    </div>

                    <div>

                        <h6>Sold</h6>

                        <h3>{soldCount}</h3>

                    </div>

                </div>

                <div className="property-stat-card">

                    <div className="stat-icon dark">

                        <i className="bi bi-hammer"></i>

                    </div>

                    <div>

                        <h6>Under Construction</h6>

                        <h3>{underConstructionCount}</h3>

                    </div>

                </div>

            </div>

            {/* Search */}

            <div className="table-header">

                <h4>

                    Properties ({filteredProperties.length})

                </h4>

                <input

                    type="text"

                    className="form-control property-search"

                    placeholder="Search Property..."

                    value={search}

                    onChange={(e) =>

                        setSearch(e.target.value)

                    }

                />

            </div>

            {/* Table */}

            <div className="table-responsive">

                <table className="table property-table">

                    <thead>

                        <tr>

                            <th>Name</th>

                            <th>Type</th>

                            <th>Price</th>

                            <th>Location</th>

                            <th>Status</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>


                    {filteredProperties.length > 0 ? (

    filteredProperties.map((property) => (

        <tr key={property.propertyId}>

            <td>{property.name}</td>

            <td>{property.type}</td>

            <td>

                ₹ {Number(property.price).toLocaleString("en-IN")}

            </td>

            <td>{property.location}</td>

            <td>

                <div className="status-wrapper">

                    <span
                        className={`status-pill
                        ${
                            property.propertyStatus === "AVAILABLE"
                                ? "available"
                                : property.propertyStatus === "BOOKED"
                                ? "booked"
                                : property.propertyStatus === "SOLD"
                                ? "sold"
                                : "construction"
                        }`}
                    >

                        {property.propertyStatus}

                    </span>

                    <select
                        className="status-select"
                        value={property.propertyStatus}
                        onChange={(e) =>
                            updatePropertyStatus(
                                property.propertyId,
                                e.target.value
                            )
                        }
                    >

                        <option value="AVAILABLE">
                            AVAILABLE
                        </option>

                        <option value="BOOKED">
                            BOOKED
                        </option>

                        <option value="SOLD">
                            SOLD
                        </option>

                        <option value="UNDER_CONSTRUCTION">
                            UNDER CONSTRUCTION
                        </option>

                    </select>

                </div>

            </td>

            <td>

                {/* View */}

                <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() =>
                        viewProperty(property)
                    }
                    title="View Property"
                >

                    <i className="bi bi-eye"></i>

                </button>

                {/* Image */}

                <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() =>
                        viewImage(property)
                    }
                    title="View Image"
                >

                    <i className="bi bi-image"></i>

                </button>

                {/* Edit */}

                <button
                    className="btn btn-warning btn-sm me-2"
                    title="Edit Property"
                >

                    <i className="bi bi-pencil-square"></i>

                </button>

                {/* Google Map */}

                <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() =>
                        openMap(property)
                    }
                    title="Open Location"
                >

                    <i className="bi bi-geo-alt-fill"></i>

                </button>

                {/* Delete */}

                <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                        deleteProperty(
                            property.propertyId
                        )
                    }
                    title="Delete Property"
                >

                    <i className="bi bi-trash"></i>

                </button>

            </td>

        </tr>

    ))

) : (

    <tr>

        <td
            colSpan="6"
            className="text-center py-4"
        >

            <h5 className="text-muted">

                No Properties Found

            </h5>

        </td>

    </tr>

)}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default React.memo(PropertyTable);