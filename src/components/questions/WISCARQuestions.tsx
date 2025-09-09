import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface WISCARQuestionsProps {
  onComplete: (data: Record<string, number>) => void;
  initialData: Record<string, number>;
}

const WISCAR_QUESTIONS = [
  {
    id: 'will_persistence',
    category: 'Will',
    question: 'How likely are you to continue working on a challenging data validation task even when it takes longer than expected?',
    type: 'scenario'
  },
  {
    id: 'will_deadline_pressure',
    category: 'Will',
    question: 'When facing tight regulatory submission deadlines, how well do you maintain data quality standards?',
    type: 'scenario'
  },
  {
    id: 'interest_healthcare_outcomes',
    category: 'Interest',
    question: 'How interested are you in understanding how clinical trial data directly impacts patient care decisions?',
    type: 'interest'
  },
  {
    id: 'interest_regulatory_process',
    category: 'Interest',
    question: 'How curious are you about FDA approval processes and regulatory compliance requirements?',
    type: 'interest'
  },
  {
    id: 'skill_pattern_detection',
    category: 'Skill',
    question: 'Rate your current ability to identify unusual patterns or outliers in large datasets.',
    type: 'self_assessment'
  },
  {
    id: 'skill_medical_terminology',
    category: 'Skill',
    question: 'How comfortable are you with medical terminology and clinical procedures?',
    type: 'self_assessment'
  },
  {
    id: 'cognitive_complexity',
    category: 'Cognitive Readiness',
    question: 'How well can you manage multiple complex data streams while maintaining accuracy?',
    type: 'self_assessment'
  },
  {
    id: 'cognitive_attention_detail',
    category: 'Cognitive Readiness',
    question: 'Rate your ability to catch subtle inconsistencies in clinical data forms.',
    type: 'self_assessment'
  },
  {
    id: 'ability_learn_new_systems',
    category: 'Ability to Learn',
    question: 'How quickly do you typically adapt to new clinical data management software systems?',
    type: 'self_assessment'
  },
  {
    id: 'ability_feedback_integration',
    category: 'Ability to Learn',
    question: 'How effectively do you incorporate feedback from senior data managers into your work process?',
    type: 'scenario'
  },
  {
    id: 'real_world_work_environment',
    category: 'Real-World Alignment',
    question: 'How appealing is working in a highly regulated, documentation-heavy environment?',
    type: 'preference'
  },
  {
    id: 'real_world_career_commitment',
    category: 'Real-World Alignment',
    question: 'How committed are you to building a long-term career in clinical data analytics?',
    type: 'commitment'
  }
];

const RESPONSE_OPTIONS = [
  { value: '1', label: 'Very Low/Not at all' },
  { value: '2', label: 'Low/Slightly' },
  { value: '3', label: 'Moderate/Somewhat' },
  { value: '4', label: 'High/Very much' },
  { value: '5', label: 'Very High/Extremely' }
];

const getCategoryIcon = (category: string) => {
  const icons: Record<string, string> = {
    'Will': '🎯',
    'Interest': '🧠',
    'Skill': '⚡',
    'Cognitive Readiness': '🔍',
    'Ability to Learn': '📚',
    'Real-World Alignment': '🌍'
  };
  return icons[category] || '📊';
};

export const WISCARQuestions = ({ onComplete, initialData }: WISCARQuestionsProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>(initialData);
  const [currentResponse, setCurrentResponse] = useState<string>('');

  useEffect(() => {
    const questionId = WISCAR_QUESTIONS[currentQuestion]?.id;
    if (questionId && responses[questionId]) {
      setCurrentResponse(responses[questionId].toString());
    } else {
      setCurrentResponse('');
    }
  }, [currentQuestion, responses]);

  const handleResponseChange = (value: string) => {
    setCurrentResponse(value);
  };

  const nextQuestion = () => {
    if (currentResponse) {
      const questionId = WISCAR_QUESTIONS[currentQuestion].id;
      const updatedResponses = {
        ...responses,
        [questionId]: parseInt(currentResponse)
      };
      setResponses(updatedResponses);

      if (currentQuestion < WISCAR_QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        onComplete(updatedResponses);
      }
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / WISCAR_QUESTIONS.length) * 100;
  const question = WISCAR_QUESTIONS[currentQuestion];

  return (
    <Card className="clinical-shadow">
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          <div>
            <CardTitle>WISCAR Career Alignment</CardTitle>
            <CardDescription>
              Question {currentQuestion + 1} of {WISCAR_QUESTIONS.length} • {question.category}
            </CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <span>{getCategoryIcon(question.category)}</span>
            {question.category}
          </Badge>
        </div>
        <Progress value={progress} className="mt-4" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="bg-muted/30 p-6 rounded-lg">
          <h3 className="text-lg font-medium mb-4 leading-relaxed">
            {question.question}
          </h3>
          
          <RadioGroup 
            value={currentResponse} 
            onValueChange={handleResponseChange}
            className="space-y-3"
          >
            {RESPONSE_OPTIONS.map((option) => (
              <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-background/50 transition-colors">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label 
                  htmlFor={option.value} 
                  className="flex-1 cursor-pointer text-base"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Category Progress */}
        <div className="bg-background/50 p-4 rounded-lg">
          <div className="text-sm text-muted-foreground mb-2">WISCAR Framework Progress</div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 text-xs">
            {['Will', 'Interest', 'Skill', 'Cognitive Readiness', 'Ability to Learn', 'Real-World Alignment'].map((cat) => {
              const completed = Object.keys(responses).filter(key => 
                WISCAR_QUESTIONS.find(q => q.id === key)?.category === cat
              ).length;
              const total = WISCAR_QUESTIONS.filter(q => q.category === cat).length;
              
              return (
                <div key={cat} className="text-center">
                  <div className={`text-lg ${completed === total ? 'text-success' : 'text-muted-foreground'}`}>
                    {getCategoryIcon(cat)}
                  </div>
                  <div className="text-muted-foreground">{completed}/{total}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          
          <Button
            onClick={nextQuestion}
            disabled={!currentResponse}
          >
            {currentQuestion === WISCAR_QUESTIONS.length - 1 ? 'Complete Assessment' : 'Next Question'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};