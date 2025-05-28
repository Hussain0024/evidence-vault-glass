import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Lock, 
  FileText, 
  Users, 
  CheckCircle, 
  Star, 
  ArrowRight,
  Zap,
  Globe,
  TrendingUp,
  Eye,
  Clock,
  Database,
  Fingerprint
} from 'lucide-react';

export function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "Immutable evidence storage with cryptographic proof of integrity and tamper-proof verification"
    },
    {
      icon: Lock,
      title: "Zero-Knowledge Privacy",
      description: "Advanced encryption ensuring only authorized parties access evidence while maintaining privacy"
    },
    {
      icon: FileText,
      title: "Smart Contracts",
      description: "Automated evidence verification and chain of custody tracking with transparent audit trails"
    },
    {
      icon: Users,
      title: "Multi-Party Verification",
      description: "Collaborative evidence management with role-based permissions and multi-signature validation"
    },
    {
      icon: Eye,
      title: "Real-time Monitoring",
      description: "Live tracking of evidence status, verification progress, and system health metrics"
    },
    {
      icon: Clock,
      title: "Timestamping",
      description: "Precise blockchain-based timestamps proving when evidence was created and modified"
    },
    {
      icon: Database,
      title: "Distributed Storage",
      description: "Evidence distributed across multiple nodes ensuring availability and redundancy"
    },
    {
      icon: Fingerprint,
      title: "Digital Fingerprinting",
      description: "Unique cryptographic hashes for each piece of evidence ensuring authenticity"
    }
  ];

  const aboutPoints = [
    {
      title: "Mission",
      description: "To revolutionize evidence management through blockchain technology, ensuring absolute integrity and trust in digital evidence for legal, healthcare, and enterprise sectors."
    },
    {
      title: "Vision",
      description: "A world where digital evidence is universally trusted, instantly verifiable, and permanently secured through decentralized blockchain infrastructure."
    },
    {
      title: "Technology",
      description: "Built on cutting-edge blockchain protocols with zero-knowledge proofs, smart contracts, and distributed storage for maximum security and privacy."
    },
    {
      title: "Impact",
      description: "Serving over 500+ organizations globally, securing millions of evidence files with 99.9% verification success rate and forensic-grade authenticity."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Legal Director",
      company: "Morrison & Associates",
      content: "BlockEvidence has revolutionized how we handle digital evidence. The blockchain verification gives our clients unprecedented confidence in data integrity.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Dr. Michael Rodriguez",
      role: "Chief Security Officer",
      company: "HealthTech Solutions",
      content: "The immutable audit trail has been game-changing for our compliance requirements. We can prove evidence authenticity with mathematical certainty.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Jennifer Walsh",
      role: "Forensics Investigator",
      company: "CyberSec Dynamics",
      content: "Finally, a platform that understands the critical importance of evidence integrity. The blockchain timestamping is forensically sound.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const stats = [
    { number: "10M+", label: "Evidence Files Secured" },
    { number: "500+", label: "Organizations Trust Us" },
    { number: "99.9%", label: "Uptime Guarantee" },
    { number: "256-bit", label: "Encryption Standard" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* 3D Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)`,
            transition: 'background 0.3s ease'
          }}
        />
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 border border-blue-500/20 rounded-lg animate-float" 
             style={{ animationDelay: '0s', animationDuration: '6s' }} />
        <div className="absolute top-40 right-32 w-24 h-24 border border-purple-500/20 rounded-full animate-float" 
             style={{ animationDelay: '2s', animationDuration: '8s' }} />
        <div className="absolute bottom-32 left-40 w-28 h-28 border border-cyan-500/20 rounded-lg rotate-45 animate-float" 
             style={{ animationDelay: '4s', animationDuration: '7s' }} />
        <div className="absolute bottom-20 right-20 w-36 h-36 border border-pink-500/20 rounded-full animate-float" 
             style={{ animationDelay: '1s', animationDuration: '9s' }} />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Navigation - Updated to remove pricing */}
      <nav className="relative z-10 p-6" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">BE</span>
            </div>
            <span className="text-2xl font-bold gradient-text">BlockEvidence</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-white hover:text-blue-400"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="View platform features"
            >
              Features
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:text-blue-400"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="Learn about BlockEvidence"
            >
              About
            </Button>
            <Button 
              asChild 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              aria-label="Sign in to your BlockEvidence account"
            >
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-6" role="main" aria-labelledby="hero-heading">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30">
            🚀 Next-Gen Evidence Management
          </Badge>
          <h1 id="hero-heading" className="text-6xl md:text-7xl font-bold gradient-text mb-8 animate-fade-in">
            Secure Evidence on the
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Blockchain
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Revolutionary blockchain-based evidence management platform ensuring immutable proof, 
            cryptographic verification, and tamper-proof chain of custody for critical digital assets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              asChild
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 text-lg"
              aria-label="Start securing your evidence with BlockEvidence - Sign up now"
            >
              <Link to="/register">
                Start Securing Evidence <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg"
              aria-label="Watch a demonstration of BlockEvidence platform"
            >
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-20 px-6" aria-labelledby="about-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 id="about-heading" className="text-4xl font-bold gradient-text mb-6">
              About BlockEvidence
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Leading the revolution in digital evidence management through innovative blockchain technology, 
              ensuring trust, security, and transparency for organizations worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {aboutPoints.map((point, index) => (
              <Card key={index} className="glass-card hover:scale-105 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold gradient-text mb-4">{point.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{point.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 px-6" aria-labelledby="features-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 id="features-heading" className="text-4xl font-bold gradient-text mb-6">
              Comprehensive Feature Set
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Advanced blockchain capabilities designed for enterprise-grade evidence management, 
              forensic integrity, and regulatory compliance across all industries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-20 px-6" aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 id="testimonials-heading" className="text-4xl font-bold gradient-text mb-6">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-300">
              See what professionals are saying about BlockEvidence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card hover:scale-105 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="text-white font-semibold">{testimonial.name}</div>
                      <div className="text-gray-400 text-sm">{testimonial.role}</div>
                      <div className="text-blue-400 text-sm">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6" aria-labelledby="cta-heading">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12">
            <h2 id="cta-heading" className="text-4xl font-bold gradient-text mb-6">
              Ready to Secure Your Evidence?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of organizations already protecting their critical evidence with blockchain technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                asChild
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 text-lg"
                aria-label="Get started with BlockEvidence for free - Create your account"
              >
                <Link to="/register">
                  Get Started Free <Zap className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg"
                aria-label="Schedule a personalized demonstration of BlockEvidence"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-12 px-6" role="contentinfo">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">BE</span>
              </div>
              <span className="text-xl font-bold gradient-text">BlockEvidence</span>
            </div>
            <nav aria-label="Footer navigation" className="flex space-x-6 text-gray-400">
              <a 
                href="#" 
                className="hover:text-white transition-colors"
                aria-label="View privacy policy"
              >
                Privacy
              </a>
              <a 
                href="#" 
                className="hover:text-white transition-colors"
                aria-label="View terms of service"
              >
                Terms
              </a>
              <a 
                href="#" 
                className="hover:text-white transition-colors"
                aria-label="Get support and help"
              >
                Support
              </a>
              <a 
                href="#" 
                className="hover:text-white transition-colors"
                aria-label="Contact BlockEvidence team"
              >
                Contact
              </a>
            </nav>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400">
            <p>&copy; 2024 BlockEvidence. All rights reserved. Securing evidence with blockchain technology.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
