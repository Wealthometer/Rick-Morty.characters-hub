import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Globe, Film, User, Heart, Dna } from 'lucide-react';
import { Character } from '@/types/character';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import React from 'react';

interface CharacterModalProps {
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
}

export default function CharacterModal({ character, isOpen, onClose, isLoading }: CharacterModalProps) {
  const statusClass = character ? {
    Alive: 'status-alive',
    Dead: 'status-dead',
    unknown: 'status-unknown',
  }[character.status] : '';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-0 pointer-events-none"
          >
            <div className="w-full max-w-2xl overflow-hidden pointer-events-auto">
              <div className="bg-card rounded-2xl border border-border overflow-hidden card-glow max-h-[90vh] overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center h-96">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : character ? (
                <>
                  {/* Header with image */}
                  <div className="relative">
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-full h-64 md:h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                    
                    {/* Close button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onClose}
                      className="absolute top-4 right-4 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80"
                    >
                      <X className="h-5 w-5" />
                    </Button>

                    {/* Name and status */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-white",
                          statusClass
                        )}>
                          {character.status}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {character.species}
                        </span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-display text-glow text-primary">
                        {character.name}
                      </h2>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-6">
                    {/* Info grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <InfoCard
                        icon={<User className="h-5 w-5 text-electric" />}
                        label="Gender"
                        value={character.gender}
                      />
                      <InfoCard
                        icon={<Dna className="h-5 w-5 text-neon" />}
                        label="Species"
                        value={character.type || character.species}
                      />
                      <InfoCard
                        icon={<Globe className="h-5 w-5 text-primary" />}
                        label="Origin"
                        value={character.origin.name}
                      />
                      <InfoCard
                        icon={<MapPin className="h-5 w-5 text-destructive" />}
                        label="Last Known Location"
                        value={character.location.name}
                      />
                    </div>

                    {/* Episodes */}
                    <div className="bg-muted/50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Film className="h-5 w-5 text-electric" />
                        <h4 className="font-semibold text-foreground">Episodes</h4>
                      </div>
                      <p className="text-muted-foreground">
                        Appeared in <span className="text-primary font-bold">{character.episode.length}</span> episodes
                      </p>
                    </div>
                  </div>
                </>
              ) : null}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-muted/50 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-foreground font-medium truncate">{value}</p>
    </div>
  );
}
