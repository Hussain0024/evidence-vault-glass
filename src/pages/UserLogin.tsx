
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { User } from 'lucide-react';

export function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, user, isLoading } = useAuth();

  if (user && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  if (user && user.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center animate-float">
              <User className="text-white w-8 h-8" />
            </div>
          </div>
          <h1 className="text-3xl font-bold gradient-text">User Portal</h1>
          <p className="mt-2 text-gray-400">Access your evidence dashboard</p>
        </div>

        <div className="glass-card p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="user-email" className="text-sm font-medium text-white">
                Email Address
              </Label>
              <Input
                id="user-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 glass-button border-white/20 bg-white/5"
                placeholder="Enter your email"
                aria-describedby="user-email-desc"
              />
              <p id="user-email-desc" className="sr-only">
                Enter your email address to sign in
              </p>
            </div>

            <div>
              <Label htmlFor="user-password" className="text-sm font-medium text-white">
                Password
              </Label>
              <Input
                id="user-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 glass-button border-white/20 bg-white/5"
                placeholder="Enter your password"
                aria-describedby="user-password-desc"
              />
              <p id="user-password-desc" className="sr-only">
                Enter your password to sign in
              </p>
            </div>

            <div className="flex items-center justify-between">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                aria-label="Reset your password"
              >
                Forgot your password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              aria-describedby={isLoading ? "loading-desc" : undefined}
            >
              {isLoading ? (
                <div className="flex items-center" role="status" aria-live="polite">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                  <span id="loading-desc" className="sr-only">Please wait while we sign you in</span>
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                aria-label="Create a new account"
              >
                Sign up
              </Link>
            </p>
            <p className="text-gray-400 mt-2">
              Administrator?{' '}
              <Link
                to="/login/admin"
                className="text-red-400 hover:text-red-300 font-medium transition-colors"
                aria-label="Switch to admin login"
              >
                Admin Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
