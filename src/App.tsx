
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AppLayout } from "@/components/Layout/AppLayout";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { ChatWidget } from "@/components/AIChat/ChatWidget";

// Pages
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode; adminOnly?: boolean }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card p-8">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-white">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  // Use different layouts based on user role
  const LayoutComponent = user.role === 'admin' ? AdminLayout : AppLayout;

  return (
    <LayoutComponent>
      {children}
      <ChatWidget />
    </LayoutComponent>
  );
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card p-8">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-white">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (user) {
    // Role-based redirect
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
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

              {/* Redirects */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
