import { cn } from '@/lib/utils';

interface DifficultyBadgeProps {
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
}

export const DifficultyBadge = ({ difficulty }: DifficultyBadgeProps) => {
  const config = {
    Easy: {
      bg: 'bg-success/20',
      text: 'text-success',
      border: 'border-success/30',
      glow: 'shadow-[0_0_20px_hsl(var(--success)/0.3)]',
    },
    Medium: {
      bg: 'bg-info/20',
      text: 'text-info',
      border: 'border-info/30',
      glow: 'shadow-[0_0_20px_hsl(var(--info)/0.3)]',
    },
    Hard: {
      bg: 'bg-warning/20',
      text: 'text-warning',
      border: 'border-warning/30',
      glow: 'shadow-[0_0_20px_hsl(var(--warning)/0.3)]',
    },
    Expert: {
      bg: 'bg-destructive/20',
      text: 'text-destructive',
      border: 'border-destructive/30',
      glow: 'shadow-[0_0_20px_hsl(var(--destructive)/0.3)]',
    },
  };

  const styles = config[difficulty] || config.Medium;

  return (
    <span className={cn(
      "inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border",
      styles.bg,
      styles.text,
      styles.border,
      styles.glow
    )}>
      {difficulty}
    </span>
  );
};
