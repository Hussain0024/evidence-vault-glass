
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, Eye, Download, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { getEvidence, downloadEvidence, EvidenceRecord } from '@/services/evidenceService';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export function EvidenceTracking() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [evidenceItems, setEvidenceItems] = useState<EvidenceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    loadEvidenceData();
    setupRealtimeSubscription();
  }, []);

  const loadEvidenceData = async () => {
    try {
      const data = await getEvidence();
      setEvidenceItems(data);
    } catch (error: any) {
      toast({
        title: "Error loading evidence",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('evidence-tracking')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'evidence',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Evidence update:', payload);
          
          if (payload.eventType === 'INSERT') {
            setEvidenceItems(prev => [payload.new as EvidenceRecord, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setEvidenceItems(prev => prev.map(item => 
              item.id === payload.new.id ? payload.new as EvidenceRecord : item
            ));
          } else if (payload.eventType === 'DELETE') {
            setEvidenceItems(prev => prev.filter(item => item.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleDownload = async (evidenceRecord: EvidenceRecord) => {
    try {
      const signedUrl = await downloadEvidence(evidenceRecord.id, evidenceRecord.file_path);
      window.open(signedUrl, '_blank');
    } catch (error: any) {
      toast({
        title: "Download failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const filteredEvidence = evidenceItems.filter(item => {
    const matchesSearch = 
      item.file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.case_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.evidence_type.toLowerCase().includes(searchTerm.toLowerCase());
    
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
    if (type.includes('image')) return '🖼️';
    if (type.includes('video')) return '🎥';
    if (type.includes('pdf') || type.includes('document')) return '📄';
    return '📁';
  };

  const formatTimestamp = (timestamp: string | null) => {
    if (!timestamp) return 'Pending';
    return new Date(timestamp).toLocaleString();
  };

  const getVerificationSteps = (evidence: EvidenceRecord) => {
    const steps = [
      { 
        step: 'File Upload', 
        completed: true, 
        timestamp: evidence.created_at 
      },
      { 
        step: 'Hash Generation', 
        completed: evidence.verification_progress >= 25, 
        timestamp: evidence.verification_progress >= 25 ? evidence.updated_at : null 
      },
      { 
        step: 'Blockchain Registration', 
        completed: evidence.verification_progress >= 75, 
        timestamp: evidence.verification_progress >= 75 ? evidence.updated_at : null 
      },
      { 
        step: 'Verification Complete', 
        completed: evidence.status === 'verified', 
        timestamp: evidence.status === 'verified' ? evidence.updated_at : null 
      }
    ];
    return steps;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-white">Loading evidence tracking...</span>
        </div>
      </div>
    );
  }

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
                  <span className="text-2xl" role="img" aria-label={`File type: ${item.file_type}`}>
                    {getFileTypeIcon(item.file_type)}
                  </span>
                  <div>
                    <h3 className="font-medium text-white">{item.file_name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                      <span>Size: {(item.file_size / 1024 / 1024).toFixed(2)} MB</span>
                      <span>Uploaded: {formatTimestamp(item.created_at)}</span>
                      {item.case_number && <span>Case: {item.case_number}</span>}
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
                  <Link to={`/evidence/${item.id}`}>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="glass-button"
                      aria-label={`View details for ${item.file_name}`}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  {item.status === 'verified' && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="glass-button"
                      onClick={() => handleDownload(item)}
                      aria-label={`Download ${item.file_name}`}
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
                  <span className="text-sm text-white">{item.verification_progress}%</span>
                </div>
                <Progress 
                  value={item.verification_progress} 
                  className="h-2"
                  aria-label={`Verification progress: ${item.verification_progress}%`}
                />
              </div>

              {/* Blockchain Hash */}
              {item.blockchain_tx && (
                <div className="mb-4">
                  <span className="text-sm text-gray-400">Blockchain Hash: </span>
                  <code className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
                    {item.blockchain_tx}
                  </code>
                </div>
              )}

              {/* SHA-256 Hash */}
              <div className="mb-4">
                <span className="text-sm text-gray-400">File Hash (SHA-256): </span>
                <code className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded break-all">
                  {item.hash_sha256}
                </code>
              </div>

              {/* Verification Steps */}
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-3">Verification Timeline</h4>
                <div className="space-y-2">
                  {getVerificationSteps(item).map((step, index) => (
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
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No evidence found</h3>
            <p className="text-gray-400 mb-4">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.' 
                : 'Start by uploading your first piece of evidence.'}
            </p>
            <Link to="/upload">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Upload Evidence
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
