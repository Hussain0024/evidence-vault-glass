
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Mail, 
  Building, 
  Shield, 
  Calendar,
  Award,
  Activity,
  Camera
} from 'lucide-react';

export function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const profileStats = {
    totalEvidence: 23,
    verifiedEvidence: 20,
    pendingEvidence: 3,
    successRate: 87,
    memberSince: 'January 2024',
    lastLogin: '2 hours ago'
  };

  const achievements = [
    { title: 'First Upload', description: 'Uploaded your first evidence', earned: true },
    { title: 'Verification Expert', description: '50+ verified evidence files', earned: true },
    { title: 'Security Champion', description: 'Enabled 2FA and security features', earned: false },
    { title: 'Team Player', description: 'Collaborated on evidence with team', earned: true }
  ];

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved successfully."
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Profile</h1>
          <p className="text-gray-400 mt-1">Manage your profile information and view your activity</p>
        </div>
        <Button 
          onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
          disabled={isLoading}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          ) : isEditing ? (
            <>Save Changes</>
          ) : (
            <>Edit Profile</>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <User className="w-5 h-5 mr-2" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  {isEditing && (
                    <Button 
                      size="sm" 
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
                  <p className="text-gray-400">{user?.email}</p>
                  <Badge className="mt-2 bg-blue-500/20 text-blue-400 border-blue-500">
                    {user?.role} • {user?.sector}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    defaultValue={user?.name} 
                    disabled={!isEditing}
                    className="bg-white/5 border-white/10" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    defaultValue={user?.email} 
                    disabled={!isEditing}
                    className="bg-white/5 border-white/10" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sector">Sector</Label>
                  <Input 
                    id="sector" 
                    defaultValue={user?.sector} 
                    disabled={!isEditing}
                    className="bg-white/5 border-white/10" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input 
                    id="organization" 
                    defaultValue="Morrison & Associates" 
                    disabled={!isEditing}
                    className="bg-white/5 border-white/10" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${
                    achievement.earned 
                      ? 'border-green-500/30 bg-green-500/10' 
                      : 'border-gray-500/30 bg-gray-500/10'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        achievement.earned ? 'bg-green-500' : 'bg-gray-500'
                      }`}>
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-white">{achievement.title}</h3>
                        <p className="text-sm text-gray-400">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics */}
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Activity Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text">{profileStats.totalEvidence}</div>
                <p className="text-sm text-gray-400">Total Evidence Files</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Verified</span>
                  <span className="text-green-400">{profileStats.verifiedEvidence}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Pending</span>
                  <span className="text-yellow-400">{profileStats.pendingEvidence}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Success Rate</span>
                  <span className="text-blue-400">{profileStats.successRate}%</span>
                </div>
              </div>

              <div className="pt-4">
                <div className="text-sm text-gray-400 mb-2">Verification Success Rate</div>
                <Progress value={profileStats.successRate} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Account Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-white">Email Verified</p>
                  <p className="text-xs text-green-400">Verified</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Building className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-white">Member Since</p>
                  <p className="text-xs text-gray-400">{profileStats.memberSince}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Shield className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-white">Last Login</p>
                  <p className="text-xs text-gray-400">{profileStats.lastLogin}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
