import React,
{
    useEffect,
    useState
}
from "react";

import UserService
from "../../services/UserService";

import {
    Modal,
    Button
}
from "react-bootstrap";
import "../../styles/viewPages.css";

function ManagersViewPage() {

    const [managers,
        setManagers] =
        useState([]);

    const [searchCity,
        setSearchCity] =
        useState("");

    const [selectedManager,
        setSelectedManager] =
        useState(null);

    const [show,
        setShow] =
        useState(false);

    useEffect(() => {

        loadManagers();

    }, []);

    const loadManagers =
        async () => {

            const response =
                await UserService.getManagers();

            setManagers(
                response.data
            );
        };

    const filteredManagers =
        managers.filter(
            manager =>
                manager.assignedCity
                    ?.toLowerCase()
                    .includes(
                        searchCity.toLowerCase()
                    )
        );

    return (

        <div className="container mt-4">

            <h2 className="mb-4">
                Managers Overview
            </h2>

            <input
                type="text"
                className="form-control mb-4"
                placeholder="Search By City"
                value={searchCity}
                onChange={(e) =>
                    setSearchCity(
                        e.target.value
                    )
                }
            />

            <div className="row">

                {
                    filteredManagers.map(
                        manager => (

                            <div
                                className="col-md-4 mb-4"
                                key={
                                    manager.userId
                                }
                            >

                                <div
                                    className="crm-card h-100"
                                    style={{
                                        cursor:
                                            "pointer"
                                    }}
                                    onClick={() => {

                                        setSelectedManager(
                                            manager
                                        );

                                        setShow(
                                            true
                                        );
                                    }}
                                >

                                    <div className="card-body text-center">

                                        <img
                                            src={`https://ui-avatars.com/api/?name=${manager.name}`}
                                            alt=""
                                            className="crm-avatar"
                                        />

<h5 className="crm-name">
    {manager.name}
</h5>
<div className="crm-city">
    {manager.assignedCity}
</div>

<p className="crm-email">
    {manager.email}
</p>   

<button
    className="details-btn"
>
    View Details
</button>

                                    </div>

                                </div>

                            </div>
                        )
                    )
                }

            </div>

            <Modal
                show={show}
                onHide={() =>
                    setShow(false)
                }
            >

                <Modal.Header closeButton>

                    <Modal.Title>
                        Manager Details
                    </Modal.Title>

                </Modal.Header>

                <Modal.Body>

                    {
                        selectedManager &&

                        <>

                            <p>
                                <b>Name :</b>
                                {" "}
                                {
                                    selectedManager.name
                                }
                            </p>

                            <p>
                                <b>Email :</b>
                                {" "}
                                {
                                    selectedManager.email
                                }
                            </p>

                            <p>
                                <b>Mobile :</b>
                                {" "}
                                {
                                    selectedManager.mobile
                                }
                            </p>

                            <p>
                                <b>City :</b>
                                {" "}
                                {
                                    selectedManager.assignedCity
                                }
                            </p>

                            <p>
                                <b>Location :</b>
                                {" "}
                                {
                                    selectedManager.location
                                }
                            </p>

                        </>

                    }

                </Modal.Body>

                <Modal.Footer>

                    <Button
                        variant="secondary"
                        onClick={() =>
                            setShow(false)
                        }
                    >
                        Close
                    </Button>

                </Modal.Footer>

            </Modal>

        </div>
    );
}

export default ManagersViewPage;