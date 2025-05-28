
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowLeft, Building, FileText, Shield, Eye } from 'lucide-react';

export function GovernmentSector() {
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
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-4">Government Sector Solutions</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Transparent and accountable evidence management for public records, investigations, and official documentation
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="glass-card">
            <CardHeader>
              <FileText className="w-8 h-8 text-red-400 mb-2" />
              <CardTitle className="text-white">Public Records</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Secure and transparent management of public records with immutable blockchain verification for citizen trust.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <Shield className="w-8 h-8 text-blue-400 mb-2" />
              <CardTitle className="text-white">Investigation Evidence</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Maintain chain of custody for investigation evidence with tamper-proof documentation and secure access controls.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <Eye className="w-8 h-8 text-purple-400 mb-2" />
              <CardTitle className="text-white">Transparency & Accountability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Enhance public trust with transparent evidence management and verifiable audit trails for government operations.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="glass-card p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Government-Specific Advantages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-3">Public Trust</h3>
              <p className="text-gray-400">
                Build citizen confidence with transparent, verifiable records that demonstrate government accountability and integrity.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-3">Evidence Integrity</h3>
              <p className="text-gray-400">
                Ensure investigation evidence remains untampered with blockchain verification and comprehensive audit trails.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-3">Regulatory Compliance</h3>
              <p className="text-gray-400">
                Meet government standards and regulations with automated compliance reporting and secure documentation.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-3">Inter-Agency Collaboration</h3>
              <p className="text-gray-400">
                Facilitate secure information sharing between government agencies while maintaining proper access controls.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" asChild className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700">
            <Link to="/register">Enhance Government Transparency</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
