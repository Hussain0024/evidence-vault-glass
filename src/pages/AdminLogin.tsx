
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Shield } from 'lucide-react';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, user, isLoading } = useAuth();

  if (user && user.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (user && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast({
        title: "Admin Access Granted",
        description: "Welcome to the admin panel.",
      });
    } catch (error) {
      toast({
        title: "Access Denied",
        description: "Invalid admin credentials. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl flex items-center justify-center animate-float">
              <Shield className="text-white w-8 h-8" />
            </div>
          </div>
          <h1 className="text-3xl font-bold gradient-text">Admin Portal</h1>
          <p className="mt-2 text-gray-400">Secure administrator access</p>
        </div>

        <div className="glass-card p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="admin-email" className="text-sm font-medium text-white">
                Administrator Email
              </Label>
              <Input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 glass-button border-white/20 bg-white/5"
                placeholder="Enter admin email"
                aria-describedby="admin-email-desc"
              />
              <p id="admin-email-desc" className="sr-only">
                Enter your administrator email address
              </p>
            </div>

            <div>
              <Label htmlFor="admin-password" className="text-sm font-medium text-white">
                Password
              </Label>
              <Input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 glass-button border-white/20 bg-white/5"
                placeholder="Enter admin password"
                aria-describedby="admin-password-desc"
              />
              <p id="admin-password-desc" className="sr-only">
                Enter your administrator password
              </p>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105"
              aria-describedby={isLoading ? "loading-desc" : undefined}
            >
              {isLoading ? (
                <div className="flex items-center" role="status" aria-live="polite">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Authenticating...
                  <span id="loading-desc" className="sr-only">Please wait while we verify your credentials</span>
                </div>
              ) : (
                'Access Admin Panel'
              )}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-gray-400">
              Need user access?{' '}
              <Link
                to="/login/user"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                aria-label="Switch to user login"
              >
                User Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
