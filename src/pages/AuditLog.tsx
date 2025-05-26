
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Search, Filter, Download, Clock } from 'lucide-react';

export function AuditLog() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const isAdmin = user?.role === 'admin';

  // Mock audit data - in real app this would come from API
  const auditLogs = [
    {
      id: '1',
      timestamp: '2024-01-15T10:30:00Z',
      user: 'John Doe',
      action: 'Evidence Upload',
      resource: 'case_001_document.pdf',
      details: 'Uploaded evidence file with blockchain verification',
      severity: 'info',
      ipAddress: '192.168.1.100'
    },
    {
      id: '2',
      timestamp: '2024-01-15T10:25:00Z',
      user: 'Admin',
      action: 'User Created',
      resource: 'jane.smith@company.com',
      details: 'New user account created with user role',
      severity: 'info',
      ipAddress: '192.168.1.1'
    },
    {
      id: '3',
      timestamp: '2024-01-15T10:20:00Z',
      user: 'System',
      action: 'Verification Failed',
      resource: 'evidence_photo_052.jpg',
      details: 'Blockchain verification failed - file may be corrupted',
      severity: 'error',
      ipAddress: 'system'
    },
    {
      id: '4',
      timestamp: '2024-01-15T10:15:00Z',
      user: 'Jane Smith',
      action: 'Login',
      resource: 'User Session',
      details: 'Successful login from new device',
      severity: 'warning',
      ipAddress: '192.168.1.150'
    },
    {
      id: '5',
      timestamp: '2024-01-15T10:10:00Z',
      user: 'John Doe',
      action: 'Evidence Downloaded',
      resource: 'forensic_report.pdf',
      details: 'Evidence file downloaded for case review',
      severity: 'info',
      ipAddress: '192.168.1.100'
    }
  ];

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || log.severity === filterType;
    
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
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          aria-label="Export audit log"
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
                placeholder="Search activities, users, or resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass-button border-white/20 bg-white/5"
                aria-label="Search audit log entries"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterType === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterType('all')}
                className={filterType === 'all' ? '' : 'glass-button'}
                aria-label="Show all log entries"
              >
                All
              </Button>
              <Button
                variant={filterType === 'info' ? 'default' : 'outline'}
                onClick={() => setFilterType('info')}
                className={filterType === 'info' ? '' : 'glass-button'}
                aria-label="Show info level entries"
              >
                Info
              </Button>
              <Button
                variant={filterType === 'warning' ? 'default' : 'outline'}
                onClick={() => setFilterType('warning')}
                className={filterType === 'warning' ? '' : 'glass-button'}
                aria-label="Show warning level entries"
              >
                Warning
              </Button>
              <Button
                variant={filterType === 'error' ? 'default' : 'outline'}
                onClick={() => setFilterType('error')}
                className={filterType === 'error' ? '' : 'glass-button'}
                aria-label="Show error level entries"
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
            {filteredLogs.map((log) => (
              <div 
                key={log.id} 
                className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                role="article"
                aria-labelledby={`log-action-${log.id}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Badge 
                      variant="outline"
                      className={getSeverityColor(log.severity)}
                      aria-label={`Severity: ${log.severity}`}
                    >
                      {log.severity}
                    </Badge>
                    <h3 id={`log-action-${log.id}`} className="font-medium text-white">{log.action}</h3>
                  </div>
                  <time 
                    dateTime={log.timestamp}
                    className="text-sm text-gray-400"
                    aria-label={`Timestamp: ${formatTimestamp(log.timestamp)}`}
                  >
                    {formatTimestamp(log.timestamp)}
                  </time>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">User: </span>
                    <span className="text-white">{log.user}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Resource: </span>
                    <span className="text-white">{log.resource}</span>
                  </div>
                  {isAdmin && (
                    <div>
                      <span className="text-gray-400">IP Address: </span>
                      <span className="text-white">{log.ipAddress}</span>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-300 mt-2">{log.details}</p>
              </div>
            ))}
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
