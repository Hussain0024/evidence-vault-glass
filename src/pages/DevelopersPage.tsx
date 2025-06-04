
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowLeft, Github, Linkedin, Mail, Code, Shield, Database, Users } from 'lucide-react';

export function DevelopersPage() {
  const developers = [
    {
      name: "Shaik Mohammed Hussain",
      role: "Lead Full Stack Developer",
      image: "/lovable-uploads/5e7c08ae-cd47-4b5c-8a8e-e12c443804f4.png",
      badges: ["Full Stack Developer", "Blockchain Enthusiast", "Security Expert"],
      description: "Shaik Mohammed Hussain is a passionate full-stack developer with expertise in modern web technologies and blockchain security. With a strong background in React, TypeScript, and distributed systems, he specializes in creating secure, scalable applications that solve real-world problems.",
      vision: "BlockEvidence represents his vision of revolutionizing digital evidence management through blockchain technology. The platform combines cutting-edge cryptographic security with user-friendly interfaces, ensuring data integrity and immutability for critical evidence across legal, healthcare, finance, and government sectors.",
      skills: [
        { icon: Shield, label: "Security First", color: "blue" },
        { icon: Database, label: "Blockchain Tech", color: "purple" },
        { icon: Code, label: "Clean Code", color: "green" }
      ]
    },
    {
      name: "Mohammed Ishaq",
      role: "Backend Developer",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%234f46e5;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%237c3aed;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='100' cy='100' r='100' fill='url(%23grad1)'/%3E%3Ctext x='100' y='110' font-family='Arial, sans-serif' font-size='60' font-weight='bold' text-anchor='middle' fill='white'%3EMI%3C/text%3E%3C/svg%3E",
      badges: ["Backend Specialist", "API Architect", "Database Expert"],
      description: "Mohammed Ishaq is a skilled backend developer with deep expertise in server-side technologies and database management. He specializes in building robust APIs and ensuring seamless data flow throughout the BlockEvidence platform.",
      vision: "Focuses on creating scalable backend infrastructure that can handle enterprise-level evidence management with optimal performance and reliability.",
      skills: [
        { icon: Database, label: "Database Design", color: "blue" },
        { icon: Shield, label: "API Security", color: "purple" },
        { icon: Code, label: "Server Logic", color: "green" }
      ]
    },
    {
      name: "Syed Aleem Uddin",
      role: "Frontend Developer",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2306b6d4;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%233b82f6;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='100' cy='100' r='100' fill='url(%23grad2)'/%3E%3Ctext x='100' y='110' font-family='Arial, sans-serif' font-size='60' font-weight='bold' text-anchor='middle' fill='white'%3ESA%3C/text%3E%3C/svg%3E",
      badges: ["UI/UX Specialist", "React Expert", "Design Systems"],
      description: "Syed Aleem Uddin is a talented frontend developer with a keen eye for user experience and interface design. He crafts intuitive and responsive user interfaces that make complex evidence management simple and accessible.",
      vision: "Dedicated to creating user-centric designs that bridge the gap between powerful blockchain technology and everyday usability.",
      skills: [
        { icon: Code, label: "React Mastery", color: "blue" },
        { icon: Users, label: "UX Design", color: "purple" },
        { icon: Shield, label: "Responsive UI", color: "green" }
      ]
    },
    {
      name: "Harishwar",
      role: "DevOps Engineer",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23ef4444;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23f97316;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='100' cy='100' r='100' fill='url(%23grad3)'/%3E%3Ctext x='100' y='110' font-family='Arial, sans-serif' font-size='70' font-weight='bold' text-anchor='middle' fill='white'%3EH%3C/text%3E%3C/svg%3E",
      badges: ["DevOps Specialist", "Cloud Architect", "CI/CD Expert"],
      description: "Harishwar is an experienced DevOps engineer who ensures the BlockEvidence platform runs smoothly in production. He manages deployment pipelines, monitors system performance, and maintains the infrastructure that keeps evidence secure and accessible.",
      vision: "Committed to building bulletproof infrastructure that guarantees 99.9% uptime and enterprise-grade security for critical evidence data.",
      skills: [
        { icon: Shield, label: "Security Ops", color: "blue" },
        { icon: Database, label: "Cloud Systems", color: "purple" },
        { icon: Code, label: "Automation", color: "green" }
      ]
    }
  ];

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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Meet the Development Team
            </h1>
            <p className="text-xl text-gray-400">
              The talented minds behind BlockEvidence
            </p>
          </div>

          {/* Developers Grid */}
          <div className="space-y-12">
            {developers.map((developer, index) => (
              <Card key={developer.name} className="glass-card border-blue-500/20">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    {/* Profile Image */}
                    <div className="lg:col-span-1 text-center">
                      <div className="relative inline-block">
                        <img
                          src={developer.image}
                          alt={`${developer.name} - Developer Profile`}
                          className="w-48 h-48 mx-auto rounded-full border-4 border-blue-500/30 bg-white p-4"
                        />
                        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <Code className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Developer Info */}
                    <div className="lg:col-span-2">
                      <h2 className="text-3xl font-bold text-white mb-2 text-center lg:text-left">
                        {developer.name}
                      </h2>
                      <p className="text-lg text-blue-400 mb-4 text-center lg:text-left">
                        {developer.role}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6 justify-center lg:justify-start">
                        {developer.badges.map((badge, badgeIndex) => (
                          <Badge key={badgeIndex} className="bg-blue-500/20 text-blue-400 border-blue-500">
                            {badge}
                          </Badge>
                        ))}
                      </div>

                      <p className="text-gray-300 leading-relaxed mb-4">
                        {developer.description}
                      </p>

                      <p className="text-gray-300 leading-relaxed mb-6">
                        {developer.vision}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        {developer.skills.map((skill, skillIndex) => {
                          const IconComponent = skill.icon;
                          return (
                            <div key={skillIndex} className={`text-center p-4 bg-${skill.color}-500/10 rounded-lg border border-${skill.color}-500/20`}>
                              <IconComponent className={`w-8 h-8 text-${skill.color}-400 mx-auto mb-2`} />
                              <p className="text-sm text-gray-300">{skill.label}</p>
                            </div>
                          );
                        })}
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
            ))}
          </div>

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
