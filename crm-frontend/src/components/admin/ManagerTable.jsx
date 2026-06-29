import React, {
    useEffect,
    useMemo,
    useState
} from "react";

import Swal from "sweetalert2";

import UserService from "../../services/UserService";

function ManagerTable() {

    const [managers, setManagers] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadManagers();

    }, []);

    const loadManagers = async () => {

        try {

            const response =
                await UserService.getManagers();

            setManagers(response.data);

        }

        catch (error) {

            console.error(

                "Unable to load managers",

                error

            );

        }

    };

    const viewManager = (manager) => {

        Swal.fire({

            title: manager.name,

            imageUrl:
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    manager.name
                )}&background=2563eb&color=ffffff&size=256`,

            imageWidth: 90,

            html: `

                <div style="text-align:left">

                    <p><b>Email :</b> ${manager.email}</p>

                    <p><b>Mobile :</b> ${manager.mobile}</p>

                    <p><b>State :</b> ${manager.location || "-"}</p>

                    <p><b>Assigned City :</b> ${manager.assignedCity || "-"}</p>

                    <p><b>Role :</b> ${manager.role}</p>

                </div>

            `,

            width: 550

        });

    };

    const deleteManager = (id) => {

        Swal.fire({

            title: "Delete Manager?",

            text: "This action cannot be undone.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#dc3545",

            confirmButtonText: "Delete"

        }).then(async (result) => {

            if (!result.isConfirmed) return;

            try {

                await UserService.deleteUser(id);

                Swal.fire(

                    "Deleted!",

                    "Manager removed successfully.",

                    "success"

                );

                loadManagers();

            }

            catch (error) {

                console.error(error);

                Swal.fire(

                    "Error",

                    "Unable to delete manager.",

                    "error"

                );

            }

        });

    };

    const filteredManagers = useMemo(() => {

        const keyword = search.toLowerCase();

        return managers.filter(manager =>

            manager.name?.toLowerCase().includes(keyword)

            ||

            manager.email?.toLowerCase().includes(keyword)

            ||

            manager.mobile?.includes(search)

            ||

            manager.assignedCity?.toLowerCase().includes(keyword)

        );

    }, [managers, search]);

    return (

        <div className="manager-table-card">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h4>

                        Managers

                    </h4>

                    <small style={{ color: "#94a3b8" }}>

                        Total Managers : <strong>{filteredManagers.length}</strong>

                    </small>

                </div>

                <input

                    type="text"

                    className="form-control manager-search"

                    placeholder="Search by Name, Email, City..."

                    value={search}

                    onChange={(e) =>

                        setSearch(e.target.value)

                    }

                />

            </div>

            <div className="table-responsive">

                <table className="table table-hover manager-table">

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

                            filteredManagers.length > 0 ?

                                filteredManagers.map(manager => (

                                    <tr key={manager.userId}>

                                        <td>{manager.name}</td>

                                        <td>{manager.email}</td>

                                        <td>{manager.mobile}</td>

                                        <td>{manager.assignedCity}</td>

                                        <td>

                                            <button

                                                className="btn btn-info btn-sm me-2"

                                                onClick={() =>

                                                    viewManager(manager)

                                                }

                                            >

                                                <i className="bi bi-eye"></i>

                                            </button>

                                            <button

                                                className="btn btn-warning btn-sm me-2"

                                            >

                                                <i className="bi bi-pencil-square"></i>

                                            </button>

                                            <button

                                                className="btn btn-danger btn-sm"

                                                onClick={() =>

                                                    deleteManager(manager.userId)

                                                }

                                            >

                                                <i className="bi bi-trash"></i>

                                            </button>

                                        </td>

                                    </tr>

                                ))

                                :

                                <tr>

                                    <td

                                        colSpan="5"

                                        className="text-center py-4 text-muted"

                                    >

                                        No managers found.

                                    </td>

                                </tr>

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default React.memo(ManagerTable);