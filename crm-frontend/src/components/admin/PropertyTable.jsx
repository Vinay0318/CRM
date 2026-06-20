import React,
{
    useEffect,
    useState
}
from "react";

import PropertyService
from "../../services/PropertyService";

import Swal
from "sweetalert2";

function PropertyTable() {

    const [properties,
        setProperties] =
        useState([]);

    const [search,
        setSearch] =
        useState("");

    useEffect(() => {

        loadProperties();

    }, []);

    const loadProperties =
        async () => {

            try {

                const response =
                    await PropertyService
                        .getAllProperties();

                setProperties(
                    response.data
                );

            }

            catch(error){

                console.log(error);
            }
        };

    const deleteProperty =
        async (id) => {

            Swal.fire({

                title:
                    "Delete Property?",

                icon:
                    "warning",

                showCancelButton:
                    true,

                confirmButtonColor:
                    "#dc3545"

            }).then(
                async(result)=>{

                    if(
                        result.isConfirmed
                    ){

                        await PropertyService
                            .deleteProperty(id);

                        Swal.fire(
                            "Deleted!",
                            "Property Removed",
                            "success"
                        );

                        loadProperties();
                    }
                }
            );
        };

    const viewProperty =
        (property) => {

            Swal.fire({

                title:
                    property.name,

                html: `

                <div style="text-align:left">

                    <p>
                    <b>Type:</b>
                    ${property.type}
                    </p>

                    <p>
                    <b>Price:</b>
                    ₹ ${property.price}
                    </p>

                    <p>
                    <b>Location:</b>
                    ${property.location}
                    </p>

                    <p>
                    <b>Area:</b>
                    ${property.areaSqft} Sqft
                    </p>

                    <p>
                    <b>Builder:</b>
                    ${property.builderName}
                    </p>

                    <p>
                    <b>Status:</b>
                    ${property.propertyStatus}
                    </p>

                    <p>
                    <b>Description:</b>
                    ${property.description}
                    </p>

                </div>

                `,

                width: 700
            });
        };

    const viewImage =
        (property) => {

            if(
                !property.imageUrl
            ){

                Swal.fire(
                    "No Image Found"
                );

                return;
            }

            Swal.fire({

                title:
                    property.name,

                imageUrl:
                    property.imageUrl,

                imageWidth:
                    700,

                imageAlt:
                    "Property Image"

            });
        };

    const openMap =
        (property) => {

            if(
                property.latitude &&
                property.longitude
            ){

                window.open(

                    `https://www.google.com/maps?q=${property.latitude},${property.longitude}`,

                    "_blank"

                );

            }else{

                Swal.fire({

                    icon:
                        "warning",

                    title:
                        "Location Not Available"

                });
            }
        };

    const filteredProperties =
        properties.filter(
            (property)=>{

                const txt =
                    search.toLowerCase();

                return (

                    property.name
                    ?.toLowerCase()
                    .includes(txt)

                    ||

                    property.location
                    ?.toLowerCase()
                    .includes(txt)

                    ||

                    property.builderName
                    ?.toLowerCase()
                    .includes(txt)

                    ||

                    property.type
                    ?.toLowerCase()
                    .includes(txt)

                );
            }
        );

    return (

        <div className="property-table-card">

            <div className="table-header">

                <h4>
                    Properties
                    (
                    {filteredProperties.length}
                    )
                </h4>

                <input
                    type="text"
                    className="form-control property-search"
                    placeholder="Search Property..."
                    value={search}
                    onChange={(e)=>
                        setSearch(
                            e.target.value
                        )
                    }
                />

            </div>

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

                        {
                            filteredProperties.map(
                                (property)=>(

                                    <tr
                                        key={
                                            property.propertyId
                                        }
                                    >

                                        <td>
                                            {property.name}
                                        </td>

                                        <td>
                                            {property.type}
                                        </td>

                                        <td>
                                            ₹ {property.price}
                                        </td>

                                        <td>
                                            {property.location}
                                        </td>

                                        <td>

                                            <span
                                                className={
                                                    property.propertyStatus === "AVAILABLE"
                                                    ?
                                                    "badge bg-success"
                                                    :
                                                    "badge bg-danger"
                                                }
                                            >
                                                {
                                                    property.propertyStatus
                                                }
                                            </span>

                                        </td>

                                        <td>

                                            <button
                                                className="btn btn-info btn-sm me-2"
                                                onClick={()=>
                                                    viewProperty(
                                                        property
                                                    )
                                                }
                                            >
                                                <i className="bi bi-eye"></i>
                                            </button>

                                            <button
                                                className="btn btn-primary btn-sm me-2"
                                                onClick={()=>
                                                    viewImage(
                                                        property
                                                    )
                                                }
                                            >
                                                <i className="bi bi-image"></i>
                                            </button>

                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </button>

                                            <button
                                                className="btn btn-success btn-sm me-2"
                                                onClick={()=>
                                                    openMap(
                                                        property
                                                    )
                                                }
                                            >
                                                <i className="bi bi-geo-alt-fill"></i>
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={()=>
                                                    deleteProperty(
                                                        property.propertyId
                                                    )
                                                }
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>

                                        </td>

                                    </tr>

                                )
                            )
                        }

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default PropertyTable;