
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

export function UserDashboard() {
  const { user } = useAuth();

  const userStats = {
    totalEvidence: 23,
    pendingVerification: 3,
    verifiedEvidence: 20,
    recentUploads: 5,
    storageUsed: 2.4,
    storageLimit: 10
  };

  const recentActivity = [
    {
      id: '1',
      action: 'Evidence Uploaded',
      file: 'witness_statement.pdf',
      time: '2 hours ago',
      status: 'pending'
    },
    {
      id: '2',
      action: 'Verification Complete',
      file: 'security_footage.mp4',
      time: '1 day ago',
      status: 'verified'
    },
    {
      id: '3',
      action: 'Evidence Downloaded',
      file: 'forensic_report.pdf',
      time: '2 days ago',
      status: 'completed'
    }
  ];

  const quickActions = [
    { title: 'Upload Evidence', href: '/upload', icon: '📤', description: 'Add new evidence files' },
    { title: 'View All Evidence', href: '/evidence', icon: '🗂️', description: 'Browse your evidence library' },
    { title: 'Track Status', href: '/tracking', icon: '📊', description: 'Monitor verification progress' },
    { title: 'Profile Settings', href: '/profile', icon: '⚙️', description: 'Manage your account' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-400 mt-1">Here's what's happening with your evidence</p>
        </div>
        <Button 
          asChild 
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          aria-label="Upload new evidence"
        >
          <Link to="/upload">
            <span className="mr-2">📤</span>
            Upload Evidence
          </Link>
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Total Evidence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{userStats.totalEvidence}</div>
            <p className="text-xs text-green-400 mt-1">
              +{userStats.recentUploads} this week
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Verified</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{userStats.verifiedEvidence}</div>
            <p className="text-xs text-gray-400 mt-1">
              {Math.round((userStats.verifiedEvidence / userStats.totalEvidence) * 100)}% success rate
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{userStats.pendingVerification}</div>
            <p className="text-xs text-yellow-400 mt-1">
              Awaiting verification
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Storage Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{userStats.storageUsed} GB</div>
            <Progress 
              value={(userStats.storageUsed / userStats.storageLimit) * 100} 
              className="mt-2"
              aria-label={`Storage usage: ${userStats.storageUsed} GB of ${userStats.storageLimit} GB used`}
            />
            <p className="text-xs text-gray-400 mt-1">
              of {userStats.storageLimit} GB limit
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                to={action.href}
                className="p-4 rounded-lg border border-white/10 hover:bg-white/5 transition-colors group"
                aria-label={action.description}
              >
                <div className="text-2xl mb-2">{action.icon}</div>
                <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-400 mt-1">{action.description}</p>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Recent Activity</CardTitle>
          <Button variant="ghost" asChild className="text-blue-400 hover:text-blue-300">
            <Link to="/audit" aria-label="View complete activity history">
              View All
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div className="flex-1">
                  <p className="font-medium text-white">{activity.action}</p>
                  <p className="text-sm text-gray-400">{activity.file}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant={activity.status === 'verified' ? 'default' : 
                            activity.status === 'pending' ? 'secondary' : 'outline'}
                    className={
                      activity.status === 'verified' ? 'bg-green-500/20 text-green-400 border-green-500' :
                      activity.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500' :
                      'bg-blue-500/20 text-blue-400 border-blue-500'
                    }
                  >
                    {activity.status}
                  </Badge>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
