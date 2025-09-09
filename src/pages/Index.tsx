import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, Clock, Users, Award, Brain, Code, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/hero-clinical-analyst.jpg';

const Index = () => {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    navigate('/assessment');
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  SmartCareer AI Assessment Suite
                </Badge>
                <h1 className="text-5xl font-bold leading-tight">
                  Should I Become a{' '}
                  <span className="text-primary">Clinical Data Analyst?</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Discover your career fit with our comprehensive assessment that evaluates your 
                  psychological profile, technical readiness, and career alignment for clinical data analytics.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="clinical" 
                  size="lg" 
                  onClick={handleStartAssessment}
                  className="text-lg px-8 py-6"
                >
                  Start Assessment
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  Learn More
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  15-20 minutes
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  45 questions
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Personalized results
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src={heroImage}
                alt="Clinical Data Analyst working with medical data"
                className="rounded-2xl clinical-shadow w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Comprehensive Career Fit Evaluation
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our assessment uses proven psychometric principles and industry expertise 
              to provide accurate, personalized career guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="clinical-shadow hover:clinical-glow transition-all duration-300">
              <CardHeader>
                <Brain className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Psychological Fit</CardTitle>
                <CardDescription>
                  Evaluate personality traits, work preferences, and behavioral patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Attention to detail assessment
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Analytical thinking evaluation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Compliance orientation test
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="clinical-shadow hover:clinical-glow transition-all duration-300">
              <CardHeader>
                <Code className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Technical Readiness</CardTitle>
                <CardDescription>
                  Test domain knowledge, statistical understanding, and technical aptitude
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Clinical research knowledge
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Statistical concepts
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Data management skills
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="clinical-shadow hover:clinical-glow transition-all duration-300">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Career Alignment</CardTitle>
                <CardDescription>
                  WISCAR framework analysis of motivation, learning ability, and job fit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Motivation and persistence
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Learning adaptability
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    Real-world job alignment
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Career Paths */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Clinical Data Analytics Career Paths
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the diverse opportunities in clinical data analytics and healthcare technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Clinical Data Analyst',
                level: 'Entry-Mid Level',
                salary: '$65,000 - $85,000',
                description: 'Manage and validate clinical trial data, ensure compliance with regulatory standards.'
              },
              {
                title: 'Clinical Data Manager',
                level: 'Mid-Senior Level',
                salary: '$80,000 - $110,000',
                description: 'Lead data management strategies, oversee CRF design and database development.'
              },
              {
                title: 'Biostatistician',
                level: 'Mid-Senior Level',
                salary: '$90,000 - $130,000',
                description: 'Apply statistical methods to analyze clinical trial data and support regulatory submissions.'
              },
              {
                title: 'Health Informatics Analyst',
                level: 'Entry-Mid Level',
                salary: '$60,000 - $80,000',
                description: 'Analyze healthcare data to improve patient outcomes and operational efficiency.'
              },
              {
                title: 'Regulatory Affairs Specialist',
                level: 'Mid Level',
                salary: '$75,000 - $95,000',
                description: 'Ensure clinical data meets FDA and international regulatory requirements.'
              },
              {
                title: 'Clinical Research Associate',
                level: 'Entry Level',
                salary: '$55,000 - $70,000',
                description: 'Monitor clinical trials and ensure data quality and protocol compliance.'
              }
            ].map((career, index) => (
              <Card key={index} className="clinical-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{career.title}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{career.level}</Badge>
                    <Badge variant="outline">{career.salary}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {career.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold">
              Ready to Discover Your Career Fit?
            </h2>
            <p className="text-lg text-muted-foreground">
              Take our comprehensive assessment now and get personalized recommendations 
              for your clinical data analytics career journey.
            </p>
            <Button 
              variant="clinical" 
              size="lg" 
              onClick={handleStartAssessment}
              className="text-lg px-12 py-6"
            >
              Start Your Assessment
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;