import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface PaginationProps {
  currentPage: number; 
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-2 mt-8"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-full"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      {getVisiblePages().map((page, index) => (
        typeof page === 'number' ? (
          <Button
            key={index}
            variant={currentPage === page ? "default" : "ghost"}
            size="icon"
            onClick={() => onPageChange(page)}
            className={`rounded-full ${currentPage === page ? 'portal-glow' : ''}`}
          >
            {page}
          </Button>
        ) : (
          <span key={index} className="px-2 text-muted-foreground">
            {page}
          </span>
        )
      ))}

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-full"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </motion.div>
  );
}
