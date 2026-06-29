// import React, {
//     useEffect,
//     useMemo,
//     useState
// } from "react";

// import UserService from "../../services/UserService";

// import {
//     Modal,
//     Button
// } from "react-bootstrap";

// import "../../styles/viewPages.css";

// function ManagersViewPage() {

//     const [managers, setManagers] = useState([]);

//     const [search, setSearch] = useState("");

//     const [selectedManager, setSelectedManager] = useState(null);

//     const [show, setShow] = useState(false);

//     useEffect(() => {

//         loadManagers();

//     }, []);

//     const loadManagers = async () => {

//         try {

//             const response = await UserService.getManagers();

//             setManagers(response.data);

//         }

//         catch (error) {

//             console.error(

//                 "Unable to load managers",

//                 error

//             );

//         }

//     };

//     const getAvatar = (name) =>

//         `https://ui-avatars.com/api/?name=${encodeURIComponent(
//             name
//         )}&background=2563eb&color=ffffff&size=256`;

//     const filteredManagers = useMemo(() => {

//         const keyword = search.toLowerCase();

//         return managers.filter(manager =>

//             manager.name?.toLowerCase().includes(keyword)

//             ||

//             manager.email?.toLowerCase().includes(keyword)

//             ||

//             manager.mobile?.includes(search)

//             ||

//             manager.assignedCity?.toLowerCase().includes(keyword)

//         );

//     }, [managers, search]);

//     return (

//         <div className="view-page">

//             {/* Header */}

//             <div className="page-header">

//                 <div>

//                     <h1 className="page-title">

//                         👨‍💼 Managers Overview

//                     </h1>

//                     <p className="page-subtitle">

//                         Monitor and manage all managers

//                     </p>

//                 </div>

//                 <div className="header-count">

//                     {filteredManagers.length}

//                     <span>

//                         Managers

//                     </span>

//                 </div>

//             </div>

//             {/* Search */}

//             <div className="search-wrapper mb-4">

//                 <i className="bi bi-search search-icon"></i>

//                 <input

//                     type="text"

//                     className="form-control search-box"

//                     placeholder="Search by Name, Email, City..."

//                     value={search}

//                     onChange={(e) =>

//                         setSearch(e.target.value)

//                     }

//                 />

//             </div>

//             {/* Cards */}

//             <div className="row">

//                 {

//                     filteredManagers.length > 0 ?

//                         filteredManagers.map(manager => (

//                             <div

//                                 className="col-lg-4 col-md-6 mb-4"

//                                 key={manager.userId}

//                             >

//                                 <div

//                                     className="manager-card h-100"

//                                     onClick={() => {

//                                         setSelectedManager(manager);

//                                         setShow(true);

//                                     }}

//                                 >

//                                     <div className="manager-banner"></div>

//                                     <div className="manager-avatar">

//                                         <img

//                                             src={getAvatar(manager.name)}

//                                             alt={manager.name}

//                                         />

//                                     </div>

//                                     <div className="manager-content">

//                                         <h4>

//                                             {manager.name}

//                                         </h4>

//                                         <div className="city-badge">

//                                             {manager.assignedCity}

//                                         </div>

//                                         <p>

//                                             {manager.email}

//                                         </p>

//                                         <div className="d-flex justify-content-center gap-2 mt-3">

//                                             <span className="badge bg-success">

//                                                 Active

//                                             </span>

//                                             <span className="badge bg-primary">

//                                                 Manager

//                                             </span>

//                                         </div>

//                                         <button

//                                             className="view-btn mt-4"

//                                         >

//                                             <i className="bi bi-eye me-2"></i>

//                                             View Details

//                                         </button>

//                                     </div>

//                                 </div>

//                             </div>

//                         ))

//                         :

//                         <div className="col-12">

//                             <div className="text-center py-5">

//                                 <i

//                                     className="bi bi-search"

//                                     style={{

//                                         fontSize: "50px",

//                                         color: "#bdbdbd"

//                                     }}

//                                 ></i>

//                                 <h4 className="mt-3 text-secondary">

//                                     No Managers Found

//                                 </h4>

//                                 <p className="text-muted">

//                                     No managers match your search.

//                                 </p>

//                             </div>

//                         </div>

//                 }

//             </div>

//             {/* Modal */}

//             <Modal

//                 show={show}

//                 centered

//                 size="lg"

//                 onHide={() => setShow(false)}

//             >

//                 <Modal.Header closeButton>

//                     <Modal.Title>

//                         👨‍💼 Manager Details

//                     </Modal.Title>

//                 </Modal.Header>

//                 <Modal.Body>

//                     {

//                         selectedManager &&

//                         <>

//                             <div className="text-center mb-4">

//                                 <img

//                                     src={getAvatar(selectedManager.name)}

//                                     alt={selectedManager.name}

//                                     style={{

//                                         width: "110px",

//                                         height: "110px",

//                                         borderRadius: "50%",

//                                         border: "4px solid #2563eb"

//                                     }}

//                                 />

//                             </div>

//                             <div className="row">

//                                 <div className="col-md-6 mb-3">

//                                     <strong>Name</strong>

//                                     <p>{selectedManager.name}</p>

//                                 </div>

//                                 <div className="col-md-6 mb-3">

//                                     <strong>Email</strong>

//                                     <p>{selectedManager.email}</p>

//                                 </div>

//                                 <div className="col-md-6 mb-3">

//                                     <strong>Mobile</strong>

//                                     <p>{selectedManager.mobile}</p>

//                                 </div>

//                                 <div className="col-md-6 mb-3">

//                                     <strong>State</strong>

//                                     <p>{selectedManager.location}</p>

//                                 </div>

//                                 <div className="col-md-6 mb-3">

//                                     <strong>Assigned City</strong>

//                                     <p>{selectedManager.assignedCity}</p>

//                                 </div>

//                                 <div className="col-md-6 mb-3">

//                                     <strong>Role</strong>

//                                     <p>

//                                         <span className="badge bg-primary">

//                                             {selectedManager.role}

//                                         </span>

//                                     </p>

//                                 </div>

//                             </div>

//                         </>

//                     }

//                 </Modal.Body>

//                 <Modal.Footer>

//                     <Button

//                         variant="dark"

//                         onClick={() => setShow(false)}

//                     >

//                         Close

//                     </Button>

//                 </Modal.Footer>

//             </Modal>

//         </div>

//     );

// }

// export default React.memo(ManagersViewPage);