
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowLeft, Github, Linkedin, Mail, Code, Shield, Database } from 'lucide-react';

export function DevelopersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Navigation */}
      <nav className="glass-card border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button variant="ghost" asChild className="text-gray-300 hover:text-white">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">BE</span>
            </div>
            <span className="font-bold text-lg gradient-text">BlockEvidence</span>
          </div>
        </div>
      </nav>

      {/* Developer Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Meet the Developer
            </h1>
            <p className="text-xl text-gray-400">
              The mind behind BlockEvidence
            </p>
          </div>

          <Card className="glass-card border-blue-500/20">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                {/* Profile Image */}
                <div className="lg:col-span-1 text-center">
                  <div className="relative inline-block">
                    <img
                      src="/lovable-uploads/5e7c08ae-cd47-4b5c-8a8e-e12c443804f4.png"
                      alt="Shaik Mohammed Hussain - Developer Profile"
                      className="w-48 h-48 mx-auto rounded-full border-4 border-blue-500/30 bg-white p-4"
                    />
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Developer Info */}
                <div className="lg:col-span-2">
                  <h2 className="text-3xl font-bold text-white mb-4 text-center lg:text-left">
                    Shaik Mohammed Hussain
                  </h2>
                  
                  <div className="flex flex-wrap gap-2 mb-6 justify-center lg:justify-start">
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500">
                      Full Stack Developer
                    </Badge>
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500">
                      Blockchain Enthusiast
                    </Badge>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500">
                      Security Expert
                    </Badge>
                  </div>

                  <p className="text-gray-300 leading-relaxed mb-6">
                    Shaik Mohammed Hussain is a passionate full-stack developer with expertise in modern web technologies 
                    and blockchain security. With a strong background in React, TypeScript, and distributed systems, he 
                    specializes in creating secure, scalable applications that solve real-world problems.
                  </p>

                  <p className="text-gray-300 leading-relaxed mb-6">
                    BlockEvidence represents his vision of revolutionizing digital evidence management through blockchain 
                    technology. The platform combines cutting-edge cryptographic security with user-friendly interfaces, 
                    ensuring data integrity and immutability for critical evidence across legal, healthcare, finance, and 
                    government sectors.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-300">Security First</p>
                    </div>
                    <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <Database className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-300">Blockchain Tech</p>
                    </div>
                    <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                      <Code className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-300">Clean Code</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                    <Button variant="outline" className="border-blue-500/20 hover:bg-blue-500/10">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                    <Button variant="outline" className="border-blue-500/20 hover:bg-blue-500/10">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                    <Button variant="outline" className="border-blue-500/20 hover:bg-blue-500/10">
                      <Mail className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Details */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold gradient-text mb-8 text-center">
              About BlockEvidence
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="glass-card border-blue-500/20">
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-white mb-4">🎯 Project Vision</h4>
                  <p className="text-gray-300">
                    To create an unbreachable digital evidence vault that maintains absolute data integrity 
                    through blockchain technology, serving critical industries with court-admissible verification.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card border-purple-500/20">
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-white mb-4">⚡ Tech Stack</h4>
                  <p className="text-gray-300">
                    Built with React, TypeScript, Supabase, and advanced cryptographic algorithms. 
                    Features real-time updates, enterprise security, and seamless user experience.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
