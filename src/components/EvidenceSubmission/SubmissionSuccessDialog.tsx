
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SubmissionSuccessDialogProps {
  open: boolean;
  onClose: () => void;
  submittedFiles: Array<{
    id: string;
    file: File;
    evidenceId?: string;
  }>;
  onViewEvidence: () => void;
}

export function SubmissionSuccessDialog({ 
  open, 
  onClose, 
  submittedFiles, 
  onViewEvidence 
}: SubmissionSuccessDialogProps) {
  const totalFiles = submittedFiles.length;
  const successfulSubmissions = submittedFiles.filter(f => f.evidenceId).length;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass-card border-white/20 max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-center text-white text-xl">
            Evidence Successfully Submitted!
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center">
            <p className="text-gray-300 mb-4">
              Your evidence has been securely uploaded and is now being processed for blockchain verification.
            </p>
            
            <div className="flex justify-center space-x-4 mb-4">
              <Badge variant="outline" className="border-green-500 text-green-400">
                {successfulSubmissions} of {totalFiles} files submitted
              </Badge>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h4 className="text-white font-medium mb-2">What happens next?</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Files are being verified and hashed</li>
              <li>• Blockchain registration in progress</li>
              <li>• You'll receive notifications on completion</li>
            </ul>
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={onViewEvidence}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Eye className="mr-2 h-4 w-4" />
              View Evidence
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 glass-button border-white/20"
            >
              Continue Upload
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
