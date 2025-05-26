
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Shield } from 'lucide-react';

const adminNavigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: '🛠️', roles: ['admin'] },
  { name: 'User Management', href: '/admin/users', icon: '👥', roles: ['admin'] },
  { name: 'Evidence Oversight', href: '/admin/evidence', icon: '🗂️', roles: ['admin'] },
  { name: 'System Settings', href: '/admin/settings', icon: '⚙️', roles: ['admin'] },
  { name: 'Audit Log', href: '/admin/audit', icon: '📋', roles: ['admin'] },
  { name: 'Analytics', href: '/admin/analytics', icon: '📊', roles: ['admin'] },
  { name: 'Security', href: '/admin/security', icon: '🔒', roles: ['admin'] },
];

const userNavigation = [
  { name: 'Profile', href: '/profile', icon: '👤', roles: ['admin', 'user', 'auditor'] },
  { name: 'Settings', href: '/settings', icon: '⚙️', roles: ['admin', 'user', 'auditor'] },
];

export function AdminSidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const getSectorColor = (sector?: string) => {
    const colors = {
      Healthcare: 'text-green-400',
      Legal: 'text-blue-400',
      Finance: 'text-yellow-400',
      Government: 'text-red-400',
      Education: 'text-purple-400',
      Manufacturing: 'text-orange-400',
      Technology: 'text-cyan-400',
      Other: 'text-gray-400'
    };
    return colors[sector as keyof typeof colors] || colors.Other;
  };

  return (
    <div className="flex flex-col h-full w-64 glass-card border-r border-red-500/20 bg-gradient-to-b from-red-950/30 to-orange-950/30">
      {/* Admin Logo */}
      <div className="flex items-center px-6 py-4 border-b border-red-500/20">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
            <Shield className="text-white w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-lg text-white">Admin Panel</span>
            <p className="text-xs text-red-400">BlockEvidence</p>
          </div>
        </div>
      </div>

      {/* Admin Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2" role="navigation" aria-label="Admin navigation">
        <p className="px-3 text-xs font-semibold text-red-400 uppercase tracking-wider mb-4">
          System Management
        </p>
        {adminNavigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20 text-white border border-red-500/30 glow-border'
                  : 'text-gray-300 hover:text-white hover:bg-red-500/10'
              )}
              aria-current={isActive ? 'page' : undefined}
              aria-label={`Navigate to ${item.name}`}
            >
              <span className="mr-3 text-lg" role="img" aria-label={`${item.name} icon`}>
                {item.icon}
              </span>
              {item.name}
            </Link>
          );
        })}

        <div className="pt-4 border-t border-red-500/20">
          <p className="px-3 text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">
            Personal
          </p>
          {userNavigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20 text-white border border-red-500/30'
                    : 'text-gray-300 hover:text-white hover:bg-red-500/10'
                )}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Navigate to ${item.name}`}
              >
                <span className="mr-3 text-lg" role="img" aria-label={`${item.name} icon`}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Admin Profile & Theme Toggle */}
      <div className="px-4 py-4 border-t border-red-500/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={user?.avatar}
              alt={`${user?.name}'s profile picture`}
              className="w-8 h-8 rounded-full border border-red-500/30"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.name}
              </p>
              <div className="flex items-center space-x-2">
                <p className="text-xs text-red-400 truncate" aria-label={`User role: ${user?.role}`}>
                  {user?.role}
                </p>
                {user?.sector && (
                  <>
                    <span className="text-xs text-gray-500">•</span>
                    <p className={`text-xs truncate ${getSectorColor(user.sector)}`}>
                      {user.sector}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
          <ThemeToggle />
        </div>
        <Button
          onClick={logout}
          variant="ghost"
          className="w-full justify-start glass-button text-red-400 hover:text-red-300 border-red-500/20"
          aria-label="Log out of admin panel"
        >
          <span className="mr-2" role="img" aria-label="Logout icon">🚪</span>
          Logout
        </Button>
      </div>
    </div>
  );
}
