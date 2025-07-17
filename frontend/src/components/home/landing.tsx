import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BarChart3, CheckCircle, FileText, Github, GraduationCap, Shield, Smartphone, Star, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const features = [
    {
      icon: Shield,
      title: 'Secure Authentication',
      description: 'JWT-based authentication keeps your data safe and secure',
    },
    {
      icon: BarChart3,
      title: 'Progress Dashboard',
      description: 'Track your resume building progress and course achievements',
    },
    {
      icon: GraduationCap,
      title: 'Course Integration',
      description: 'Seamlessly integrate your learning progress into your resume',
    },
    {
      icon: FileText,
      title: 'Dynamic Resume Generation',
      description: 'Create professional resumes with real-time preview and editing',
    },
    {
      icon: Zap,
      title: 'AI-Powered',
      description: 'Google Generative AI integration for smart content suggestions',
    },
    {
      icon: Smartphone,
      title: 'Responsive Design',
      description: 'Perfect experience across all devices and screen sizes',
    },
  ];

  const techStack = [
    { name: 'React 19', category: 'Frontend' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'MongoDB', category: 'Database' },
    { name: 'Express', category: 'Framework' },
    { name: 'Tailwind CSS', category: 'Styling' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">ResumeBuilder</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
              Features
            </a>
            <a href="#tech" className="text-gray-600 hover:text-blue-600 transition-colors">
              Tech Stack
            </a>
            <a href="#demo" className="text-gray-600 hover:text-blue-600 transition-colors">
              Demo
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="https://github.com/KaranMali2001/resume-builder" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Github className="h-6 w-6 mr-2" />
            </Link>

            <Button onClick={() => (window.location.href = '/login')} size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-4" variant="secondary">
            <Star className="h-3 w-3 mr-1" />
            Modern Resume Builder
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Build Professional Resumes with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> AI Power</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Create stunning resumes, track your learning progress, and showcase your achievements with our modern full-stack application. Built with
            the latest technologies for the best experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={() => (window.location.href = '/login')} size="lg" className="text-lg px-8 py-3">
              Start Building Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Free to use
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Open source
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Modern tech stack
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to create professional resumes and track your career progress
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Built with Modern Technologies</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Leveraging the latest and most reliable technologies for optimal performance</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map((tech, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <h3 className="font-semibold text-gray-900 mb-1">{tech.name}</h3>
                  <p className="text-sm text-gray-500">{tech.category}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Build Your Resume?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have already created their perfect resume with our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => (window.location.href = '/login')}
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-3 rounded-md flex items-center"
              >
                <Users className="mr-2 h-5 w-5" />
                Get Started Free
              </Button>
              <Link
                to="https://github.com/KaranMali2001/resume-builder"
                className="text-lg px-8 py-3 text-white border border-white rounded-md flex items-center transition-colors hover:bg-white hover:text-blue-600"
              >
                <Github className="mr-2 h-6 w-6" />
                View on GitHub
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <FileText className="h-6 w-6" />
              <span className="text-xl font-bold">ResumeBuilder</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Documentation
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Support
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                License
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ResumeBuilder. Licensed under MIT License.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
