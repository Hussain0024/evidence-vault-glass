
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/ThemeToggle';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊', roles: ['admin', 'user', 'auditor'] },
  { name: 'Evidence', href: '/evidence', icon: '🗂️', roles: ['admin', 'user', 'auditor'] },
  { name: 'Upload', href: '/upload', icon: '📤', roles: ['admin', 'user'] },
  { name: 'Tracking', href: '/tracking', icon: '🔍', roles: ['admin', 'user', 'auditor'] },
  { name: 'Team', href: '/team', icon: '👥', roles: ['admin', 'user', 'auditor'] },
  { name: 'Audit Log', href: '/audit', icon: '📋', roles: ['admin', 'auditor'] },
  { name: 'Profile', href: '/profile', icon: '👤', roles: ['admin', 'user', 'auditor'] },
  { name: 'Settings', href: '/settings', icon: '⚙️', roles: ['admin', 'user', 'auditor'] },
];

const adminNavigation = [
  { name: 'Admin Dashboard', href: '/admin/dashboard', icon: '🛠️' },
  { name: 'Admin Panel', href: '/admin', icon: '🔧' },
];

export function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const visibleNavigation = navigation.filter(item => 
    item.roles.includes(user?.role || 'user')
  );

  return (
    <div className="flex flex-col h-full w-64 glass-card border-r border-white/10">
      {/* Logo */}
      <div className="flex items-center px-6 py-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">BE</span>
          </div>
          <span className="font-bold text-lg gradient-text">BlockEvidence</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2" role="navigation" aria-label="Main navigation">
        {visibleNavigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30 glow-border'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
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

        {user?.role === 'admin' && (
          <div className="pt-4 border-t border-white/10">
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Administration
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
                      ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20 text-white border border-red-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
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
        )}
      </nav>

      {/* User Profile & Theme Toggle */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={user?.avatar}
              alt={`${user?.name}'s profile picture`}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-400 truncate" aria-label={`User role: ${user?.role}`}>
                {user?.role}
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
        <Button
          onClick={logout}
          variant="ghost"
          className="w-full justify-start glass-button text-red-400 hover:text-red-300"
          aria-label="Log out of your account"
        >
          <span className="mr-2" role="img" aria-label="Logout icon">🚪</span>
          Logout
        </Button>
      </div>
    </div>
  );
}
