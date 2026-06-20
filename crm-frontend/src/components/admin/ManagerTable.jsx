import React,
{
    useEffect,
    useState
}
from "react";

import UserService
from "../../services/UserService";

import Swal
from "sweetalert2";

function ManagerTable() {

    const [managers,
        setManagers] =
        useState([]);

    const [search,
        setSearch] =
        useState("");

    useEffect(() => {

        loadManagers();

    }, []);

    const loadManagers =
        async () => {

            try {

                const response =
                    await UserService.getManagers();

                setManagers(
                    response.data
                );

            } catch(error){

                console.log(error);
            }
        };

    const deleteManager =
        async (id) => {

            Swal.fire({

                title:
                    "Delete Manager?",

                text:
                    "This action cannot be undone",

                icon:
                    "warning",

                showCancelButton:
                    true,

                confirmButtonColor:
                    "#dc3545"

            }).then(
                async(result)=>{

                    if(result.isConfirmed){

                        await UserService
                            .deleteUser(id);

                        Swal.fire(
                            "Deleted!",
                            "Manager Removed",
                            "success"
                        );

                        loadManagers();
                    }
                }
            );
        };

    const viewManager =
        (manager) => {

            Swal.fire({

                title:
                    manager.name,

                html: `

                    <div style="text-align:left">

                        <p>
                        <b>Email:</b>
                        ${manager.email}
                        </p>

                        <p>
                        <b>Mobile:</b>
                        ${manager.mobile}
                        </p>

                        <p>
                        <b>Assigned City:</b>
                        ${manager.assignedCity || "-"}
                        </p>

                        <p>
                        <b>Location:</b>
                        ${manager.location || "-"}
                        </p>

                    </div>

                `,

                width:600
            });
        };

    const filteredManagers =
        managers.filter(
            (manager)=>

                manager.name
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )

                ||

                manager.email
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    return (

        <div className="manager-table-card">

            <div
                className="d-flex
                justify-content-between
                align-items-center
                mb-4"
            >

                <div>

                    <h4>
                        Managers
                    </h4>

                    <small
                        style={{
                            color:"#94a3b8"
                        }}
                    >
                        Total Managers :
                        {" "}
                        {filteredManagers.length}
                    </small>

                </div>

                <input
                    type="text"
                    className="form-control manager-search"
                    placeholder="Search Manager..."
                    value={search}
                    onChange={(e)=>
                        setSearch(
                            e.target.value
                        )
                    }
                />

            </div>

            <div className="table-responsive">

                <table
                    className="
                    table
                    table-hover
                    manager-table"
                >

                    <thead>

                        <tr>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Mobile</th>

                            <th>Assigned City</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            filteredManagers.map(
                                (manager)=>(

                                    <tr
                                        key={
                                            manager.userId
                                        }
                                    >

                                        <td>
                                            {manager.name}
                                        </td>

                                        <td>
                                            {manager.email}
                                        </td>

                                        <td>
                                            {manager.mobile}
                                        </td>

                                        <td>
                                            {
                                                manager.assignedCity
                                            }
                                        </td>

                                        <td>

                                            <button
                                                className="
                                                btn
                                                btn-info
                                                btn-sm
                                                me-2"
                                                onClick={()=>
                                                    viewManager(
                                                        manager
                                                    )
                                                }
                                            >
                                                <i className="bi bi-eye"></i>
                                            </button>

                                            <button
                                                className="
                                                btn
                                                btn-warning
                                                btn-sm
                                                me-2"
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </button>

                                            <button
                                                className="
                                                btn
                                                btn-danger
                                                btn-sm"
                                                onClick={()=>
                                                    deleteManager(
                                                        manager.userId
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

export default ManagerTable;