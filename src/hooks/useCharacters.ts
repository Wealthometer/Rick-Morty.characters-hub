import { useQuery } from '@tanstack/react-query';
import { ApiResponse, Character, CharacterFilters } from '@/types/character';

const API_BASE = 'https://rickandmortyapi.com/api';

async function fetchCharacters(filters: CharacterFilters): Promise<ApiResponse> {
  const params = new URLSearchParams();
  
  if (filters.name) params.append('name', filters.name);
  if (filters.status) params.append('status', filters.status);
  if (filters.gender) params.append('gender', filters.gender);
  if (filters.page) params.append('page', filters.page.toString());
  
  const url = `${API_BASE}/character${params.toString() ? `?${params}` : ''}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    if (response.status === 404) {
      return { info: { count: 0, pages: 0, next: null, prev: null }, results: [] };
    } 
    throw new Error('Failed to fetch characters');
  }
  
  return response.json();
}

async function fetchSingleCharacter(id: number): Promise<Character> {
  const response = await fetch(`${API_BASE}/character/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch character');
  }
  
  return response.json();
}

export function useCharacters(filters: CharacterFilters) {
  return useQuery({
    queryKey: ['characters', filters],
    queryFn: () => fetchCharacters(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useCharacter(id: number | null) {
  return useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchSingleCharacter(id!),
    enabled: id !== null,
    staleTime: 1000 * 60 * 5,
  });
}
