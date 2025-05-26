
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, User } from 'lucide-react';

export function LoginSelect() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center animate-float">
              <span className="text-white font-bold text-3xl">BE</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-4">Welcome to BlockEvidence</h1>
          <p className="text-xl text-gray-400">Secure blockchain-based evidence management</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Admin Login */}
          <Card className="glass-card hover:scale-105 transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="text-white w-8 h-8" />
              </div>
              <CardTitle className="text-2xl text-white">Administrator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-400 text-center">
                Access system administration, user management, and advanced analytics
              </p>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• System configuration and monitoring</li>
                <li>• User and team management</li>
                <li>• Advanced audit capabilities</li>
                <li>• Analytics and reporting</li>
              </ul>
              <Button 
                asChild 
                className="w-full bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700"
                aria-label="Access administrator login"
              >
                <Link to="/login/admin">
                  Admin Login
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* User Login */}
          <Card className="glass-card hover:scale-105 transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="text-white w-8 h-8" />
              </div>
              <CardTitle className="text-2xl text-white">User</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-400 text-center">
                Upload, manage, and track your evidence with blockchain verification
              </p>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Evidence upload and management</li>
                <li>• Blockchain verification tracking</li>
                <li>• Personal activity dashboard</li>
                <li>• Secure file sharing</li>
              </ul>
              <Button 
                asChild 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                aria-label="Access user login"
              >
                <Link to="/login/user">
                  User Login
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-gray-400">
            New to BlockEvidence?{' '}
            <Link
              to="/register"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              aria-label="Create a new account"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
