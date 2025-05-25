
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Download, Eye, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Evidence {
  id: string;
  fileName: string;
  caseNumber: string;
  type: string;
  uploadDate: string;
  status: 'pending' | 'confirmed' | 'failed';
  blockchainTx?: string;
  uploader: string;
  size: string;
  hash: string;
}

const mockEvidence: Evidence[] = [
  {
    id: '1',
    fileName: 'crime_scene_photo_001.jpg',
    caseNumber: 'CASE-2024-001',
    type: 'Photograph',
    uploadDate: '2024-01-15 14:30',
    status: 'confirmed',
    blockchainTx: '0x1234...5678',
    uploader: 'John Doe',
    size: '2.4 MB',
    hash: 'sha256:a1b2c3...'
  },
  {
    id: '2',
    fileName: 'witness_statement.pdf',
    caseNumber: 'CASE-2024-002',
    type: 'Document',
    uploadDate: '2024-01-14 09:15',
    status: 'pending',
    uploader: 'Jane Smith',
    size: '156 KB',
    hash: 'sha256:d4e5f6...'
  },
  {
    id: '3',
    fileName: 'security_footage.mp4',
    caseNumber: 'CASE-2024-001',
    type: 'Video',
    uploadDate: '2024-01-13 16:45',
    status: 'confirmed',
    blockchainTx: '0x9876...4321',
    uploader: 'Mike Johnson',
    size: '45.2 MB',
    hash: 'sha256:g7h8i9...'
  },
  {
    id: '4',
    fileName: 'forensic_report.pdf',
    caseNumber: 'CASE-2024-003',
    type: 'Document',
    uploadDate: '2024-01-12 11:20',
    status: 'failed',
    uploader: 'Sarah Wilson',
    size: '890 KB',
    hash: 'sha256:j1k2l3...'
  }
];

export function EvidenceList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredEvidence = mockEvidence.filter(evidence => {
    const matchesSearch = evidence.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evidence.caseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || evidence.status === statusFilter;
    const matchesType = typeFilter === 'all' || evidence.type.toLowerCase() === typeFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: Evidence['status']) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500">Failed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'photograph':
        return '📷';
      case 'document':
        return '📄';
      case 'video':
        return '🎥';
      case 'audio':
        return '🎵';
      default:
        return '📁';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Evidence Management</h1>
        <p className="text-gray-400 mt-1">Manage and track all evidence files</p>
      </div>

      {/* Filters */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search evidence files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass-button border-white/20 bg-white/5"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px] glass-button border-white/20 bg-white/5">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="glass-card border-white/20">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[160px] glass-button border-white/20 bg-white/5">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent className="glass-card border-white/20">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="photograph">Photograph</SelectItem>
                <SelectItem value="document">Document</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="glass-button">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Evidence Table */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Evidence Files ({filteredEvidence.length})</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" className="glass-button">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
                <span className="mr-2">📤</span>
                Upload New
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-gray-300">File</TableHead>
                  <TableHead className="text-gray-300">Case</TableHead>
                  <TableHead className="text-gray-300">Type</TableHead>
                  <TableHead className="text-gray-300">Upload Date</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Uploader</TableHead>
                  <TableHead className="text-gray-300">Size</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvidence.map((evidence) => (
                  <TableRow key={evidence.id} className="border-white/10 hover:bg-white/5">
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{getTypeIcon(evidence.type)}</span>
                        <div>
                          <p className="text-white font-medium">{evidence.fileName}</p>
                          {evidence.blockchainTx && (
                            <p className="text-xs text-gray-400 font-mono">
                              TX: {evidence.blockchainTx}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-blue-500 text-blue-400">
                        {evidence.caseNumber}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-300">{evidence.type}</TableCell>
                    <TableCell className="text-gray-300">{evidence.uploadDate}</TableCell>
                    <TableCell>{getStatusBadge(evidence.status)}</TableCell>
                    <TableCell className="text-gray-300">{evidence.uploader}</TableCell>
                    <TableCell className="text-gray-300">{evidence.size}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Link to={`/evidence/${evidence.id}`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-400 hover:text-red-300">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
