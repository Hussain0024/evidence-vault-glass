
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Shield, Upload, Search, Users, CheckCircle, Clock, Lock, Globe } from 'lucide-react';

export function LandingPage() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      icon: Shield,
      title: 'Blockchain Security',
      description: 'Immutable evidence storage with cryptographic verification ensuring data integrity and authenticity.'
    },
    {
      icon: Upload,
      title: 'Easy Upload',
      description: 'Drag-and-drop interface supporting multiple file formats with automatic metadata extraction.'
    },
    {
      icon: Search,
      title: 'Smart Tracking',
      description: 'Real-time evidence tracking with advanced search capabilities and chain of custody documentation.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Role-based access control with audit trails for secure multi-user evidence management.'
    },
    {
      icon: CheckCircle,
      title: 'Instant Verification',
      description: 'Immediate evidence verification with tamper-proof certificates and compliance reporting.'
    },
    {
      icon: Clock,
      title: 'Real-time Updates',
      description: 'Live status updates and notifications throughout the evidence lifecycle process.'
    }
  ];

  const useCases = [
    {
      sector: 'Legal',
      icon: '⚖️',
      description: 'Digital evidence for litigation, contracts, and legal documentation with court-admissible verification.',
      color: 'border-blue-500/30 bg-blue-500/10'
    },
    {
      sector: 'Healthcare',
      icon: '🏥',
      description: 'Medical records, research data, and patient information with HIPAA-compliant security measures.',
      color: 'border-green-500/30 bg-green-500/10'
    },
    {
      sector: 'Finance',
      icon: '💰',
      description: 'Financial transactions, audit trails, and compliance documentation with regulatory standards.',
      color: 'border-yellow-500/30 bg-yellow-500/10'
    },
    {
      sector: 'Government',
      icon: '🏛️',
      description: 'Public records, investigations, and official documentation with transparency and accountability.',
      color: 'border-red-500/30 bg-red-500/10'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-card border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">BE</span>
            </div>
            <span className="font-bold text-xl gradient-text">BlockEvidence</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('use-cases')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Use Cases
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild className="text-gray-300 hover:text-white">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500">
              🔒 Blockchain-Secured Evidence Platform
            </Badge>
            <h1 className="text-6xl font-bold gradient-text mb-6 animate-fade-in">
              Secure Evidence Management
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Revolutionary blockchain-based platform ensuring the integrity, authenticity, and immutability of digital evidence across legal, healthcare, finance, and government sectors.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <Button size="lg" asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all">
              <Link to="/register">
                <Upload className="w-5 h-5 mr-2" />
                Start Securing Evidence
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white/20 hover:bg-white/10">
              <Link to="/login">
                <Shield className="w-5 h-5 mr-2" />
                Access Your Vault
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">100% Secure</h3>
              <p className="text-gray-400">Military-grade encryption with blockchain immutability</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Instantly Verified</h3>
              <p className="text-gray-400">Real-time validation with tamper-proof certificates</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Globally Accessible</h3>
              <p className="text-gray-400">Access your evidence securely from anywhere</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Advanced technology stack designed for enterprise-grade evidence management
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="glass-card hover:glow-border transition-all duration-300 group">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gradient-to-r from-blue-950/20 to-purple-950/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold gradient-text mb-6">About BlockEvidence</h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                BlockEvidence revolutionizes digital evidence management by leveraging blockchain technology to ensure absolute data integrity and immutability. Our platform provides a secure, transparent, and verifiable solution for organizations that require tamper-proof evidence storage.
              </p>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Built with enterprise security standards, our system combines cryptographic hashing, distributed ledger technology, and advanced access controls to create an unbreachable evidence vault that maintains chain of custody and provides court-admissible verification.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2">99.9%</h4>
                  <p className="text-gray-400">Uptime Guarantee</p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2">256-bit</h4>
                  <p className="text-gray-400">AES Encryption</p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2">SOC 2</h4>
                  <p className="text-gray-400">Type II Compliant</p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2">24/7</h4>
                  <p className="text-gray-400">Expert Support</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="glass-card p-8">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Trusted by Industry Leaders</h3>
                  <p className="text-gray-400 mb-6">
                    Join thousands of organizations worldwide who trust BlockEvidence for their critical evidence management needs.
                  </p>
                  <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    <Link to="/register">Start Your Free Trial</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">Industry Applications</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Specialized evidence management solutions for every sector
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <div 
                key={index} 
                className={`p-6 rounded-lg border ${useCase.color} hover:border-opacity-50 transition-all`}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{useCase.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{useCase.sector} Sector</h3>
                    <p className="text-gray-400">{useCase.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-950/40 to-purple-950/40">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold gradient-text mb-6">Ready to Secure Your Digital Evidence?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Join thousands of organizations worldwide in revolutionizing their evidence management process with blockchain security.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button size="lg" asChild className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Link to="/register">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white/20 hover:bg-white/10">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <div className="flex items-center space-x-3 justify-center md:justify-start">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">BE</span>
                </div>
                <span className="font-bold text-lg gradient-text">BlockEvidence</span>
              </div>
              <p className="text-gray-400 mt-2">Blockchain-secured evidence management</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-white font-medium mb-4">Platform</h3>
                <ul className="space-y-2">
                  <li><button onClick={() => scrollToSection('features')} className="text-gray-400 hover:text-white transition-colors">Features</button></li>
                  <li><button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-white transition-colors">About</button></li>
                  <li><button onClick={() => scrollToSection('use-cases')} className="text-gray-400 hover:text-white transition-colors">Use Cases</button></li>
                </ul>
              </div>
              
              <div className="text-center md:text-left">
                <h3 className="text-white font-medium mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Compliance</a></li>
                </ul>
              </div>
              
              <div className="text-center md:text-left col-span-2 md:col-span-1">
                <h3 className="text-white font-medium mb-4">Contact</h3>
                <ul className="space-y-2">
                  <li><a href="mailto:info@blockevidence.com" className="text-gray-400 hover:text-white transition-colors">info@blockevidence.com</a></li>
                  <li><a href="tel:+11234567890" className="text-gray-400 hover:text-white transition-colors">+1 (123) 456-7890</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-gray-500">© 2025 BlockEvidence Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
