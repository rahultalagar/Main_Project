import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

import UserDashboard from "./pages/UserDashboard";
import MyApplications from "./pages/MyApplications";

import RecruiterDashboard from "./pages/RecruiterDashboard";
import PostJob from "./pages/PostJob";
import EditJob from "./pages/EditJob";
import JobApplications from "./pages/JobApplications";


function App() {
  const Admin = () => <h1>Admin Dashboard</h1>;

  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* USER ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="USER">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applications"
          element={
            <ProtectedRoute allowedRole="USER">
              <MyApplications />
            </ProtectedRoute>
          }
        />

        {/* RECRUITER ROUTES */}
        <Route
          path="/recruiter"
          element={
            <ProtectedRoute allowedRole="RECRUITER">
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/post-job"
          element={
            <ProtectedRoute allowedRole="RECRUITER">
              <PostJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-job/:id"
          element={
            <ProtectedRoute allowedRole="RECRUITER">
              <EditJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/job-applications/:jobId"
          element={
            <ProtectedRoute allowedRole="RECRUITER">
              <JobApplications />
            </ProtectedRoute>
          }
        />
       

        {/* ADMIN ROUTE */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
