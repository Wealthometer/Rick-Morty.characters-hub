import { motion } from 'framer-motion';
import { Character } from '@/types/character';
import { cn } from '@/lib/utils';

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
  index: number;
}

export default function CharacterCard({ character, onClick, index }: CharacterCardProps) {
  const statusClass = {
    Alive: 'status-alive',
    Dead: 'status-dead',
    unknown: 'status-unknown', 
  }[character.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-xl bg-card card-glow transition-all duration-300 group-hover:portal-glow">
        {/* Image container */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={character.image}
            alt={character.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Status badge */}
          <div className="absolute top-3 right-3">
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-white",
              statusClass
            )}>
              {character.status}
            </span>
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-foreground truncate group-hover:text-primary transition-colors">
            {character.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {character.species} • {character.gender}
          </p>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs text-electric">📍</span>
            <p className="text-xs text-muted-foreground truncate">
              {character.location.name}
            </p>
          </div>
        </div>

        {/* Hover border effect */}
        <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-primary/50 transition-colors pointer-events-none" />
      </div>
    </motion.div>
  );
}
