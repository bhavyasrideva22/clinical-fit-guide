import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Code, CheckCircle, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TechnicalQuestionsProps {
  onComplete: (data: Record<string, number>) => void;
  initialData: Record<string, number>;
}

const TECHNICAL_QUESTIONS = [
  {
    id: 'statistics_basics',
    category: 'Statistics',
    difficulty: 'Basic',
    question: 'What does a p-value of 0.03 indicate in a clinical trial?',
    options: [
      'There is a 3% chance the treatment works',
      'There is a 3% chance of observing this result if there is no real effect',
      '97% of patients will benefit from the treatment',
      'The study should be repeated 3 more times'
    ],
    correct: 1,
    explanation: 'A p-value represents the probability of observing the results (or more extreme) assuming no real effect exists.'
  },
  {
    id: 'clinical_terminology',
    category: 'Domain Knowledge',
    difficulty: 'Basic',
    question: 'What is a CRF in clinical data management?',
    options: [
      'Clinical Research Facility',
      'Case Report Form',
      'Clinical Risk Factor',
      'Controlled Randomization Format'
    ],
    correct: 1,
    explanation: 'CRF stands for Case Report Form - the primary data collection instrument in clinical trials.'
  },
  {
    id: 'data_validation',
    category: 'Data Management',
    difficulty: 'Intermediate',
    question: 'You notice a patient recorded as having a baseline weight of 1200 kg. What should you do?',
    options: [
      'Delete the record entirely',
      'Change it to 120 kg automatically',
      'Flag it as a data query for source verification',
      'Report it as a serious adverse event'
    ],
    correct: 2,
    explanation: 'Suspicious data should be queried with the investigative site for source verification, not automatically corrected.'
  },
  {
    id: 'regulatory_compliance',
    category: 'Regulatory',
    difficulty: 'Basic',
    question: 'Which guideline provides standards for Good Clinical Practice (GCP)?',
    options: [
      'FDA 21 CFR Part 11',
      'ICH E6(R2)',
      'ISO 27001',
      'HIPAA Privacy Rule'
    ],
    correct: 1,
    explanation: 'ICH E6(R2) is the international standard for Good Clinical Practice in clinical trials.'
  },
  {
    id: 'sql_knowledge',
    category: 'Technical Skills',
    difficulty: 'Intermediate',
    question: 'Which SQL query would find all patients with missing baseline lab values?',
    options: [
      'SELECT * FROM patients WHERE baseline_lab = NULL',
      'SELECT * FROM patients WHERE baseline_lab IS NULL',
      'SELECT * FROM patients WHERE baseline_lab = ""',
      'SELECT * FROM patients WHERE baseline_lab MISSING'
    ],
    correct: 1,
    explanation: 'In SQL, NULL values must be checked using IS NULL, not = NULL.'
  },
  {
    id: 'adverse_events',
    category: 'Domain Knowledge',
    difficulty: 'Intermediate',
    question: 'What is the difference between an AE and an SAE?',
    options: [
      'AEs are expected, SAEs are unexpected',
      'AEs are mild, SAEs are severe/life-threatening/require hospitalization',
      'AEs occur during treatment, SAEs occur after treatment',
      'There is no difference, they are synonymous'
    ],
    correct: 1,
    explanation: 'SAEs (Serious Adverse Events) meet specific criteria like life-threatening events or hospitalization, while AEs can be any unfavorable event.'
  },
  {
    id: 'data_types',
    category: 'Statistics',
    difficulty: 'Basic',
    question: 'Patient pain scores (1-10 scale) represent what type of data?',
    options: [
      'Nominal',
      'Ordinal',
      'Interval',
      'Ratio'
    ],
    correct: 1,
    explanation: 'Pain scores are ordinal data - they have a natural order but the intervals between values may not be equal.'
  },
  {
    id: 'clinical_phases',
    category: 'Domain Knowledge',
    difficulty: 'Basic',
    question: 'Phase III clinical trials primarily focus on:',
    options: [
      'Safety and dosage determination',
      'Proof of concept in small groups',
      'Large-scale efficacy compared to standard care',
      'Post-market surveillance'
    ],
    correct: 2,
    explanation: 'Phase III trials test efficacy in large populations, often comparing to standard of care or placebo.'
  }
];

export const TechnicalQuestions = ({ onComplete, initialData }: TechnicalQuestionsProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>(initialData);
  const [currentResponse, setCurrentResponse] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const questionId = TECHNICAL_QUESTIONS[currentQuestion]?.id;
    if (questionId && responses[questionId] !== undefined) {
      setCurrentResponse(responses[questionId].toString());
    } else {
      setCurrentResponse('');
    }
    setShowFeedback(false);
  }, [currentQuestion, responses]);

  const handleResponseChange = (value: string) => {
    setCurrentResponse(value);
  };

  const submitAnswer = () => {
    if (currentResponse) {
      const questionId = TECHNICAL_QUESTIONS[currentQuestion].id;
      const isCorrect = parseInt(currentResponse) === TECHNICAL_QUESTIONS[currentQuestion].correct ? 1 : 0;
      
      const updatedResponses = {
        ...responses,
        [questionId]: isCorrect
      };
      setResponses(updatedResponses);
      setShowFeedback(true);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < TECHNICAL_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(responses);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / TECHNICAL_QUESTIONS.length) * 100;
  const question = TECHNICAL_QUESTIONS[currentQuestion];
  const isCorrect = parseInt(currentResponse) === question.correct;

  return (
    <Card className="clinical-shadow">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Code className="w-6 h-6 text-primary" />
          <div>
            <CardTitle>Technical Readiness Assessment</CardTitle>
            <CardDescription>
              Question {currentQuestion + 1} of {TECHNICAL_QUESTIONS.length} • {question.category}
            </CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant={question.difficulty === 'Basic' ? 'secondary' : 'default'}>
            {question.difficulty}
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
            disabled={showFeedback}
          >
            {question.options.map((option, index) => {
              const isSelected = currentResponse === index.toString();
              const isCorrectOption = index === question.correct;
              
              let itemClass = "flex items-center space-x-3 p-3 rounded-lg transition-colors";
              
              if (showFeedback) {
                if (isCorrectOption) {
                  itemClass += " bg-success/10 border border-success/20";
                } else if (isSelected && !isCorrectOption) {
                  itemClass += " bg-destructive/10 border border-destructive/20";
                } else {
                  itemClass += " bg-muted/20";
                }
              } else {
                itemClass += " hover:bg-background/50";
              }

              return (
                <div key={index} className={itemClass}>
                  <RadioGroupItem value={index.toString()} id={index.toString()} />
                  <Label 
                    htmlFor={index.toString()} 
                    className="flex-1 cursor-pointer text-base flex items-center gap-2"
                  >
                    {option}
                    {showFeedback && isCorrectOption && (
                      <CheckCircle className="w-4 h-4 text-success" />
                    )}
                    {showFeedback && isSelected && !isCorrectOption && (
                      <XCircle className="w-4 h-4 text-destructive" />
                    )}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>

        {showFeedback && (
          <div className={`p-4 rounded-lg border ${isCorrect ? 'bg-success/10 border-success/20' : 'bg-destructive/10 border-destructive/20'}`}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <CheckCircle className="w-5 h-5 text-success" />
              ) : (
                <XCircle className="w-5 h-5 text-destructive" />
              )}
              <span className="font-medium">
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {question.explanation}
            </p>
          </div>
        )}

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          
          {!showFeedback ? (
            <Button
              onClick={submitAnswer}
              disabled={!currentResponse}
            >
              Submit Answer
            </Button>
          ) : (
            <Button onClick={nextQuestion}>
              {currentQuestion === TECHNICAL_QUESTIONS.length - 1 ? 'Complete Section' : 'Next Question'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};