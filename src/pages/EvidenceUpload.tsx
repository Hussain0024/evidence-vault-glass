import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Upload, X, FileText, Image, Video, File } from 'lucide-react';
import { uploadEvidence } from '@/services/evidenceService';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { SubmissionSuccessDialog } from '@/components/EvidenceSubmission/SubmissionSuccessDialog';
import { WalletConnection } from '@/components/Blockchain/WalletConnection';

interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  evidenceId?: string;
}

export function EvidenceUpload() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [formData, setFormData] = useState({
    caseNumber: '',
    description: '',
    evidenceType: '',
    tags: ''
  });

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleFiles = async (fileList: File[]) => {
    if (!walletConnected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet before uploading evidence.",
        variant: "destructive",
      });
      return;
    }

    const newFiles: UploadedFile[] = fileList.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: 'uploading'
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Upload files one by one
    for (const uploadedFile of newFiles) {
      try {
        // Simulate progress
        const progressInterval = setInterval(() => {
          setFiles(prev => prev.map(f => 
            f.id === uploadedFile.id 
              ? { ...f, progress: Math.min(f.progress + Math.random() * 15, 90) }
              : f
          ));
        }, 200);

        // Actual upload
        const evidenceId = await uploadEvidence({
          file: uploadedFile.file,
          caseNumber: formData.caseNumber || undefined,
          evidenceType: formData.evidenceType,
          description: formData.description || undefined,
          tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : undefined
        });

        clearInterval(progressInterval);
        
        // Complete upload
        setFiles(prev => prev.map(f => 
          f.id === uploadedFile.id 
            ? { 
                ...f, 
                progress: 100, 
                status: 'completed',
                evidenceId
              }
            : f
        ));

        toast({
          title: "Evidence uploaded successfully",
          description: `${uploadedFile.file.name} has been submitted for blockchain verification.`,
        });

      } catch (error: any) {
        setFiles(prev => prev.map(f => 
          f.id === uploadedFile.id 
            ? { ...f, status: 'error', progress: 0 }
            : f
        ));

        toast({
          title: "Upload failed",
          description: error.message || 'Failed to upload evidence',
          variant: "destructive",
        });
      }
    }
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <Image className="h-8 w-8 text-blue-400" />;
    if (file.type.startsWith('video/')) return <Video className="h-8 w-8 text-purple-400" />;
    if (file.type === 'application/pdf') return <FileText className="h-8 w-8 text-red-400" />;
    return <File className="h-8 w-8 text-gray-400" />;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!walletConnected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet before submitting evidence.",
        variant: "destructive",
      });
      return;
    }

    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please upload at least one file.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.evidenceType) {
      toast({
        title: "Evidence type required",
        description: "Please select an evidence type.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Wait a moment to show the submitting state
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessDialog(true);
      
      toast({
        title: "Evidence package submitted",
        description: "Your evidence has been submitted for blockchain processing.",
      });
    }, 2000);
  };

  const handleViewEvidence = () => {
    setShowSuccessDialog(false);
    navigate('/evidence');
  };

  const handleContinueUpload = () => {
    setShowSuccessDialog(false);
    // Reset the form for new uploads
    setFiles([]);
    setFormData({
      caseNumber: '',
      description: '',
      evidenceType: '',
      tags: ''
    });
  };

  return (
    <>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Upload Evidence</h1>
          <p className="text-gray-400 mt-1">Securely upload and register evidence on the blockchain</p>
        </div>

        {/* Wallet Connection */}
        <WalletConnection onConnectionChange={setWalletConnected} />

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Evidence Metadata */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Evidence Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="caseNumber" className="text-white">Case Number</Label>
                  <Input
                    id="caseNumber"
                    value={formData.caseNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, caseNumber: e.target.value }))}
                    className="glass-button border-white/20 bg-white/5"
                    placeholder="e.g., CASE-2024-001"
                  />
                </div>
                
                <div>
                  <Label htmlFor="evidenceType" className="text-white">Evidence Type *</Label>
                  <Select value={formData.evidenceType} onValueChange={(value) => setFormData(prev => ({ ...prev, evidenceType: value }))}>
                    <SelectTrigger className="glass-button border-white/20 bg-white/5">
                      <SelectValue placeholder="Select evidence type" />
                    </SelectTrigger>
                    <SelectContent className="glass-card border-white/20">
                      <SelectItem value="document">Document</SelectItem>
                      <SelectItem value="photo">Photograph</SelectItem>
                      <SelectItem value="video">Video Recording</SelectItem>
                      <SelectItem value="audio">Audio Recording</SelectItem>
                      <SelectItem value="digital">Digital Evidence</SelectItem>
                      <SelectItem value="physical">Physical Evidence</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-white">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="glass-button border-white/20 bg-white/5"
                  placeholder="Provide a detailed description of the evidence..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="tags" className="text-white">Tags</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  className="glass-button border-white/20 bg-white/5"
                  placeholder="e.g., forensic, crime-scene, witness-statement (comma separated)"
                />
              </div>
            </CardContent>
          </Card>

          {/* File Upload Area */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Upload className="mr-2 h-5 w-5" />
                File Upload
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                  dragActive 
                    ? 'border-blue-500 bg-blue-500/10' 
                    : 'border-white/20 hover:border-white/30'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Upload className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      Drop your files here or click to browse
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Supports: PDF, Images, Videos, Documents (Max 100MB per file)
                    </p>
                    {!walletConnected && (
                      <p className="text-yellow-400 text-sm mt-2">
                        ⚠️ Connect your wallet to enable file uploads
                      </p>
                    )}
                  </div>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    id="file-upload"
                    onChange={(e) => {
                      if (e.target.files) {
                        handleFiles(Array.from(e.target.files));
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="glass-button"
                    disabled={!walletConnected}
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    Select Files
                  </Button>
                </div>
              </div>

              {/* Uploaded Files */}
              {files.length > 0 && (
                <div className="mt-6 space-y-4">
                  <h4 className="text-white font-medium">Uploaded Files</h4>
                  {files.map((uploadedFile) => (
                    <div key={uploadedFile.id} className="glass-button p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {getFileIcon(uploadedFile.file)}
                          <div>
                            <p className="text-white font-medium text-sm">
                              {uploadedFile.file.name}
                            </p>
                            <p className="text-gray-400 text-xs">
                              {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="outline"
                            className={
                              uploadedFile.status === 'completed' ? 'border-green-500 text-green-400' :
                              uploadedFile.status === 'processing' ? 'border-yellow-500 text-yellow-400' :
                              uploadedFile.status === 'error' ? 'border-red-500 text-red-400' :
                              'border-blue-500 text-blue-400'
                            }
                          >
                            {uploadedFile.status}
                          </Badge>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(uploadedFile.id)}
                            className="h-8 w-8 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <Progress value={uploadedFile.progress} className="h-2 mb-2" />
                      
                      {uploadedFile.evidenceId && (
                        <p className="text-xs text-green-400 font-mono">
                          Evidence ID: {uploadedFile.evidenceId}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              disabled={files.length === 0 || !formData.evidenceType || isSubmitting || !walletConnected}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Submitting Evidence...
                </div>
              ) : (
                'Submit Evidence'
              )}
            </Button>
          </div>
        </form>
      </div>

      <SubmissionSuccessDialog
        open={showSuccessDialog}
        onClose={handleContinueUpload}
        submittedFiles={files}
        onViewEvidence={handleViewEvidence}
      />
    </>
  );
}
