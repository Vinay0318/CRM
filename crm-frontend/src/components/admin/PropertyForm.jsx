import React, {
    useState
} from "react";

import PropertyService
from "../../services/PropertyService";

import Swal
from "sweetalert2";

function PropertyForm({ loadProperties }) {

    const [loading,
        setLoading] =
        useState(false);

    const [property,
        setProperty] =
        useState({

            name: "",

            price: "",

            type: "APARTMENT",

            location: "",

            areaSqft: "",

            builderName: "",

            imageUrl: "",

            propertyStatus: "AVAILABLE",

            description: "",

            latitude: "",

            longitude: ""

        });

    // ===========================
    // Handle Input Change
    // ===========================

    const handleChange = (e) => {

        setProperty(prev => ({

            ...prev,

            [e.target.name]:
                e.target.value

        }));

    };

    // ===========================
    // Submit Property
    // ===========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const payload = {

                ...property,

                name:
                    property.name.trim(),

                location:
                    property.location.trim(),

                builderName:
                    property.builderName.trim(),

                imageUrl:
                    property.imageUrl.trim(),

                description:
                    property.description.trim()

            };

            await PropertyService.addProperty(
                payload
            );

            Swal.fire({

                icon: "success",

                title: "Success",

                text:
                    "Property Added Successfully",

                timer: 1500,

                showConfirmButton: false

            });

            setProperty({

                name: "",

                price: "",

                type: "APARTMENT",

                location: "",

                areaSqft: "",

                builderName: "",

                imageUrl: "",

                propertyStatus: "AVAILABLE",

                description: "",

                latitude: "",

                longitude: ""

            });

            if (loadProperties) {

                loadProperties();

            }

        }

        catch (error) {

            console.error(error);

            Swal.fire({

                icon: "error",

                title: "Error",

                text:

                    error.response?.data?.message ||

                    error.response?.data ||

                    "Unable to add property."

            });

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="property-form-card">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h4>

                    Add New Property

                </h4>

                <button

                    type="button"

                    className="btn btn-success"

                    onClick={() =>

                        window.open(

                            process.env.REACT_APP_GOOGLE_MAPS_URL,

                            "_blank"

                        )

                    }

                >

                    <i className="bi bi-geo-alt-fill me-2"></i>

                    Open Google Maps

                </button>

            </div>

            <form onSubmit={handleSubmit}>

                <div className="row">
                    {/* Property Name */}

<div className="col-md-6 mb-3">

    <label className="form-label">

        Property Name

    </label>

    <input

        type="text"

        name="name"

        className="form-control"

        placeholder="Enter Property Name"

        value={property.name}

        onChange={handleChange}

        required

    />

</div>

{/* Price */}

<div className="col-md-6 mb-3">

    <label className="form-label">

        Price

    </label>

    <input

        type="number"

        name="price"

        className="form-control"

        placeholder="Enter Price"

        value={property.price}

        onChange={handleChange}

        min="1"

        required

    />

</div>

{/* Property Type */}

<div className="col-md-6 mb-3">

    <label className="form-label">

        Property Type

    </label>

    <select

        name="type"

        className="form-select"

        value={property.type}

        onChange={handleChange}

    >

        <option value="APARTMENT">

            Apartment

        </option>

        <option value="VILLA">

            Villa

        </option>

        <option value="PLOT">

            Plot

        </option>

        <option value="COMMERCIAL">

            Commercial

        </option>

    </select>

</div>

{/* Location */}

<div className="col-md-6 mb-3">

    <label className="form-label">

        Location

    </label>

    <input

        type="text"

        name="location"

        className="form-control"

        placeholder="Property Location"

        value={property.location}

        onChange={handleChange}

        required

    />

</div>

{/* Area */}

<div className="col-md-6 mb-3">

    <label className="form-label">

        Area (Sq Ft)

    </label>

    <input

        type="number"

        name="areaSqft"

        className="form-control"

        placeholder="Area in Sq Ft"

        value={property.areaSqft}

        onChange={handleChange}

        min="1"

        required

    />

</div>

{/* Builder */}

<div className="col-md-6 mb-3">

    <label className="form-label">

        Builder Name

    </label>

    <input

        type="text"

        name="builderName"

        className="form-control"

        placeholder="Builder Name"

        value={property.builderName}

        onChange={handleChange}

    />

</div>

{/* Image URL */}

<div className="col-md-12 mb-3">

    <label className="form-label">

        Property Image URL

    </label>

    <input

        type="text"

        name="imageUrl"

        className="form-control"

        placeholder="Paste Image URL"

        value={property.imageUrl}

        onChange={handleChange}

    />

</div>

{/* Image Preview */}

{

    property.imageUrl && (

        <div className="col-md-12 mb-3 text-center">

            <img

                src={

                    property.imageUrl ||

                    process.env.REACT_APP_DEFAULT_PROPERTY_IMAGE

                }

                alt="Property Preview"

                onError={(e) => {

                    e.target.src =

                        process.env.REACT_APP_DEFAULT_PROPERTY_IMAGE;

                }}

                style={{

                    width: "320px",

                    height: "200px",

                    objectFit: "cover",

                    borderRadius: "15px",

                    border: "1px solid #ddd"

                }}

            />

        </div>

    )

}

{/* Latitude */}

<div className="col-md-6 mb-3">

    <label className="form-label">

        Latitude

    </label>

    <input

        type="number"

        step="any"

        min="-90"

        max="90"

        name="latitude"

        className="form-control"

        placeholder="18.5204"

        value={property.latitude}

        onChange={handleChange}

    />

</div>

{/* Longitude */}

<div className="col-md-6 mb-3">

    <label className="form-label">

        Longitude

    </label>

    <input

        type="number"

        step="any"

        min="-180"

        max="180"

        name="longitude"

        className="form-control"

        placeholder="73.8567"

        value={property.longitude}

        onChange={handleChange}

    />

</div>
{/* Property Status */}

<div className="col-md-6 mb-3">

    <label className="form-label">

        Property Status

    </label>

    <select

        name="propertyStatus"

        className="form-select"

        value={property.propertyStatus}

        onChange={handleChange}

    >

        <option value="AVAILABLE">

            Available

        </option>

        <option value="BOOKED">

            Booked

        </option>

        <option value="SOLD">

            Sold

        </option>

        <option value="UNDER_CONSTRUCTION">

            Under Construction

        </option>

        <option value="READY_TO_MOVE">

            Ready To Move

        </option>

    </select>

</div>

{/* Description */}

<div className="col-md-12 mb-3">

    <label className="form-label">

        Description

    </label>

    <textarea

        rows="5"

        name="description"

        className="form-control"

        placeholder="Enter Property Description"

        value={property.description}

        onChange={handleChange}

    />

</div>

</div>

{/* Submit Button */}

<button

    type="submit"

    className="property-btn"

    disabled={loading}

>

    <i className="bi bi-building-add"></i>

    <span>

        {

            loading

                ? " Adding Property..."

                : " Add Property"

        }

    </span>

</button>

</form>

</div>

);

}

export default React.memo(PropertyForm);