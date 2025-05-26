
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, Filter, Eye, Download, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

export function EvidenceTracking() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock evidence tracking data
  const evidenceItems = [
    {
      id: '1',
      filename: 'case_001_document.pdf',
      uploadDate: '2024-01-15T10:30:00Z',
      size: '2.4 MB',
      type: 'document',
      status: 'verified',
      verificationProgress: 100,
      blockchainHash: '0x1a2b3c4d5e6f7890abcdef1234567890',
      verificationSteps: [
        { step: 'File Upload', completed: true, timestamp: '2024-01-15T10:30:00Z' },
        { step: 'Hash Generation', completed: true, timestamp: '2024-01-15T10:31:00Z' },
        { step: 'Blockchain Registration', completed: true, timestamp: '2024-01-15T10:32:00Z' },
        { step: 'Verification Complete', completed: true, timestamp: '2024-01-15T10:33:00Z' }
      ]
    },
    {
      id: '2',
      filename: 'security_footage.mp4',
      uploadDate: '2024-01-15T11:00:00Z',
      size: '156.7 MB',
      type: 'video',
      status: 'processing',
      verificationProgress: 65,
      blockchainHash: null,
      verificationSteps: [
        { step: 'File Upload', completed: true, timestamp: '2024-01-15T11:00:00Z' },
        { step: 'Hash Generation', completed: true, timestamp: '2024-01-15T11:02:00Z' },
        { step: 'Blockchain Registration', completed: false, timestamp: null },
        { step: 'Verification Complete', completed: false, timestamp: null }
      ]
    },
    {
      id: '3',
      filename: 'witness_statement.pdf',
      uploadDate: '2024-01-15T11:15:00Z',
      size: '1.8 MB',
      type: 'document',
      status: 'failed',
      verificationProgress: 25,
      blockchainHash: null,
      verificationSteps: [
        { step: 'File Upload', completed: true, timestamp: '2024-01-15T11:15:00Z' },
        { step: 'Hash Generation', completed: false, timestamp: null },
        { step: 'Blockchain Registration', completed: false, timestamp: null },
        { step: 'Verification Complete', completed: false, timestamp: null }
      ]
    },
    {
      id: '4',
      filename: 'forensic_analysis.jpg',
      uploadDate: '2024-01-15T11:30:00Z',
      size: '8.2 MB',
      type: 'image',
      status: 'pending',
      verificationProgress: 0,
      blockchainHash: null,
      verificationSteps: [
        { step: 'File Upload', completed: false, timestamp: null },
        { step: 'Hash Generation', completed: false, timestamp: null },
        { step: 'Blockchain Registration', completed: false, timestamp: null },
        { step: 'Verification Complete', completed: false, timestamp: null }
      ]
    }
  ];

  const filteredEvidence = evidenceItems.filter(item => {
    const matchesSearch = item.filename.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'processing': return 'bg-blue-500/20 text-blue-400 border-blue-500';
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-500';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-4 h-4" />;
      case 'processing': return <Clock className="w-4 h-4" />;
      case 'failed': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case 'document': return '📄';
      case 'video': return '🎥';
      case 'image': return '🖼️';
      default: return '📁';
    }
  };

  const formatTimestamp = (timestamp: string | null) => {
    if (!timestamp) return 'Pending';
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Evidence Tracking</h1>
          <p className="text-gray-400 mt-1">Monitor blockchain verification status of your evidence</p>
        </div>
        <Badge 
          variant="outline" 
          className="text-blue-400 border-blue-500"
          aria-label={`Total evidence files: ${evidenceItems.length}`}
        >
          {evidenceItems.length} Files
        </Badge>
      </div>

      {/* Search and Filter */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search evidence files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass-button border-white/20 bg-white/5"
                aria-label="Search evidence files"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('all')}
                className={statusFilter === 'all' ? '' : 'glass-button'}
                aria-label="Show all files"
              >
                All
              </Button>
              <Button
                variant={statusFilter === 'verified' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('verified')}
                className={statusFilter === 'verified' ? '' : 'glass-button'}
                aria-label="Show verified files"
              >
                Verified
              </Button>
              <Button
                variant={statusFilter === 'processing' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('processing')}
                className={statusFilter === 'processing' ? '' : 'glass-button'}
                aria-label="Show processing files"
              >
                Processing
              </Button>
              <Button
                variant={statusFilter === 'failed' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('failed')}
                className={statusFilter === 'failed' ? '' : 'glass-button'}
                aria-label="Show failed files"
              >
                Failed
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Evidence List */}
      <div className="space-y-4">
        {filteredEvidence.map((item) => (
          <Card key={item.id} className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl" role="img" aria-label={`File type: ${item.type}`}>
                    {getFileTypeIcon(item.type)}
                  </span>
                  <div>
                    <h3 className="font-medium text-white">{item.filename}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                      <span>Size: {item.size}</span>
                      <span>Uploaded: {formatTimestamp(item.uploadDate)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant="outline"
                    className={getStatusColor(item.status)}
                    aria-label={`Status: ${item.status}`}
                  >
                    {getStatusIcon(item.status)}
                    <span className="ml-1">{item.status}</span>
                  </Badge>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="glass-button"
                    aria-label={`View details for ${item.filename}`}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  {item.status === 'verified' && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="glass-button"
                      aria-label={`Download ${item.filename}`}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Verification Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Verification Progress</span>
                  <span className="text-sm text-white">{item.verificationProgress}%</span>
                </div>
                <Progress 
                  value={item.verificationProgress} 
                  className="h-2"
                  aria-label={`Verification progress: ${item.verificationProgress}%`}
                />
              </div>

              {/* Blockchain Hash */}
              {item.blockchainHash && (
                <div className="mb-4">
                  <span className="text-sm text-gray-400">Blockchain Hash: </span>
                  <code className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
                    {item.blockchainHash}
                  </code>
                </div>
              )}

              {/* Verification Steps */}
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-3">Verification Timeline</h4>
                <div className="space-y-2">
                  {item.verificationSteps.map((step, index) => (
                    <div 
                      key={index}
                      className={`flex items-center space-x-3 text-sm ${
                        step.completed ? 'text-green-400' : 'text-gray-400'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        step.completed ? 'bg-green-400' : 'bg-gray-600'
                      }`} role="img" aria-label={step.completed ? 'Completed' : 'Pending'}></div>
                      <span className="flex-1">{step.step}</span>
                      <span className="text-xs">
                        {formatTimestamp(step.timestamp)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvidence.length === 0 && (
        <Card className="glass-card">
          <CardContent className="text-center py-8">
            <p className="text-gray-400">No evidence files found matching your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
