import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterButtonsProps {
  title: string;
  options: FilterOption[];
  selected: string;
  onChange: (value: string) => void;
} 

export default function FilterButtons({ title, options, selected, onChange }: FilterButtonsProps) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        {title}
      </h4>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <motion.button
            key={option.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(selected === option.value ? '' : option.value)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
              selected === option.value
                ? "bg-primary text-primary-foreground portal-glow"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            )}
          >
            {option.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
