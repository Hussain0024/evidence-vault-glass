
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

// Pages
import { LandingPage } from "@/pages/LandingPage";
import { DevelopersPage } from "@/pages/DevelopersPage";
import { LoginSelect } from "@/pages/LoginSelect";
import { AdminLogin } from "@/pages/AdminLogin";
import { AdminRegister } from "@/pages/AdminRegister";
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
import { AdminUserManagement } from "@/pages/AdminUserManagement";
import { AdminSystemSettings } from "@/pages/AdminSystemSettings";
import { LegalSector } from "@/pages/UseCases/LegalSector";
import { HealthcareSector } from "@/pages/UseCases/HealthcareSector";
import { FinanceSector } from "@/pages/UseCases/FinanceSector";
import { GovernmentSector } from "@/pages/UseCases/GovernmentSector";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";

export function AppRoutes() {
  return (
    <Routes>
      {/* Landing Page - Public Route */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Developers Page - Public Route */}
      <Route path="/developers" element={<DevelopersPage />} />
      
      {/* Use Case Pages - Public */}
      <Route path="/use-cases/legal" element={<LegalSector />} />
      <Route path="/use-cases/healthcare" element={<HealthcareSector />} />
      <Route path="/use-cases/finance" element={<FinanceSector />} />
      <Route path="/use-cases/government" element={<GovernmentSector />} />
      
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
      <Route path="/register/admin" element={
        <PublicRoute>
          <AdminRegister />
        </PublicRoute>
      } />
      
      {/* User Routes - Available to users only */}
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
      <Route path="/audit" element={
        <ProtectedRoute>
          <AuditLog />
        </ProtectedRoute>
      } />
      
      {/* Evidence Management Routes - User specific */}
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

      {/* Admin Only Routes */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute adminOnly>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <ProtectedRoute adminOnly>
          <AdminUserManagement />
        </ProtectedRoute>
      } />
      <Route path="/admin/settings" element={
        <ProtectedRoute adminOnly>
          <AdminSystemSettings />
        </ProtectedRoute>
      } />
      <Route path="/admin/audit" element={
        <ProtectedRoute adminOnly>
          <AuditLog />
        </ProtectedRoute>
      } />
      <Route path="/admin/team" element={
        <ProtectedRoute adminOnly>
          <TeamManagement />
        </ProtectedRoute>
      } />
      <Route path="/admin/evidence" element={
        <ProtectedRoute adminOnly>
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold gradient-text mb-4">Evidence Oversight</h1>
            <p className="text-gray-400">System-wide evidence monitoring interface coming soon...</p>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/admin/analytics" element={
        <ProtectedRoute adminOnly>
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold gradient-text mb-4">System Analytics</h1>
            <p className="text-gray-400">Advanced analytics dashboard coming soon...</p>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/admin/security" element={
        <ProtectedRoute adminOnly>
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold gradient-text mb-4">Security Center</h1>
            <p className="text-gray-400">Security monitoring and threat detection coming soon...</p>
          </div>
        </ProtectedRoute>
      } />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
