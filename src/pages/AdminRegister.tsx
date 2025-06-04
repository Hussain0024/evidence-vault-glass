
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Shield, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export function AdminRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    organization: '',
    sector: 'Legal'
  });
  const { user, isLoading } = useAuth();

  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Register the user
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            organization: formData.organization,
            sector: formData.sector
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        // Update the user profile with admin role
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ 
            role: 'admin',
            organization: formData.organization,
            sector: formData.sector,
            full_name: formData.name
          })
          .eq('id', data.user.id);

        if (profileError) {
          console.error('Profile update error:', profileError);
        }
      }

      toast({
        title: "Admin registration successful!",
        description: "Please check your email for verification before logging in.",
      });

      // Redirect to admin login page
      window.location.href = '/login/admin';
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center text-red-400 hover:text-red-300 mb-6 transition-colors"
            aria-label="Back to login selection"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
          
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl flex items-center justify-center animate-float">
              <Shield className="text-white w-8 h-8" />
            </div>
          </div>
          <h1 className="text-3xl font-bold gradient-text">Admin Registration</h1>
          <p className="mt-2 text-gray-400">Create an administrator account</p>
        </div>

        <div className="glass-card p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="admin-name" className="text-sm font-medium text-white">
                Full Name
              </Label>
              <Input
                id="admin-name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                className="mt-1 glass-button border-white/20 bg-white/5"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label htmlFor="admin-email" className="text-sm font-medium text-white">
                Email Address
              </Label>
              <Input
                id="admin-email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className="mt-1 glass-button border-white/20 bg-white/5"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Label htmlFor="admin-organization" className="text-sm font-medium text-white">
                Organization
              </Label>
              <Input
                id="admin-organization"
                type="text"
                value={formData.organization}
                onChange={(e) => handleInputChange('organization', e.target.value)}
                required
                className="mt-1 glass-button border-white/20 bg-white/5"
                placeholder="Enter your organization"
              />
            </div>

            <div>
              <Label htmlFor="admin-sector" className="text-sm font-medium text-white">
                Sector
              </Label>
              <Select value={formData.sector} onValueChange={(value) => handleInputChange('sector', value)}>
                <SelectTrigger className="mt-1 glass-button border-white/20 bg-white/5">
                  <SelectValue placeholder="Select your sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Legal">Legal</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Government">Government</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="admin-password" className="text-sm font-medium text-white">
                Password
              </Label>
              <Input
                id="admin-password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
                className="mt-1 glass-button border-white/20 bg-white/5"
                placeholder="Create a password"
              />
            </div>

            <div>
              <Label htmlFor="admin-confirm-password" className="text-sm font-medium text-white">
                Confirm Password
              </Label>
              <Input
                id="admin-confirm-password"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                required
                className="mt-1 glass-button border-white/20 bg-white/5"
                placeholder="Confirm your password"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105"
            >
              {isLoading ? (
                <div className="flex items-center" role="status" aria-live="polite">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                'Create Admin Account'
              )}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-gray-400">
              Already have an admin account?{' '}
              <Link
                to="/login/admin"
                className="text-red-400 hover:text-red-300 font-medium transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
