
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowLeft, DollarSign, FileText, Shield, BarChart } from 'lucide-react';

export function FinanceSector() {
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
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <DollarSign className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-4">Finance Sector Solutions</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Regulatory-compliant evidence management for financial transactions, audit trails, and compliance documentation
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="glass-card">
            <CardHeader>
              <FileText className="w-8 h-8 text-yellow-400 mb-2" />
              <CardTitle className="text-white">Transaction Records</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Immutable storage of financial transactions, trade records, and payment documentation with blockchain verification.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <Shield className="w-8 h-8 text-blue-400 mb-2" />
              <CardTitle className="text-white">Regulatory Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Meet SOX, GDPR, and other financial regulations with automated compliance reporting and secure audit trails.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <BarChart className="w-8 h-8 text-green-400 mb-2" />
              <CardTitle className="text-white">Audit Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Comprehensive audit documentation with tamper-proof evidence and automated compliance reporting for regulatory reviews.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="glass-card p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Financial Industry Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-3">Risk Management</h3>
              <p className="text-gray-400">
                Reduce operational risk with immutable records and comprehensive audit trails that meet regulatory standards.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-3">Fraud Prevention</h3>
              <p className="text-gray-400">
                Blockchain technology provides tamper-proof evidence that helps detect and prevent financial fraud and misconduct.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-3">Automated Reporting</h3>
              <p className="text-gray-400">
                Streamline compliance reporting with automated generation of audit reports and regulatory documentation.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-3">Secure Transactions</h3>
              <p className="text-gray-400">
                Ensure transaction integrity with cryptographic verification and immutable blockchain records.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" asChild className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700">
            <Link to="/register">Secure Financial Records</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
