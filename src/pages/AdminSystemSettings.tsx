
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Settings as SettingsIcon, Database, Shield, Server, Globe } from 'lucide-react';

export function AdminSystemSettings() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    systemMaintenance: false,
    userRegistration: true,
    emailVerification: true,
    autoBackup: true,
    blockchainSync: true,
    maxFileSize: 100,
    sessionTimeout: 30,
    apiRateLimit: 1000
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "System settings updated",
        description: "All configuration changes have been applied."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update system settings.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">System Settings</h1>
          <p className="text-gray-400 mt-1">Configure system-wide preferences and security</p>
        </div>
        <Button 
          onClick={handleSave}
          disabled={isLoading}
          className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          ) : (
            <SettingsIcon className="w-4 h-4 mr-2" />
          )}
          Save Changes
        </Button>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Server className="w-5 h-5 mr-2" />
            System Control
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Maintenance Mode</Label>
              <p className="text-sm text-gray-400">Temporarily disable system access for maintenance</p>
            </div>
            <Switch 
              checked={settings.systemMaintenance} 
              onCheckedChange={(checked) => setSettings({...settings, systemMaintenance: checked})}
            />
          </div>
          
          <Separator className="bg-white/10" />
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>User Registration</Label>
              <p className="text-sm text-gray-400">Allow new users to register accounts</p>
            </div>
            <Switch 
              checked={settings.userRegistration} 
              onCheckedChange={(checked) => setSettings({...settings, userRegistration: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Email Verification</Label>
              <p className="text-sm text-gray-400">Require email verification for new accounts</p>
            </div>
            <Switch 
              checked={settings.emailVerification} 
              onCheckedChange={(checked) => setSettings({...settings, emailVerification: checked})}
            />
          </div>
        </CardContent>
      </Card>

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
              <p className="text-sm text-gray-400">Enable automated daily backups</p>
            </div>
            <Switch 
              checked={settings.autoBackup} 
              onCheckedChange={(checked) => setSettings({...settings, autoBackup: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Blockchain Synchronization</Label>
              <p className="text-sm text-gray-400">Sync evidence hashes with blockchain</p>
            </div>
            <Switch 
              checked={settings.blockchainSync} 
              onCheckedChange={(checked) => setSettings({...settings, blockchainSync: checked})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fileSize">Maximum File Size (MB)</Label>
            <Input 
              id="fileSize" 
              type="number" 
              value={settings.maxFileSize}
              onChange={(e) => setSettings({...settings, maxFileSize: parseInt(e.target.value)})}
              className="bg-white/5 border-white/10" 
            />
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
            <Input 
              id="sessionTimeout" 
              type="number" 
              value={settings.sessionTimeout}
              onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})}
              className="bg-white/5 border-white/10" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rateLimit">API Rate Limit (requests/hour)</Label>
            <Input 
              id="rateLimit" 
              type="number" 
              value={settings.apiRateLimit}
              onChange={(e) => setSettings({...settings, apiRateLimit: parseInt(e.target.value)})}
              className="bg-white/5 border-white/10" 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
