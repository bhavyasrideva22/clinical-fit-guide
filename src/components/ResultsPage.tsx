import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Brain, 
  Code, 
  TrendingUp, 
  BookOpen, 
  Target,
  Award,
  ArrowRight,
  Download,
  Share2
} from 'lucide-react';
import { AssessmentData } from './AssessmentFlow';

interface ResultsPageProps {
  assessmentData: AssessmentData;
}

// Scoring algorithms
const calculatePsychometricScore = (data: Record<string, number>): number => {
  const values = Object.values(data);
  if (values.length === 0) return 0;
  
  // Weight different dimensions
  const weights = {
    attention_to_detail: 1.2,
    structure_preference: 1.1,
    analytical_mindset: 1.3,
    domain_interest: 1.0,
    compliance_orientation: 1.2,
    quality_focus: 1.3,
    pattern_skills: 1.1,
    task_persistence: 1.1,
    collaboration: 0.9,
    continuous_learning: 1.0
  };
  
  const average = values.reduce((sum, val) => sum + val, 0) / values.length;
  return Math.min(100, (average / 5) * 100 * 1.1); // Slight boost for clinical fit
};

const calculateTechnicalScore = (data: Record<string, number>): number => {
  const values = Object.values(data);
  if (values.length === 0) return 0;
  
  const correctAnswers = values.reduce((sum, val) => sum + val, 0);
  return (correctAnswers / values.length) * 100;
};

const calculateWISCARScore = (data: Record<string, number>): number => {
  const values = Object.values(data);
  if (values.length === 0) return 0;
  
  const average = values.reduce((sum, val) => sum + val, 0) / values.length;
  return (average / 5) * 100;
};

const getRecommendation = (psychScore: number, techScore: number, wiscarScore: number) => {
  const overallScore = (psychScore + techScore + wiscarScore) / 3;
  
  if (overallScore >= 75) return 'strong';
  if (overallScore >= 60) return 'moderate';
  return 'low';
};

const getScoreBadge = (score: number) => {
  if (score >= 85) return { variant: 'default' as const, label: 'Excellent', color: 'text-success' };
  if (score >= 70) return { variant: 'secondary' as const, label: 'Good', color: 'text-primary' };
  if (score >= 55) return { variant: 'outline' as const, label: 'Moderate', color: 'text-warning' };
  return { variant: 'destructive' as const, label: 'Needs Development', color: 'text-destructive' };
};

export const ResultsPage = ({ assessmentData }: ResultsPageProps) => {
  const psychometricScore = calculatePsychometricScore(assessmentData.psychometric);
  const technicalScore = calculateTechnicalScore(assessmentData.technical);
  const wiscarScore = calculateWISCARScore(assessmentData.wiscar);
  const overallScore = (psychometricScore + technicalScore + wiscarScore) / 3;
  
  const recommendation = getRecommendation(psychometricScore, technicalScore, wiscarScore);
  
  const psychBadge = getScoreBadge(psychometricScore);
  const techBadge = getScoreBadge(technicalScore);
  const wiscarBadge = getScoreBadge(wiscarScore);

  return (
    <div className="space-y-8">
      {/* Overall Result */}
      <Card className="clinical-shadow border-primary/20">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            {recommendation === 'strong' && <CheckCircle className="w-16 h-16 text-success mx-auto" />}
            {recommendation === 'moderate' && <AlertTriangle className="w-16 h-16 text-warning mx-auto" />}
            {recommendation === 'low' && <XCircle className="w-16 h-16 text-destructive mx-auto" />}
          </div>
          
          <CardTitle className="text-3xl mb-2">
            {recommendation === 'strong' && 'Strong Fit for Clinical Data Analytics!'}
            {recommendation === 'moderate' && 'Moderate Fit - With Preparation'}
            {recommendation === 'low' && 'Consider Alternative Paths'}
          </CardTitle>
          
          <CardDescription className="text-lg">
            Overall Confidence Score: <span className="font-bold text-primary">{overallScore.toFixed(0)}%</span>
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="mb-6">
            <Progress value={overallScore} className="h-4" />
          </div>
          
          <div className="text-center text-muted-foreground">
            {recommendation === 'strong' && 
              "Your assessment indicates excellent alignment with clinical data analytics. You demonstrate strong analytical thinking, attention to detail, and domain interest that are crucial for success in this field."
            }
            {recommendation === 'moderate' && 
              "You show good potential for clinical data analytics with some areas for development. Focus on strengthening your technical skills and domain knowledge to increase your success potential."
            }
            {recommendation === 'low' && 
              "While clinical data analytics may not be your strongest fit, consider related roles in healthcare technology or data analysis that better align with your current profile."
            }
          </div>
        </CardContent>
      </Card>

      {/* Detailed Scores */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="clinical-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" />
              <CardTitle className="text-lg">Psychological Fit</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{psychometricScore.toFixed(0)}%</span>
                <Badge variant={psychBadge.variant}>{psychBadge.label}</Badge>
              </div>
              <Progress value={psychometricScore} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Measures personality traits, work preferences, and behavioral tendencies aligned with clinical data roles.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="clinical-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Code className="w-6 h-6 text-primary" />
              <CardTitle className="text-lg">Technical Readiness</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{technicalScore.toFixed(0)}%</span>
                <Badge variant={techBadge.variant}>{techBadge.label}</Badge>
              </div>
              <Progress value={technicalScore} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Evaluates current knowledge in statistics, clinical research, data management, and regulatory compliance.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="clinical-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              <CardTitle className="text-lg">Career Alignment</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{wiscarScore.toFixed(0)}%</span>
                <Badge variant={wiscarBadge.variant}>{wiscarBadge.label}</Badge>
              </div>
              <Progress value={wiscarScore} className="h-2" />
              <p className="text-sm text-muted-foreground">
                WISCAR framework assessment of motivation, learning ability, and real-world job alignment.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Personalized Recommendations */}
      <Card className="clinical-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-6 h-6" />
            Personalized Career Guidance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {recommendation === 'strong' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-success">🎯 Recommended Next Steps</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Immediate Actions</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Apply for entry-level Clinical Data Analyst positions</li>
                    <li>• Obtain GCP (Good Clinical Practice) certification</li>
                    <li>• Learn SAS or R for clinical data programming</li>
                    <li>• Join ACRP (Association of Clinical Research Professionals)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Skill Enhancement</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Advanced SQL for clinical databases</li>
                    <li>• CDISC standards (SDTM, ADaM)</li>
                    <li>• Clinical trial management systems (CTMS)</li>
                    <li>• Regulatory submission processes</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {recommendation === 'moderate' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-warning">📚 Development Plan</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Foundation Building</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Complete clinical research fundamentals course</li>
                    <li>• Study basic biostatistics</li>
                    <li>• Learn SQL and data analysis basics</li>
                    <li>• Understand FDA regulations overview</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Experience Building</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Volunteer for clinical research studies</li>
                    <li>• Seek internships in CROs or pharma</li>
                    <li>• Join clinical research professional groups</li>
                    <li>• Consider adjacent roles (CRA, CTC)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {recommendation === 'low' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-destructive">🔄 Alternative Paths</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Related Healthcare Roles</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Health Information Technician</li>
                    <li>• EHR Implementation Specialist</li>
                    <li>• Healthcare Business Analyst</li>
                    <li>• Medical Coding Specialist</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Data Analysis Roles</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Business Intelligence Analyst</li>
                    <li>• Market Research Analyst</li>
                    <li>• Quality Assurance Analyst</li>
                    <li>• Data Entry Supervisor</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Learning Resources */}
      <Card className="clinical-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Recommended Learning Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Certifications
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• GCP (Good Clinical Practice) - ICH E6</li>
                <li>• ACRP Clinical Research Coordinator</li>
                <li>• SAS Certified Clinical Trials Programmer</li>
                <li>• CDISC Foundation Training</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Key Skills to Develop
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Statistical analysis (SAS, R, Python)</li>
                <li>• Clinical data standards (CDISC)</li>
                <li>• EDC systems (Medidata, Oracle)</li>
                <li>• Regulatory compliance (FDA, EMA)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="clinical" size="lg" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Download Full Report
        </Button>
        <Button variant="outline" size="lg" className="flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          Share Results
        </Button>
        <Button variant="secondary" size="lg" className="flex items-center gap-2">
          <ArrowRight className="w-4 h-4" />
          Take Another Assessment
        </Button>
      </div>
    </div>
  );
};