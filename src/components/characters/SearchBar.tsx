import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
} 

export default function SearchBar({ value, onChange, onClear }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search characters across dimensions..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-12 pr-12 h-12 bg-card border-border/50 focus:border-primary focus:ring-primary/20 rounded-full text-foreground placeholder:text-muted-foreground"
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
