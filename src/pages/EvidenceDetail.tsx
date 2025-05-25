
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Download, Shield, Copy, Eye, Edit } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export function EvidenceDetail() {
  const { id } = useParams();
  const [isVerifying, setIsVerifying] = useState(false);

  // Mock data - in real app, fetch based on ID
  const evidence = {
    id: '1',
    fileName: 'crime_scene_photo_001.jpg',
    caseNumber: 'CASE-2024-001',
    type: 'Photograph',
    uploadDate: '2024-01-15 14:30',
    status: 'confirmed',
    blockchainTx: '0x1234567890abcdef1234567890abcdef12345678',
    uploader: 'John Doe',
    uploaderEmail: 'john.doe@police.gov',
    size: '2.4 MB',
    hash: 'sha256:a1b2c3d4e5f6789012345678901234567890abcdef123456789012345678901234',
    description: 'Crime scene photograph showing the main entrance of the building where the incident occurred. Timestamp shows 14:25 on January 15th, 2024.',
    tags: ['crime-scene', 'evidence', 'photograph', 'building'],
    metadata: {
      camera: 'Canon EOS R5',
      timestamp: '2024-01-15 14:25:33',
      location: '40.7128, -74.0060',
      resolution: '8192x5464',
      format: 'JPEG'
    }
  };

  const auditLog = [
    {
      id: 1,
      action: 'File uploaded',
      user: 'John Doe',
      timestamp: '2024-01-15 14:30:15',
      details: 'Initial upload and metadata entry'
    },
    {
      id: 2,
      action: 'Blockchain registration initiated',
      user: 'System',
      timestamp: '2024-01-15 14:30:45',
      details: 'Hash calculated and sent to blockchain'
    },
    {
      id: 3,
      action: 'Blockchain confirmation',
      user: 'System',
      timestamp: '2024-01-15 14:35:22',
      details: 'Transaction confirmed in block #1234567'
    },
    {
      id: 4,
      action: 'Metadata updated',
      user: 'Jane Smith',
      timestamp: '2024-01-15 15:10:00',
      details: 'Added location coordinates'
    }
  ];

  const handleVerifyIntegrity = async () => {
    setIsVerifying(true);
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsVerifying(false);
    toast({
      title: "Integrity verified",
      description: "File hash matches blockchain record. Evidence is authentic.",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Text has been copied to your clipboard.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/evidence">
            <Button variant="ghost" size="sm" className="glass-button">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Evidence
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold gradient-text">{evidence.fileName}</h1>
            <p className="text-gray-400 mt-1">Evidence ID: {evidence.id}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="glass-button">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" className="glass-button">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button 
            onClick={handleVerifyIntegrity}
            disabled={isVerifying}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            <Shield className="h-4 w-4 mr-2" />
            {isVerifying ? 'Verifying...' : 'Verify Integrity'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* File Preview */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Eye className="mr-2 h-5 w-5" />
                File Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <span className="text-6xl mb-4 block">📷</span>
                  <p className="text-gray-400">Image preview would appear here</p>
                  <p className="text-sm text-gray-500 mt-2">{evidence.fileName}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Information */}
          <Card className="glass-card">
            <CardContent className="p-0">
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3 glass-button">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
                  <TabsTrigger value="audit">Audit Log</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">File Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-400">File Name</label>
                          <p className="text-white">{evidence.fileName}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-400">File Size</label>
                          <p className="text-white">{evidence.size}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-400">Type</label>
                          <p className="text-white">{evidence.type}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-400">Upload Date</label>
                          <p className="text-white">{evidence.uploadDate}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-400">Description</label>
                      <p className="text-white">{evidence.description}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-400">Tags</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {evidence.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="border-blue-500 text-blue-400">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Metadata</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(evidence.metadata).map(([key, value]) => (
                          <div key={key}>
                            <label className="text-sm font-medium text-gray-400 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </label>
                            <p className="text-white">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="blockchain" className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 glass-button rounded-lg">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Blockchain Status</h3>
                        <p className="text-gray-400">Evidence is registered and verified on blockchain</p>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500">
                        Confirmed
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-400">Transaction Hash</label>
                        <div className="flex items-center space-x-2 mt-1">
                          <code className="text-sm text-blue-400 bg-gray-900 px-2 py-1 rounded flex-1">
                            {evidence.blockchainTx}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(evidence.blockchainTx)}
                            className="h-8 w-8 p-0"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-400">File Hash (SHA-256)</label>
                        <div className="flex items-center space-x-2 mt-1">
                          <code className="text-sm text-blue-400 bg-gray-900 px-2 py-1 rounded flex-1 break-all">
                            {evidence.hash}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(evidence.hash)}
                            className="h-8 w-8 p-0"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-400">Block Number</label>
                          <p className="text-white">#1,234,567</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-400">Confirmations</label>
                          <p className="text-white">15,432</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-400">Gas Used</label>
                          <p className="text-white">21,000</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-400">Timestamp</label>
                          <p className="text-white">2024-01-15 14:35:22 UTC</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="audit" className="p-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Activity History</h3>
                    <div className="space-y-4">
                      {auditLog.map((entry) => (
                        <div key={entry.id} className="flex items-start space-x-4 p-4 glass-button rounded-lg">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-white font-medium">{entry.action}</h4>
                              <span className="text-sm text-gray-400">{entry.timestamp}</span>
                            </div>
                            <p className="text-gray-400 text-sm mt-1">{entry.details}</p>
                            <p className="text-blue-400 text-sm">by {entry.user}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Case Information */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Case Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-400">Case Number</label>
                <Badge variant="outline" className="border-blue-500 text-blue-400 mt-1">
                  {evidence.caseNumber}
                </Badge>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-400">Uploader</label>
                <div className="mt-1">
                  <p className="text-white font-medium">{evidence.uploader}</p>
                  <p className="text-gray-400 text-sm">{evidence.uploaderEmail}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-400">Status</label>
                <div className="mt-1">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500">
                    Confirmed
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full glass-button justify-start">
                <Download className="h-4 w-4 mr-2" />
                Download File
              </Button>
              <Button variant="outline" className="w-full glass-button justify-start">
                <Copy className="h-4 w-4 mr-2" />
                Copy Hash
              </Button>
              <Button variant="outline" className="w-full glass-button justify-start">
                <Shield className="h-4 w-4 mr-2" />
                View Certificate
              </Button>
              <Button variant="outline" className="w-full glass-button justify-start">
                <Edit className="h-4 w-4 mr-2" />
                Edit Metadata
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
