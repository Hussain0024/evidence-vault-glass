
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scale, FileText, Shield, Clock } from 'lucide-react';

export function LegalSector() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Scale className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-4">Legal Sector Solutions</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive evidence management for legal professionals with court-admissible verification
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="glass-card">
            <CardHeader>
              <FileText className="w-8 h-8 text-blue-400 mb-2" />
              <CardTitle className="text-white">Digital Evidence</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Secure storage and verification of digital evidence including documents, images, videos, and communications with immutable blockchain timestamps.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <Shield className="w-8 h-8 text-green-400 mb-2" />
              <CardTitle className="text-white">Chain of Custody</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Maintain complete audit trails with automated chain of custody documentation that meets legal standards and court requirements.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <Clock className="w-8 h-8 text-purple-400 mb-2" />
              <CardTitle className="text-white">Time-Stamped Records</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Cryptographically secure timestamps ensure evidence integrity and provide verifiable proof of when evidence was collected and stored.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="glass-card p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Key Benefits for Legal Professionals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-3">Court Admissibility</h3>
              <p className="text-gray-400">
                Our blockchain-based verification system provides tamper-proof evidence that meets legal standards for court admissibility.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-3">Compliance Ready</h3>
              <p className="text-gray-400">
                Built-in compliance features ensure your evidence management meets regulatory requirements and industry standards.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-3">Secure Collaboration</h3>
              <p className="text-gray-400">
                Share evidence securely with colleagues, clients, and courts while maintaining complete control over access permissions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-3">Automated Documentation</h3>
              <p className="text-gray-400">
                Reduce manual work with automated evidence logging, metadata extraction, and compliance reporting.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            <Link to="/register">Start Managing Legal Evidence</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
