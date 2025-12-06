import { Calculator, BookOpen, Lightbulb, Target, Sparkles } from 'lucide-react';
import { DifficultyBadge } from './DifficultyBadge';
import { cn } from '@/lib/utils';

interface Step {
  step_number: number;
  description: string;
  work: string;
  explanation: string;
}

interface SolutionData {
  detected_problem: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  difficulty_reason: string;
  solution: string;
  steps: Step[];
  method_name: string;
  method_description: string;
  tips: string[];
}

interface SolutionCardProps {
  data: SolutionData;
}

export const SolutionCard = ({ data }: SolutionCardProps) => {
  return (
    <div className="w-full space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      {}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
              <BookOpen className="w-4 h-4" />
              <span>{data.topic}</span>
            </div>
            <h2 className="font-mono text-lg text-foreground break-words">
              {data.detected_problem}
            </h2>
          </div>
          <DifficultyBadge difficulty={data.difficulty} />
        </div>
        <p className="text-sm text-muted-foreground mt-3">{data.difficulty_reason}</p>
      </div>

      {}
      <div className="gradient-border rounded-xl p-6 glow-effect">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/20">
            <Calculator className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Solution</h3>
        </div>
        <div className="font-mono text-2xl text-gradient font-bold">
          {data.solution}
        </div>
      </div>

      {}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-accent/20">
            <Target className="w-5 h-5 text-accent" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Method: {data.method_name}</h3>
        </div>
        <p className="text-muted-foreground">{data.method_description}</p>
      </div>

      {}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-info/20">
            <Sparkles className="w-5 h-5 text-info" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Step-by-Step Solution</h3>
        </div>
        
        <div className="space-y-4">
          {data.steps.map((step, index) => (
            <div 
              key={step.step_number}
              className={cn(
                "relative pl-8 pb-4",
                index !== data.steps.length - 1 && "border-l-2 border-border ml-3"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute left-0 top-0 w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-primary -translate-x-1/2">
                {step.step_number}
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">{step.description}</h4>
                <div className="font-mono text-sm bg-secondary/50 rounded-lg p-3 text-primary">
                  {step.work}
                </div>
                <p className="text-sm text-muted-foreground">{step.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {}
      {data.tips && data.tips.length > 0 && (
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-warning/20">
              <Lightbulb className="w-5 h-5 text-warning" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Pro Tips</h3>
          </div>
          
          <ul className="space-y-2">
            {data.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
