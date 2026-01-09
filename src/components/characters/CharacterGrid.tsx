import { Character } from '@/types/character';
import CharacterCard from './CharacterCard';
import { motion } from 'framer-motion';

interface CharacterGridProps {
  characters: Character[];
  onCharacterClick: (id: number) => void;
}

export default function CharacterGrid({ characters, onCharacterClick }: CharacterGridProps) {
  if (characters.length === 0) {
    return ( 
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20"
      >
        <div className="text-6xl mb-4">🛸</div>
        <h3 className="text-xl font-display text-glow text-primary">No Characters Found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {characters.map((character, index) => (
        <CharacterCard
          key={character.id}
          character={character}
          onClick={() => onCharacterClick(character.id)}
          index={index}
        />
      ))}
    </div>
  );
}
