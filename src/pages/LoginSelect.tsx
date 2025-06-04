
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, User } from 'lucide-react';

export function LoginSelect() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-bold gradient-text mb-2">Welcome Back</h1>
          <p className="text-gray-400">Choose your login type to continue</p>
        </div>

        <div className="space-y-4">
          {/* User Login */}
          <Link to="/login/user" className="block">
            <Button
              variant="outline"
              className="w-full h-16 glass-card border-blue-500/30 hover:bg-blue-500/10 transition-all duration-300 group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <User className="text-white w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-white">User Login</h3>
                  <p className="text-sm text-gray-400">Access your evidence dashboard</p>
                </div>
              </div>
            </Button>
          </Link>

          {/* Admin Login */}
          <Link to="/login/admin" className="block">
            <Button
              variant="outline"
              className="w-full h-16 glass-card border-red-500/30 hover:bg-red-500/10 transition-all duration-300 group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Shield className="text-white w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-white">Admin Login</h3>
                  <p className="text-sm text-gray-400">System administration access</p>
                </div>
              </div>
            </Button>
          </Link>
        </div>

        <div className="text-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-900 px-2 text-gray-400">New to the platform?</span>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <Link to="/register" className="flex-1">
              <Button variant="ghost" className="w-full text-blue-400 hover:text-blue-300">
                Register as User
              </Button>
            </Link>
            <Link to="/register/admin" className="flex-1">
              <Button variant="ghost" className="w-full text-red-400 hover:text-red-300">
                Register as Admin
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
