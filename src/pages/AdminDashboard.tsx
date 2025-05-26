
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

export function AdminDashboard() {
  const { user } = useAuth();

  const systemStats = {
    totalUsers: 1247,
    activeUsers: 89,
    totalEvidence: 5832,
    pendingVerification: 23,
    verifiedEvidence: 5654,
    failedVerification: 155,
    systemHealth: 98.7,
    storageUsed: 847.3,
    storageLimit: 1000
  };

  const sectorDistribution = [
    { sector: 'Legal', users: 423, evidence: 2145, color: 'bg-blue-500' },
    { sector: 'Healthcare', users: 312, evidence: 1567, color: 'bg-green-500' },
    { sector: 'Finance', users: 287, evidence: 1234, color: 'bg-yellow-500' },
    { sector: 'Government', users: 156, evidence: 678, color: 'bg-red-500' },
    { sector: 'Education', users: 69, evidence: 208, color: 'bg-purple-500' }
  ];

  const recentAlerts = [
    {
      id: '1',
      type: 'warning',
      message: 'High volume of uploads from Healthcare sector',
      time: '5 minutes ago',
      severity: 'medium'
    },
    {
      id: '2',
      type: 'error',
      message: 'Blockchain verification failed for 3 Legal files',
      time: '1 hour ago',
      severity: 'high'
    },
    {
      id: '3',
      type: 'info',
      message: 'System backup completed successfully',
      time: '2 hours ago',
      severity: 'low'
    }
  ];

  const adminActions = [
    { title: 'User Management', href: '/admin/users', icon: '👥', description: 'Manage users across all sectors' },
    { title: 'Evidence Oversight', href: '/admin/evidence', icon: '🗂️', description: 'Monitor all evidence files' },
    { title: 'System Settings', href: '/admin/settings', icon: '⚙️', description: 'Configure system parameters' },
    { title: 'Security Center', href: '/admin/security', icon: '🔒', description: 'Security monitoring and controls' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Admin Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            System Administration
          </h1>
          <p className="text-gray-400 mt-1">Complete system overview and management • {user?.sector} Sector</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            className="glass-button border-red-500/30"
            aria-label="View system health details"
          >
            <span className="mr-2">🔍</span>
            System Health
          </Button>
          <Button 
            className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700"
            aria-label="Access system controls"
          >
            <span className="mr-2">🛠️</span>
            System Controls
          </Button>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card border-red-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{systemStats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-green-400 mt-1">
              {systemStats.activeUsers} active now
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-red-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Evidence Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{systemStats.totalEvidence.toLocaleString()}</div>
            <p className="text-xs text-blue-400 mt-1">
              {systemStats.pendingVerification} pending verification
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-red-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {Math.round((systemStats.verifiedEvidence / systemStats.totalEvidence) * 100)}%
            </div>
            <p className="text-xs text-green-400 mt-1">
              {systemStats.verifiedEvidence.toLocaleString()} verified
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-red-500/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{systemStats.systemHealth}%</div>
            <Progress 
              value={systemStats.systemHealth} 
              className="mt-2"
              aria-label={`System health: ${systemStats.systemHealth}%`}
            />
            <p className="text-xs text-green-400 mt-1">
              All systems operational
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sector Distribution */}
      <Card className="glass-card border-red-500/20">
        <CardHeader>
          <CardTitle className="text-white">Sector Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {sectorDistribution.map((sector) => (
              <div key={sector.sector} className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${sector.color}`}></div>
                  <h3 className="font-medium text-white">{sector.sector}</h3>
                </div>
                <p className="text-2xl font-bold text-white">{sector.users}</p>
                <p className="text-xs text-gray-400">users</p>
                <p className="text-sm text-gray-300 mt-1">{sector.evidence} evidence files</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Admin Actions */}
      <Card className="glass-card border-red-500/20">
        <CardHeader>
          <CardTitle className="text-white">Administrative Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {adminActions.map((action) => (
              <Link
                key={action.title}
                to={action.href}
                className="p-4 rounded-lg border border-red-500/20 hover:bg-red-500/5 transition-colors group"
                aria-label={action.description}
              >
                <div className="text-2xl mb-2">{action.icon}</div>
                <h3 className="font-medium text-white group-hover:text-red-400 transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-400 mt-1">{action.description}</p>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Alerts */}
      <Card className="glass-card border-red-500/20">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">System Alerts</CardTitle>
          <Button variant="ghost" asChild className="text-red-400 hover:text-red-300">
            <Link to="/admin/alerts" aria-label="View all system alerts">
              View All
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    alert.severity === 'high' ? 'bg-red-500' :
                    alert.severity === 'medium' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`} role="img" aria-label={`${alert.severity} severity alert`}></div>
                  <div className="flex-1">
                    <p className="font-medium text-white">{alert.message}</p>
                    <p className="text-sm text-gray-400">{alert.time}</p>
                  </div>
                </div>
                <Badge 
                  variant={alert.severity === 'high' ? 'destructive' : 
                          alert.severity === 'medium' ? 'secondary' : 'default'}
                  className={
                    alert.severity === 'high' ? 'bg-red-500/20 text-red-400 border-red-500' :
                    alert.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500' :
                    'bg-blue-500/20 text-blue-400 border-blue-500'
                  }
                >
                  {alert.severity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
