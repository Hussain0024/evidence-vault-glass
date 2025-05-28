
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, FileText, Shield, Users } from 'lucide-react';

export function HealthcareSector() {
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
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-4">Healthcare Sector Solutions</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              HIPAA-compliant evidence management for medical records, research data, and patient information
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="glass-card">
            <CardHeader>
              <FileText className="w-8 h-8 text-green-400 mb-2" />
              <CardTitle className="text-white">Medical Records</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Secure storage of patient records, medical images, lab results, and treatment documentation with blockchain verification.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <Shield className="w-8 h-8 text-blue-400 mb-2" />
              <CardTitle className="text-white">HIPAA Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Built-in HIPAA compliance features ensure patient privacy and data security while maintaining audit trails for regulatory requirements.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <Users className="w-8 h-8 text-purple-400 mb-2" />
              <CardTitle className="text-white">Research Data</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Manage clinical trial data, research findings, and patient studies with immutable timestamps and secure collaboration tools.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="glass-card p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Healthcare-Specific Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-3">Patient Privacy</h3>
              <p className="text-gray-400">
                Advanced encryption and access controls ensure patient data remains private and secure while enabling authorized access.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-3">Audit Compliance</h3>
              <p className="text-gray-400">
                Automated audit trails and compliance reporting help healthcare organizations meet regulatory requirements effortlessly.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-3">Secure Sharing</h3>
              <p className="text-gray-400">
                Share patient data securely between healthcare providers while maintaining complete control over access permissions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-3">Data Integrity</h3>
              <p className="text-gray-400">
                Blockchain technology ensures medical data integrity and provides verifiable proof of data authenticity for research and treatment.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" asChild className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
            <Link to="/register">Secure Healthcare Data Today</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
