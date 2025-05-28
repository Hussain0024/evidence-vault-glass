
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function ClickableLogo() {
  const { user } = useAuth();

  const getLogoDestination = () => {
    if (!user) {
      return '/';
    }
    
    if (user.role === 'admin') {
      return '/admin/dashboard';
    }
    
    return '/dashboard';
  };

  return (
    <Link to={getLogoDestination()} className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-lg">B</span>
      </div>
      <span className="font-bold text-xl gradient-text">BlockEvidence</span>
    </Link>
  );
}
