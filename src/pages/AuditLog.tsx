
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Search, Download, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface AuditLogEntry {
  id: string;
  user_id: string | null;
  evidence_id: string | null;
  action: string;
  details: any;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

export function AuditLog() {
  const { user } = useAuth();
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    loadAuditLogs();
    setupRealtimeSubscription();
  }, []);

  const loadAuditLogs = async () => {
    try {
      let query = supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      // Non-admin users can only see their own logs
      if (!isAdmin) {
        query = query.eq('user_id', user.id);
      }

      const { data, error } = await query;

      if (error) throw error;
      setAuditLogs(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading audit logs",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('audit-logs-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'audit_logs'
        },
        (payload) => {
          const newLog = payload.new as AuditLogEntry;
          
          // Only add if it's relevant to current user (unless admin)
          if (isAdmin || newLog.user_id === user.id) {
            setAuditLogs(prev => [newLog, ...prev.slice(0, 99)]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const getSeverityFromAction = (action: string) => {
    if (action.includes('Failed') || action.includes('Error')) return 'error';
    if (action.includes('Login') || action.includes('Logout')) return 'warning';
    return 'info';
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details?.file_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const severity = getSeverityFromAction(log.action);
    const matchesFilter = filterType === 'all' || severity === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'bg-red-500/20 text-red-400 border-red-500';
      case 'warning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const exportLogs = () => {
    const csvContent = [
      'Timestamp,Action,User ID,Evidence ID,Details,IP Address',
      ...filteredLogs.map(log => [
        log.created_at,
        log.action,
        log.user_id || '',
        log.evidence_id || '',
        JSON.stringify(log.details || {}),
        log.ip_address || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-log-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-white">Loading audit logs...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Audit Log</h1>
          <p className="text-gray-400 mt-1">
            {isAdmin ? 'System-wide activity monitoring' : 'Your activity history'}
          </p>
        </div>
        <Button 
          onClick={exportLogs}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Log
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search activities, users, or files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass-button border-white/20 bg-white/5"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterType === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterType('all')}
                className={filterType === 'all' ? '' : 'glass-button'}
              >
                All
              </Button>
              <Button
                variant={filterType === 'info' ? 'default' : 'outline'}
                onClick={() => setFilterType('info')}
                className={filterType === 'info' ? '' : 'glass-button'}
              >
                Info
              </Button>
              <Button
                variant={filterType === 'warning' ? 'default' : 'outline'}
                onClick={() => setFilterType('warning')}
                className={filterType === 'warning' ? '' : 'glass-button'}
              >
                Warning
              </Button>
              <Button
                variant={filterType === 'error' ? 'default' : 'outline'}
                onClick={() => setFilterType('error')}
                className={filterType === 'error' ? '' : 'glass-button'}
              >
                Error
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Log Table */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Activity Log ({filteredLogs.length} entries)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLogs.map((log) => {
              const severity = getSeverityFromAction(log.action);
              
              return (
                <div 
                  key={log.id} 
                  className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant="outline"
                        className={getSeverityColor(severity)}
                      >
                        {severity}
                      </Badge>
                      <h3 className="font-medium text-white">{log.action}</h3>
                    </div>
                    <time className="text-sm text-gray-400">
                      {formatTimestamp(log.created_at)}
                    </time>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    {log.details?.email && (
                      <div>
                        <span className="text-gray-400">Email: </span>
                        <span className="text-white">{log.details.email}</span>
                      </div>
                    )}
                    {log.details?.file_name && (
                      <div>
                        <span className="text-gray-400">File: </span>
                        <span className="text-white">{log.details.file_name}</span>
                      </div>
                    )}
                    {log.details?.case_number && (
                      <div>
                        <span className="text-gray-400">Case: </span>
                        <span className="text-white">{log.details.case_number}</span>
                      </div>
                    )}
                    {isAdmin && log.ip_address && (
                      <div>
                        <span className="text-gray-400">IP: </span>
                        <span className="text-white">{log.ip_address}</span>
                      </div>
                    )}
                  </div>
                  
                  {log.details?.blockchain_tx && (
                    <div className="mt-2">
                      <span className="text-gray-400 text-sm">Blockchain TX: </span>
                      <span className="text-green-400 text-sm font-mono">
                        {log.details.blockchain_tx}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {filteredLogs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">No audit log entries found matching your search criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
