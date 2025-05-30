
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { Upload, Search, Users, BarChart3 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { EvidenceRecord } from '@/services/evidenceService';

interface DashboardStats {
  totalEvidence: number;
  verifiedEvidence: number;
  pendingEvidence: number;
  processingEvidence: number;
}

interface RecentActivity {
  id: string;
  action: string;
  file_name?: string;
  evidence_type?: string;
  created_at: string;
  status?: string;
}

export function UserDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalEvidence: 0,
    verifiedEvidence: 0,
    pendingEvidence: 0,
    processingEvidence: 0
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [recentEvidence, setRecentEvidence] = useState<EvidenceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  if (!user) {
    return <Navigate to="/dashboard" replace />;
  }

  useEffect(() => {
    loadDashboardData();
    setupRealtimeSubscriptions();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load evidence stats
      const { data: evidence, error: evidenceError } = await supabase
        .from('evidence')
        .select('*')
        .eq('user_id', user.id);

      if (evidenceError) throw evidenceError;

      const evidenceData = evidence || [];
      setStats({
        totalEvidence: evidenceData.length,
        verifiedEvidence: evidenceData.filter(e => e.status === 'verified').length,
        pendingEvidence: evidenceData.filter(e => e.status === 'pending').length,
        processingEvidence: evidenceData.filter(e => e.status === 'processing').length
      });

      // Load recent evidence
      setRecentEvidence(evidenceData.slice(0, 5));

      // Load recent activity from audit logs
      const { data: auditLogs, error: auditError } = await supabase
        .from('audit_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (auditError) throw auditError;

      const activities: RecentActivity[] = (auditLogs || []).map(log => ({
        id: log.id,
        action: log.action,
        file_name: log.details?.file_name,
        evidence_type: log.details?.evidence_type,
        created_at: log.created_at,
        status: log.details?.status
      }));

      setRecentActivity(activities);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setupRealtimeSubscriptions = () => {
    // Subscribe to evidence changes
    const evidenceChannel = supabase
      .channel('dashboard-evidence')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'evidence',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          loadDashboardData(); // Reload stats when evidence changes
        }
      )
      .subscribe();

    // Subscribe to audit log changes
    const auditChannel = supabase
      .channel('dashboard-audit')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'audit_logs',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          const newActivity: RecentActivity = {
            id: payload.new.id,
            action: payload.new.action,
            file_name: payload.new.details?.file_name,
            evidence_type: payload.new.details?.evidence_type,
            created_at: payload.new.created_at,
            status: payload.new.details?.status
          };
          
          setRecentActivity(prev => [newActivity, ...prev.slice(0, 4)]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(evidenceChannel);
      supabase.removeChannel(auditChannel);
    };
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes} min ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} hr ago`;
    return date.toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-500/20 text-green-400';
      case 'processing': return 'bg-yellow-500/20 text-yellow-400';
      case 'failed': return 'bg-red-500/20 text-red-400';
      default: return 'bg-blue-500/20 text-blue-400';
    }
  };

  const verificationRate = stats.totalEvidence > 0 
    ? Math.round((stats.verifiedEvidence / stats.totalEvidence) * 100) 
    : 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-white">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back, {user.name}! Here's your evidence overview.</p>
        </div>
        <Link to="/upload">
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            <Upload className="mr-2 h-4 w-4" />
            Upload Evidence
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card animate-scale-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Total Evidence
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalEvidence}</div>
            <p className="text-xs text-gray-400 mt-1">Evidence files uploaded</p>
          </CardContent>
        </Card>

        <Card className="glass-card animate-scale-in" style={{ animationDelay: '100ms' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Verified
            </CardTitle>
            <div className="h-4 w-4 bg-green-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.verifiedEvidence}</div>
            <p className="text-xs text-gray-400 mt-1">Blockchain verified</p>
          </CardContent>
        </Card>

        <Card className="glass-card animate-scale-in" style={{ animationDelay: '200ms' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Processing
            </CardTitle>
            <div className="h-4 w-4 bg-yellow-500 rounded-full animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.processingEvidence}</div>
            <p className="text-xs text-gray-400 mt-1">Being processed</p>
          </CardContent>
        </Card>

        <Card className="glass-card animate-scale-in" style={{ animationDelay: '300ms' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Pending
            </CardTitle>
            <div className="h-4 w-4 bg-blue-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.pendingEvidence}</div>
            <p className="text-xs text-gray-400 mt-1">Awaiting verification</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 glass-button rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                      <div>
                        <p className="text-white font-medium">{activity.action}</p>
                        {activity.file_name && (
                          <p className="text-sm text-gray-400">{activity.file_name}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      {activity.status && (
                        <Badge variant="outline" className={getStatusColor(activity.status)}>
                          {activity.status}
                        </Badge>
                      )}
                      <p className="text-xs text-gray-400 mt-1">{formatTimestamp(activity.created_at)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">No recent activity</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300">Verification Rate</span>
                <span className="text-sm text-green-400">{verificationRate}%</span>
              </div>
              <Progress value={verificationRate} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300">Storage Used</span>
                <span className="text-sm text-blue-400">
                  {recentEvidence.reduce((acc, e) => acc + e.file_size, 0) / (1024 * 1024) < 1 
                    ? '< 1 MB' 
                    : `${(recentEvidence.reduce((acc, e) => acc + e.file_size, 0) / (1024 * 1024)).toFixed(1)} MB`}
                </span>
              </div>
              <Progress value={25} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">API Status</span>
                <Badge className="bg-green-500/20 text-green-400">Operational</Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Blockchain</span>
                <Badge className="bg-green-500/20 text-green-400">Synced</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded mr-2" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/upload">
              <Button variant="outline" className="glass-button h-20 w-full flex-col space-y-2">
                <Upload className="h-6 w-6" />
                <span>Upload Evidence</span>
              </Button>
            </Link>
            <Link to="/evidence">
              <Button variant="outline" className="glass-button h-20 w-full flex-col space-y-2">
                <Search className="h-6 w-6" />
                <span>View Evidence</span>
              </Button>
            </Link>
            <Link to="/tracking">
              <Button variant="outline" className="glass-button h-20 w-full flex-col space-y-2">
                <BarChart3 className="h-6 w-6" />
                <span>Track Progress</span>
              </Button>
            </Link>
            <Link to="/audit">
              <Button variant="outline" className="glass-button h-20 w-full flex-col space-y-2">
                <Users className="h-6 w-6" />
                <span>Audit Log</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
