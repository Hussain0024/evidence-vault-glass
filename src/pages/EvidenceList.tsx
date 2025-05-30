
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { Search, Download, Eye, Filter } from 'lucide-react';
import { getEvidence, downloadEvidence, EvidenceRecord } from '@/services/evidenceService';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export function EvidenceList() {
  const { user } = useAuth();
  const [evidence, setEvidence] = useState<EvidenceRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    loadEvidence();
    setupRealtimeSubscription();
  }, []);

  const loadEvidence = async () => {
    try {
      const data = await getEvidence();
      setEvidence(data);
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
      .channel('evidence-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'evidence'
        },
        (payload) => {
          console.log('Evidence update:', payload);
          
          if (payload.eventType === 'INSERT') {
            setEvidence(prev => [payload.new as EvidenceRecord, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setEvidence(prev => prev.map(item => 
              item.id === payload.new.id ? payload.new as EvidenceRecord : item
            ));
          } else if (payload.eventType === 'DELETE') {
            setEvidence(prev => prev.filter(item => item.id !== payload.old.id));
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

  const filteredEvidence = evidence.filter(item => {
    const matchesSearch = 
      item.file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.case_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.evidence_type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'processing': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-500';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500';
    }
  };

  const formatFileSize = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-white">Loading evidence...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Evidence List</h1>
          <p className="text-gray-400 mt-1">Manage and track your uploaded evidence</p>
        </div>
        <Link to="/upload">
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            Upload Evidence
          </Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by filename, case number, or evidence type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass-button border-white/20 bg-white/5"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('all')}
                className={filterStatus === 'all' ? '' : 'glass-button'}
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'pending' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('pending')}
                className={filterStatus === 'pending' ? '' : 'glass-button'}
              >
                Pending
              </Button>
              <Button
                variant={filterStatus === 'verified' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('verified')}
                className={filterStatus === 'verified' ? '' : 'glass-button'}
              >
                Verified
              </Button>
              <Button
                variant={filterStatus === 'processing' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('processing')}
                className={filterStatus === 'processing' ? '' : 'glass-button'}
              >
                Processing
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Evidence Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEvidence.map((item) => (
          <Card key={item.id} className="glass-card hover:bg-white/10 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-white text-lg truncate">
                    {item.file_name}
                  </CardTitle>
                  <p className="text-gray-400 text-sm mt-1">
                    {item.evidence_type} • {formatFileSize(item.file_size)}
                  </p>
                </div>
                <Badge variant="outline" className={getStatusColor(item.status)}>
                  {item.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {item.case_number && (
                <div>
                  <span className="text-gray-400 text-sm">Case: </span>
                  <span className="text-white text-sm">{item.case_number}</span>
                </div>
              )}
              
              {item.description && (
                <p className="text-gray-300 text-sm line-clamp-2">
                  {item.description}
                </p>
              )}
              
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {item.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{item.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}
              
              {item.blockchain_tx && (
                <div>
                  <span className="text-gray-400 text-xs">Blockchain TX: </span>
                  <span className="text-green-400 text-xs font-mono">
                    {item.blockchain_tx.substring(0, 20)}...
                  </span>
                </div>
              )}
              
              <div className="text-gray-400 text-xs">
                Uploaded: {formatDate(item.created_at)}
              </div>
              
              <div className="flex gap-2 pt-2">
                <Link to={`/evidence/${item.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full glass-button">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="glass-button"
                  onClick={() => handleDownload(item)}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvidence.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">No evidence found</h3>
          <p className="text-gray-400 mb-4">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filter criteria.' 
              : 'Start by uploading your first piece of evidence.'}
          </p>
          <Link to="/upload">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              Upload Evidence
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
