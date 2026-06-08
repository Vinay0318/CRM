import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/common/Navbar";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ManagersPage from "./pages/ManagersPage";
import AgentsPage from "./pages/AgentsPage";
import PropertiesPage from "./pages/PropertiesPage";

import EnquiryPage from "./pages/EnquiryPage";
import DashboardPage from "./pages/DashboardPage";

import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (

    <BrowserRouter>

      {/* Navbar */}

      <Navbar />

      {/* Routes */}

      <Routes>

        <Route
          path="/"
          element={<EnquiryPage />}
        />

        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />
        <Route
    path="/admin/dashboard"
    element={<AdminDashboardPage />}
/>

<Route
    path="/admin/managers"
    element={<ManagersPage />}
/>

<Route
    path="/admin/agents"
    element={<AgentsPage />}
/>

<Route
    path="/admin/properties"
    element={<PropertiesPage />}
/>

      </Routes>

      {/* Toast Notifications */}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

    </BrowserRouter>

  );
}

export default App;