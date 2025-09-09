import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Brain } from 'lucide-react';

interface PsychometricQuestionsProps {
  onComplete: (data: Record<string, number>) => void;
  initialData: Record<string, number>;
}

const PSYCHOMETRIC_QUESTIONS = [
  {
    id: 'detail_orientation',
    category: 'Conscientiousness',
    question: 'I naturally notice small errors or inconsistencies in data or documents.',
    dimension: 'attention_to_detail'
  },
  {
    id: 'structured_work',
    category: 'Conscientiousness', 
    question: 'I prefer working in structured, well-defined processes rather than ambiguous situations.',
    dimension: 'structure_preference'
  },
  {
    id: 'analytical_thinking',
    category: 'Openness',
    question: 'I enjoy breaking down complex problems into smaller, manageable parts.',
    dimension: 'analytical_mindset'
  },
  {
    id: 'healthcare_interest',
    category: 'Interest',
    question: 'I find medical research and healthcare outcomes genuinely fascinating.',
    dimension: 'domain_interest'
  },
  {
    id: 'compliance_comfort',
    category: 'Conscientiousness',
    question: 'I feel comfortable following detailed protocols and regulatory guidelines.',
    dimension: 'compliance_orientation'
  },
  {
    id: 'data_validation',
    category: 'Conscientiousness',
    question: 'I would rather spend extra time ensuring data accuracy than rushing to complete a task.',
    dimension: 'quality_focus'
  },
  {
    id: 'pattern_recognition',
    category: 'Openness',
    question: 'I often spot trends or patterns in data that others might miss.',
    dimension: 'pattern_skills'
  },
  {
    id: 'repetitive_tasks',
    category: 'Conscientiousness',
    question: 'I can maintain focus and accuracy even when performing repetitive data entry tasks.',
    dimension: 'task_persistence'
  },
  {
    id: 'team_collaboration',
    category: 'Agreeableness',
    question: 'I work well with clinical researchers, statisticians, and regulatory teams.',
    dimension: 'collaboration'
  },
  {
    id: 'learning_motivation',
    category: 'Openness',
    question: 'I actively seek to understand new medical terminologies and clinical procedures.',
    dimension: 'continuous_learning'
  }
];

const LIKERT_OPTIONS = [
  { value: '1', label: 'Strongly Disagree' },
  { value: '2', label: 'Disagree' },
  { value: '3', label: 'Neutral' },
  { value: '4', label: 'Agree' },
  { value: '5', label: 'Strongly Agree' }
];

export const PsychometricQuestions = ({ onComplete, initialData }: PsychometricQuestionsProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>(initialData);
  const [currentResponse, setCurrentResponse] = useState<string>('');

  useEffect(() => {
    const questionId = PSYCHOMETRIC_QUESTIONS[currentQuestion]?.id;
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
      const questionId = PSYCHOMETRIC_QUESTIONS[currentQuestion].id;
      const updatedResponses = {
        ...responses,
        [questionId]: parseInt(currentResponse)
      };
      setResponses(updatedResponses);

      if (currentQuestion < PSYCHOMETRIC_QUESTIONS.length - 1) {
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

  const progress = ((currentQuestion + 1) / PSYCHOMETRIC_QUESTIONS.length) * 100;
  const question = PSYCHOMETRIC_QUESTIONS[currentQuestion];

  return (
    <Card className="clinical-shadow">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-primary" />
          <div>
            <CardTitle>Psychological Fit Assessment</CardTitle>
            <CardDescription>
              Question {currentQuestion + 1} of {PSYCHOMETRIC_QUESTIONS.length} • {question.category}
            </CardDescription>
          </div>
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
            {LIKERT_OPTIONS.map((option) => (
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
            {currentQuestion === PSYCHOMETRIC_QUESTIONS.length - 1 ? 'Complete Section' : 'Next Question'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};