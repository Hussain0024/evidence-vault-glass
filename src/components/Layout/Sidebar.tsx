
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/ThemeToggle';

const userNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊', roles: ['user', 'auditor'] },
  { name: 'Evidence', href: '/evidence', icon: '🗂️', roles: ['user', 'auditor'] },
  { name: 'Upload', href: '/upload', icon: '📤', roles: ['user'] },
  { name: 'Tracking', href: '/tracking', icon: '🔍', roles: ['user', 'auditor'] },
  { name: 'Team', href: '/team', icon: '👥', roles: ['user', 'auditor'] },
  { name: 'Profile', href: '/profile', icon: '👤', roles: ['user', 'auditor'] },
  { name: 'Settings', href: '/settings', icon: '⚙️', roles: ['user', 'auditor'] },
];

export function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const visibleNavigation = userNavigation.filter(item => 
    item.roles.includes(user?.role || 'user')
  );

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
    <div className="flex flex-col h-full w-64 glass-card border-r border-blue-500/20 bg-gradient-to-b from-blue-950/30 to-purple-950/30">
      {/* Logo */}
      <div className="flex items-center px-6 py-4 border-b border-blue-500/20">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">BE</span>
          </div>
          <div>
            <span className="font-bold text-lg gradient-text">BlockEvidence</span>
            <p className="text-xs text-blue-400">Evidence Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2" role="navigation" aria-label="Main navigation">
        <p className="px-3 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
          Evidence Management
        </p>
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
                  : 'text-gray-300 hover:text-white hover:bg-blue-500/10'
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
      </nav>

      {/* User Profile & Theme Toggle */}
      <div className="px-4 py-4 border-t border-blue-500/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={user?.avatar}
              alt={`${user?.name}'s profile picture`}
              className="w-8 h-8 rounded-full border border-blue-500/30"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.name}
              </p>
              <div className="flex items-center space-x-2">
                <p className="text-xs text-blue-400 truncate" aria-label={`User role: ${user?.role}`}>
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
          className="w-full justify-start glass-button text-blue-400 hover:text-blue-300 border-blue-500/20"
          aria-label="Log out of your account"
        >
          <span className="mr-2" role="img" aria-label="Logout icon">🚪</span>
          Logout
        </Button>
      </div>
    </div>
  );
}
