export interface CollectionItem {
  id: string;
  title: string;
  description?: string;
  type: 'vhs' | 'game';
  platform?: string; // For games: nes, snes, ps1, etc.
  releaseYear?: string;
  condition?: string;
  estValue?: number;
  notes?: string;
  favorite: boolean;
  imageUri?: string;
  dateAdded: string;
}

export interface SearchResultItem {
  id: string;
  title: string;
  description: string;
  type: 'vhs' | 'game';
  platform?: string;
  releaseYear?: string;
  marketPrice?: number;
  imageUrl?: string;
}