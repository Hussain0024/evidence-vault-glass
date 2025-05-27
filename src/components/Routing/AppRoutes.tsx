
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

// Pages
import { LandingPage } from "@/pages/LandingPage";
import { LoginSelect } from "@/pages/LoginSelect";
import { AdminLogin } from "@/pages/AdminLogin";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { UserDashboard } from "@/pages/UserDashboard";
import { AdminDashboard } from "@/pages/AdminDashboard";
import { Profile } from "@/pages/Profile";
import { Settings } from "@/pages/Settings";
import { AuditLog } from "@/pages/AuditLog";
import { TeamManagement } from "@/pages/TeamManagement";
import { EvidenceTracking } from "@/pages/EvidenceTracking";
import { EvidenceUpload } from "@/pages/EvidenceUpload";
import { EvidenceList } from "@/pages/EvidenceList";
import { EvidenceDetail } from "@/pages/EvidenceDetail";
import NotFound from "@/pages/NotFound";

export function AppRoutes() {
  return (
    <Routes>
      {/* Landing Page - Root Route */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Public Routes */}
      <Route path="/login" element={
        <PublicRoute>
          <LoginSelect />
        </PublicRoute>
      } />
      <Route path="/login/admin" element={
        <PublicRoute>
          <AdminLogin />
        </PublicRoute>
      } />
      <Route path="/login/user" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } />
      
      {/* User Routes - Separate from Admin */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <UserDashboard />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      } />
      <Route path="/tracking" element={
        <ProtectedRoute>
          <EvidenceTracking />
        </ProtectedRoute>
      } />
      
      {/* Evidence Management Routes */}
      <Route path="/upload" element={
        <ProtectedRoute>
          <EvidenceUpload />
        </ProtectedRoute>
      } />
      <Route path="/evidence" element={
        <ProtectedRoute>
          <EvidenceList />
        </ProtectedRoute>
      } />
      <Route path="/evidence/:id" element={
        <ProtectedRoute>
          <EvidenceDetail />
        </ProtectedRoute>
      } />
      
      {/* Team Management */}
      <Route path="/team" element={
        <ProtectedRoute>
          <TeamManagement />
        </ProtectedRoute>
      } />

      {/* Admin Only Routes */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute adminOnly>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/audit" element={
        <ProtectedRoute adminOnly>
          <AuditLog />
        </ProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <ProtectedRoute adminOnly>
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold gradient-text mb-4">User Management</h1>
            <p className="text-gray-400">User management interface coming soon...</p>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/admin/settings" element={
        <ProtectedRoute adminOnly>
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold gradient-text mb-4">System Settings</h1>
            <p className="text-gray-400">System configuration interface coming soon...</p>
          </div>
        </ProtectedRoute>
      } />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
