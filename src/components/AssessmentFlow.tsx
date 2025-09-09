import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, CheckCircle, Brain, Code, Target, TrendingUp } from 'lucide-react';
import { PsychometricQuestions } from './questions/PsychometricQuestions';
import { TechnicalQuestions } from './questions/TechnicalQuestions';
import { WISCARQuestions } from './questions/WISCARQuestions';
import { ResultsPage } from './ResultsPage';

export type AssessmentData = {
  psychometric: Record<string, number>;
  technical: Record<string, number>;
  wiscar: Record<string, number>;
  demographics?: Record<string, any>;
};

const ASSESSMENT_SECTIONS = [
  {
    id: 'intro',
    title: 'Introduction',
    icon: Target,
    description: 'Learn about the Clinical Data Analyst role'
  },
  {
    id: 'psychometric',
    title: 'Psychological Fit',
    icon: Brain,
    description: 'Personality and work style assessment'
  },
  {
    id: 'technical',
    title: 'Technical Readiness',
    icon: Code,
    description: 'Domain knowledge and aptitude test'
  },
  {
    id: 'wiscar',
    title: 'Career Alignment',
    icon: TrendingUp,
    description: 'WISCAR framework evaluation'
  },
  {
    id: 'results',
    title: 'Your Results',
    icon: CheckCircle,
    description: 'Personalized career recommendations'
  }
];

export const AssessmentFlow = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    psychometric: {},
    technical: {},
    wiscar: {}
  });

  const updateAssessmentData = (section: keyof AssessmentData, data: Record<string, any>) => {
    setAssessmentData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const nextSection = () => {
    if (currentSection < ASSESSMENT_SECTIONS.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const progress = ((currentSection + 1) / ASSESSMENT_SECTIONS.length) * 100;
  const currentSectionData = ASSESSMENT_SECTIONS[currentSection];
  const Icon = currentSectionData.icon;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-foreground">
              Clinical Data Analyst Assessment
            </h1>
            <Badge variant="secondary" className="px-3 py-1">
              {currentSection + 1} / {ASSESSMENT_SECTIONS.length}
            </Badge>
          </div>
          
          <Progress value={progress} className="h-2 mb-4" />
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon className="w-5 h-5" />
            <span className="font-medium">{currentSectionData.title}</span>
            <span>•</span>
            <span>{currentSectionData.description}</span>
          </div>
        </div>

        {/* Content */}
        <div className="mb-8">
          {currentSection === 0 && <IntroSection />}
          {currentSection === 1 && (
            <PsychometricQuestions 
              onComplete={(data) => updateAssessmentData('psychometric', data)}
              initialData={assessmentData.psychometric}
            />
          )}
          {currentSection === 2 && (
            <TechnicalQuestions 
              onComplete={(data) => updateAssessmentData('technical', data)}
              initialData={assessmentData.technical}
            />
          )}
          {currentSection === 3 && (
            <WISCARQuestions 
              onComplete={(data) => updateAssessmentData('wiscar', data)}
              initialData={assessmentData.wiscar}
            />
          )}
          {currentSection === 4 && (
            <ResultsPage assessmentData={assessmentData} />
          )}
        </div>

        {/* Navigation */}
        {currentSection < ASSESSMENT_SECTIONS.length - 1 && (
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevSection}
              disabled={currentSection === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <Button
              onClick={nextSection}
              className="flex items-center gap-2"
            >
              {currentSection === ASSESSMENT_SECTIONS.length - 2 ? 'View Results' : 'Continue'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const IntroSection = () => {
  return (
    <div className="space-y-6">
      <Card className="clinical-shadow">
        <CardHeader>
          <CardTitle className="text-2xl">Should I Become a Clinical Data Analyst?</CardTitle>
          <CardDescription className="text-lg">
            Discover if a career in clinical data analytics is right for you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">What Clinical Data Analysts Do</h3>
            <p className="text-muted-foreground leading-relaxed">
              Clinical Data Analysts manage, interpret, and validate data from clinical trials or health records. 
              They ensure data quality, conduct statistical analysis, and generate reports for regulatory 
              submissions, research, and decision-making in healthcare.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Typical Career Paths</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Badge variant="secondary">Clinical Data Analyst</Badge>
                <Badge variant="secondary">Clinical Trial Data Coordinator</Badge>
                <Badge variant="secondary">Health Informatics Analyst</Badge>
              </div>
              <div className="space-y-2">
                <Badge variant="secondary">Bioinformatics Data Analyst</Badge>
                <Badge variant="secondary">Clinical Research Associate</Badge>
                <Badge variant="secondary">Regulatory Data Specialist</Badge>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Key Success Traits</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-muted-foreground">
                <li>• High attention to detail</li>
                <li>• Analytical & critical thinking</li>
                <li>• Structured problem-solving</li>
              </ul>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Healthcare domain curiosity</li>
                <li>• Pattern recognition skills</li>
                <li>• Regulatory compliance mindset</li>
              </ul>
            </div>
          </div>

          <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
            <p className="text-sm text-accent-foreground">
              <strong>Assessment Duration:</strong> 15-20 minutes • 
              <strong>Questions:</strong> 45 total • 
              <strong>Sections:</strong> 3 evaluations + personalized results
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};