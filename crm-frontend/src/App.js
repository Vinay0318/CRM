import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/common/Navbar";

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