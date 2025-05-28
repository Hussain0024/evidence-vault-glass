
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Users, ArrowLeft } from 'lucide-react';

export function LoginSelect() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors"
            aria-label="Back to homepage"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center animate-float">
              <span className="text-white font-bold text-2xl">BE</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold gradient-text">Welcome to BlockEvidence</h1>
          <p className="mt-2 text-gray-400">Choose your access level to continue</p>
        </div>

        <div className="space-y-4">
          <div className="glass-card p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">Select Login Type</h2>
            
            <Link to="/login/user" className="block">
              <div className="p-4 rounded-lg border border-blue-500/30 hover:bg-blue-500/10 transition-colors group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Users className="text-white w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">
                      User Access
                    </h3>
                    <p className="text-sm text-gray-400">
                      Evidence management and tracking
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/login/admin" className="block">
              <div className="p-4 rounded-lg border border-red-500/30 hover:bg-red-500/10 transition-colors group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <Shield className="text-white w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-white group-hover:text-red-400 transition-colors">
                      Administrator Access
                    </h3>
                    <p className="text-sm text-gray-400">
                      System administration and oversight
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                aria-label="Create a new account"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
