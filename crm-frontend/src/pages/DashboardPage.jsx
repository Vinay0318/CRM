import Sidebar from "../components/common/Sidebar";

import ManagerDashboard
from "../components/dashboard/ManagerDashboard";

import "../styles/Dashboard.css";

function DashboardPage() {

  return (

    <div className="container-fluid">

      <div className="row">

        <div className="col-md-2 p-0">

          <Sidebar />

        </div>

        <div className="col-md-10">

          <ManagerDashboard />

        </div>

      </div>

    </div>

  );
}

export default DashboardPage;