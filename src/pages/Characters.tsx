import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { useCharacters, useCharacter } from '@/hooks/useCharacters';
import { CharacterFilters } from '@/types/character';
import Header from '@/components/layout/Header';
import CharacterGrid from '@/components/characters/CharacterGrid';
import CharacterModal from '@/components/characters/CharacterModal';
import SearchBar from '@/components/characters/SearchBar';
import FilterButtons from '@/components/characters/FilterButtons';
import Pagination from '@/components/characters/Pagination';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { useDebounce } from '@/hooks/useDebounce';

const statusOptions = [
  { value: 'Alive', label: '🟢 Alive' },
  { value: 'Dead', label: '🔴 Dead' },
  { value: 'unknown', label: '⚪ Unknown' },
];

const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Genderless', label: 'Genderless' },
  { value: 'unknown', label: 'Unknown' },
];

export default function Characters() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<CharacterFilters>({
    status: '',
    gender: '',
    page: 1,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(null);

  const debouncedSearch = useDebounce(searchTerm, 300);

  const queryFilters = useMemo(() => ({
    ...filters,
    name: debouncedSearch || undefined,
  }), [filters, debouncedSearch]);

  const { data, isLoading, error } = useCharacters(queryFilters);
  const { data: selectedCharacter, isLoading: isLoadingCharacter } = useCharacter(selectedCharacterId);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setFilters(prev => ({ ...prev, page: 1 }));
  }, []);

  const handleFilterChange = useCallback((key: keyof CharacterFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setFilters(prev => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const clearAllFilters = useCallback(() => {
    setSearchTerm('');
    setFilters({ status: '', gender: '', page: 1 });
  }, []);

  const hasActiveFilters = filters.status || filters.gender || searchTerm;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container pb-12">
        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
            <SearchBar
              value={searchTerm}
              onChange={handleSearchChange}
              onClear={() => handleSearchChange('')}
            />

            <div className="flex items-center gap-3">
              <Button
                variant={showFilters ? "default" : "outline"}
                onClick={() => setShowFilters(!showFilters)}
                className="rounded-full gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
                {hasActiveFilters && (
                  <span className="ml-1 px-2 py-0.5 bg-neon text-neon-foreground text-xs rounded-full">
                    Active
                  </span>
                )}
              </Button>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-card rounded-xl p-6 border border-border mb-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <FilterButtons
                  title="Status"
                  options={statusOptions}
                  selected={filters.status || ''}
                  onChange={(value) => handleFilterChange('status', value)}
                />
                <FilterButtons
                  title="Gender"
                  options={genderOptions}
                  selected={filters.gender || ''}
                  onChange={(value) => handleFilterChange('gender', value)}
                />
              </div>
            </motion.div>
          )}

          {/* Results count */}
          {data && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-muted-foreground"
            >
              Found <span className="text-primary font-bold">{data.info.count}</span> characters
              {hasActiveFilters && ' matching your search'}
            </motion.p>
          )}
        </motion.div>

        {/* Character Grid */}
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-destructive">Wubba lubba dub dub! Something went wrong.</p>
          </div>
        ) : (
          <>
            <CharacterGrid
              characters={data?.results || []}
              onCharacterClick={setSelectedCharacterId}
            />

            <Pagination
              currentPage={filters.page || 1}
              totalPages={data?.info.pages || 1}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>

      {/* Character Detail Modal */}
      <CharacterModal
        character={selectedCharacter || null}
        isOpen={selectedCharacterId !== null}
        onClose={() => setSelectedCharacterId(null)}
        isLoading={isLoadingCharacter}
      />
    </div>
  );
}
 