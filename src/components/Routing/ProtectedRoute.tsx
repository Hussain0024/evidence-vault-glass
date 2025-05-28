
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/Layout/AppLayout";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { ChatWidget } from "@/components/AIChat/ChatWidget";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  
  // Determine if the current route is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

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

  // Redirect admin users from regular routes to admin dashboard
  if (!adminOnly && !isAdminRoute && user.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Redirect non-admin users away from admin routes
  if ((adminOnly || isAdminRoute) && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  // Use AdminLayout for admin routes, AppLayout for user routes
  const LayoutComponent = isAdminRoute || adminOnly ? AdminLayout : AppLayout;

  return (
    <LayoutComponent>
      {children}
      <ChatWidget />
    </LayoutComponent>
  );
}
