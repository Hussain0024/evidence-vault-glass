
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Settings as SettingsIcon, Bell, Shield, Eye, Globe, Users } from 'lucide-react';

export function Settings() {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      evidenceUpdates: true,
      teamActivity: false,
      systemAlerts: true
    },
    privacy: {
      profileVisible: true,
      activityVisible: false,
      shareAnalytics: true
    },
    security: {
      twoFactor: false,
      sessionTimeout: true,
      loginNotifications: true
    },
    system: {
      darkMode: true,
      language: 'en',
      timezone: 'UTC',
      autoSave: true
    }
  });

  const handleSettingChange = (category: string, setting: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
    
    toast({
      title: "Setting Updated",
      description: "Your preference has been saved.",
    });
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Settings</h1>
          <p className="text-gray-400 mt-1">Manage your preferences and system configuration</p>
        </div>
        <Badge 
          variant="outline" 
          className="text-blue-400 border-blue-500"
          aria-label={`User role: ${user?.role}`}
        >
          {user?.role}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications" className="text-white">Email Notifications</Label>
                <p className="text-sm text-gray-400">Receive updates via email</p>
              </div>
              <Switch
                id="email-notifications"
                checked={settings.notifications.email}
                onCheckedChange={(checked) => handleSettingChange('notifications', 'email', checked)}
                aria-describedby="email-notifications-desc"
              />
              <span id="email-notifications-desc" className="sr-only">Toggle email notifications</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="push-notifications" className="text-white">Push Notifications</Label>
                <p className="text-sm text-gray-400">Browser push notifications</p>
              </div>
              <Switch
                id="push-notifications"
                checked={settings.notifications.push}
                onCheckedChange={(checked) => handleSettingChange('notifications', 'push', checked)}
                aria-describedby="push-notifications-desc"
              />
              <span id="push-notifications-desc" className="sr-only">Toggle push notifications</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="evidence-updates" className="text-white">Evidence Updates</Label>
                <p className="text-sm text-gray-400">Notifications for evidence status changes</p>
              </div>
              <Switch
                id="evidence-updates"
                checked={settings.notifications.evidenceUpdates}
                onCheckedChange={(checked) => handleSettingChange('notifications', 'evidenceUpdates', checked)}
                aria-describedby="evidence-updates-desc"
              />
              <span id="evidence-updates-desc" className="sr-only">Toggle evidence update notifications</span>
            </div>

            {isAdmin && (
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="system-alerts" className="text-white">System Alerts</Label>
                  <p className="text-sm text-gray-400">Critical system notifications</p>
                </div>
                <Switch
                  id="system-alerts"
                  checked={settings.notifications.systemAlerts}
                  onCheckedChange={(checked) => handleSettingChange('notifications', 'systemAlerts', checked)}
                  aria-describedby="system-alerts-desc"
                />
                <span id="system-alerts-desc" className="sr-only">Toggle system alert notifications</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="two-factor" className="text-white">Two-Factor Authentication</Label>
                <p className="text-sm text-gray-400">Add an extra layer of security</p>
              </div>
              <Switch
                id="two-factor"
                checked={settings.security.twoFactor}
                onCheckedChange={(checked) => handleSettingChange('security', 'twoFactor', checked)}
                aria-describedby="two-factor-desc"
              />
              <span id="two-factor-desc" className="sr-only">Toggle two-factor authentication</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="session-timeout" className="text-white">Session Timeout</Label>
                <p className="text-sm text-gray-400">Auto-logout after inactivity</p>
              </div>
              <Switch
                id="session-timeout"
                checked={settings.security.sessionTimeout}
                onCheckedChange={(checked) => handleSettingChange('security', 'sessionTimeout', checked)}
                aria-describedby="session-timeout-desc"
              />
              <span id="session-timeout-desc" className="sr-only">Toggle automatic session timeout</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="login-notifications" className="text-white">Login Notifications</Label>
                <p className="text-sm text-gray-400">Notify on new login attempts</p>
              </div>
              <Switch
                id="login-notifications"
                checked={settings.security.loginNotifications}
                onCheckedChange={(checked) => handleSettingChange('security', 'loginNotifications', checked)}
                aria-describedby="login-notifications-desc"
              />
              <span id="login-notifications-desc" className="sr-only">Toggle login attempt notifications</span>
            </div>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="profile-visible" className="text-white">Profile Visibility</Label>
                <p className="text-sm text-gray-400">Make profile visible to team members</p>
              </div>
              <Switch
                id="profile-visible"
                checked={settings.privacy.profileVisible}
                onCheckedChange={(checked) => handleSettingChange('privacy', 'profileVisible', checked)}
                aria-describedby="profile-visible-desc"
              />
              <span id="profile-visible-desc" className="sr-only">Toggle profile visibility</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="activity-visible" className="text-white">Activity Visibility</Label>
                <p className="text-sm text-gray-400">Show activity to team members</p>
              </div>
              <Switch
                id="activity-visible"
                checked={settings.privacy.activityVisible}
                onCheckedChange={(checked) => handleSettingChange('privacy', 'activityVisible', checked)}
                aria-describedby="activity-visible-desc"
              />
              <span id="activity-visible-desc" className="sr-only">Toggle activity visibility</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="share-analytics" className="text-white">Share Analytics</Label>
                <p className="text-sm text-gray-400">Help improve the platform</p>
              </div>
              <Switch
                id="share-analytics"
                checked={settings.privacy.shareAnalytics}
                onCheckedChange={(checked) => handleSettingChange('privacy', 'shareAnalytics', checked)}
                aria-describedby="share-analytics-desc"
              />
              <span id="share-analytics-desc" className="sr-only">Toggle analytics sharing</span>
            </div>
          </CardContent>
        </Card>

        {/* System Preferences */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              System Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-save" className="text-white">Auto-save</Label>
                <p className="text-sm text-gray-400">Automatically save changes</p>
              </div>
              <Switch
                id="auto-save"
                checked={settings.system.autoSave}
                onCheckedChange={(checked) => handleSettingChange('system', 'autoSave', checked)}
                aria-describedby="auto-save-desc"
              />
              <span id="auto-save-desc" className="sr-only">Toggle automatic saving</span>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Language</Label>
              <p className="text-sm text-gray-400">Currently: English (US)</p>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Timezone</Label>
              <p className="text-sm text-gray-400">Currently: UTC</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {isAdmin && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Admin Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-400">Additional administrative settings and system configuration options.</p>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                className="glass-button"
                aria-label="Configure system settings"
              >
                System Configuration
              </Button>
              <Button 
                variant="outline" 
                className="glass-button"
                aria-label="Manage user defaults"
              >
                User Defaults
              </Button>
              <Button 
                variant="outline" 
                className="glass-button"
                aria-label="Configure security policies"
              >
                Security Policies
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
