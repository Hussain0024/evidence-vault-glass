
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const stats = [
  {
    title: 'Total Evidence',
    value: '1,247',
    change: '+12.5%',
    icon: '🗂️',
    trend: 'up'
  },
  {
    title: 'Blockchain Registered',
    value: '1,198',
    change: '+8.2%',
    icon: '⛓️',
    trend: 'up'
  },
  {
    title: 'Pending Verification',
    value: '49',
    change: '-3.1%',
    icon: '⏳',
    trend: 'down'
  },
  {
    title: 'Active Users',
    value: '86',
    change: '+5.4%',
    icon: '👥',
    trend: 'up'
  }
];

const recentActivity = [
  {
    id: 1,
    action: 'Evidence uploaded',
    file: 'case_001_document.pdf',
    user: 'John Doe',
    time: '2 minutes ago',
    status: 'pending'
  },
  {
    id: 2,
    action: 'Blockchain verification',
    file: 'evidence_photo_052.jpg',
    user: 'Jane Smith',
    time: '5 minutes ago',
    status: 'confirmed'
  },
  {
    id: 3,
    action: 'Team member invited',
    file: 'sarah.wilson@company.com',
    user: 'Admin',
    time: '15 minutes ago',
    status: 'completed'
  }
];

export function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back! Here's what's happening with your evidence.</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
          <span className="mr-2">📤</span>
          Upload Evidence
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="glass-card animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                {stat.title}
              </CardTitle>
              <span className="text-2xl">{stat.icon}</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="flex items-center space-x-2 mt-2">
                <Badge 
                  variant={stat.trend === 'up' ? 'default' : 'secondary'}
                  className={stat.trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}
                >
                  {stat.change}
                </Badge>
                <p className="text-xs text-gray-400">from last month</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <span className="mr-2">📊</span>
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 glass-button rounded-lg transition-all duration-200 hover:scale-[1.02]">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <div>
                      <p className="text-white font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-400">{activity.file}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant="outline"
                      className={
                        activity.status === 'confirmed' ? 'border-green-500 text-green-400' :
                        activity.status === 'pending' ? 'border-yellow-500 text-yellow-400' :
                        'border-blue-500 text-blue-400'
                      }
                    >
                      {activity.status}
                    </Badge>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <span className="mr-2">⚡</span>
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300">Blockchain Sync</span>
                <span className="text-sm text-green-400">98%</span>
              </div>
              <Progress value={98} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300">Storage Used</span>
                <span className="text-sm text-blue-400">67%</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300">API Status</span>
                <Badge className="bg-green-500/20 text-green-400">Operational</Badge>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300">Network</span>
                <Badge className="bg-green-500/20 text-green-400">Healthy</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <span className="mr-2">⚡</span>
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="glass-button h-20 flex-col space-y-2">
              <span className="text-2xl">📤</span>
              <span>Upload Evidence</span>
            </Button>
            <Button variant="outline" className="glass-button h-20 flex-col space-y-2">
              <span className="text-2xl">🔍</span>
              <span>Search Files</span>
            </Button>
            <Button variant="outline" className="glass-button h-20 flex-col space-y-2">
              <span className="text-2xl">👥</span>
              <span>Invite Team</span>
            </Button>
            <Button variant="outline" className="glass-button h-20 flex-col space-y-2">
              <span className="text-2xl">📊</span>
              <span>View Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
