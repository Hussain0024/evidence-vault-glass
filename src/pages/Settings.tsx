
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Bell, 
  Database,
  Key,
  Download,
  Trash2
} from 'lucide-react';

export function Settings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    twoFactorAuth: false,
    autoBackup: true,
    blockchainAlerts: true,
    dataRetention: 30,
    apiAccess: false
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
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
          <h1 className="text-3xl font-bold gradient-text">Settings</h1>
          <p className="text-gray-400 mt-1">Manage your account preferences and security settings</p>
        </div>
        <Button 
          onClick={handleSave}
          disabled={isLoading}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          ) : (
            <SettingsIcon className="w-4 h-4 mr-2" />
          )}
          Save Changes
        </Button>
      </div>

      {/* Profile Settings */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <User className="w-5 h-5 mr-2" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={user?.name} className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue={user?.email} className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sector">Sector</Label>
              <Input id="sector" defaultValue={user?.sector} className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organization">Organization</Label>
              <Input id="organization" defaultValue="Not specified" className="bg-white/5 border-white/10" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Security & Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
            </div>
            <Switch 
              checked={settings.twoFactorAuth} 
              onCheckedChange={(checked) => setSettings({...settings, twoFactorAuth: checked})}
            />
          </div>
          
          <Separator className="bg-white/10" />
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>API Access</Label>
              <p className="text-sm text-gray-400">Enable programmatic access to your evidence</p>
            </div>
            <Switch 
              checked={settings.apiAccess} 
              onCheckedChange={(checked) => setSettings({...settings, apiAccess: checked})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Change Password</Label>
            <div className="flex space-x-2">
              <Input id="password" type="password" placeholder="New password" className="bg-white/5 border-white/10" />
              <Button variant="outline" className="border-white/20">Update</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Email Notifications</Label>
              <p className="text-sm text-gray-400">Receive updates about your evidence via email</p>
            </div>
            <Switch 
              checked={settings.emailNotifications} 
              onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
            />
          </div>
          
          <Separator className="bg-white/10" />
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Blockchain Alerts</Label>
              <p className="text-sm text-gray-400">Get notified when verification completes</p>
            </div>
            <Switch 
              checked={settings.blockchainAlerts} 
              onCheckedChange={(checked) => setSettings({...settings, blockchainAlerts: checked})}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Database className="w-5 h-5 mr-2" />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Automatic Backup</Label>
              <p className="text-sm text-gray-400">Automatically backup your evidence data</p>
            </div>
            <Switch 
              checked={settings.autoBackup} 
              onCheckedChange={(checked) => setSettings({...settings, autoBackup: checked})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="retention">Data Retention (days)</Label>
            <Input 
              id="retention" 
              type="number" 
              value={settings.dataRetention}
              onChange={(e) => setSettings({...settings, dataRetention: parseInt(e.target.value)})}
              className="bg-white/5 border-white/10" 
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <Button variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
