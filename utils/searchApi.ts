import { SearchResultItem } from '@/types';

// Simulated API call - in a real app, this would call an actual API
export async function searchItems(query: string): Promise<SearchResultItem[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock data for demo purposes
  const mockResults: SearchResultItem[] = [
    {
      id: '1',
      title: 'Super Mario Bros.',
      description: 'The classic NES platformer that defined a generation of games.',
      type: 'game',
      platform: 'Nintendo (NES)',
      releaseYear: '1985',
      marketPrice: 25.99,
      imageUrl: 'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '2',
      title: 'The Legend of Zelda: Ocarina of Time',
      description: 'Widely considered one of the greatest video games of all time.',
      type: 'game',
      platform: 'Nintendo 64',
      releaseYear: '1998',
      marketPrice: 45.99,
      imageUrl: 'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '3',
      title: 'Jurassic Park',
      description: 'Science fiction adventure film directed by Steven Spielberg.',
      type: 'vhs',
      releaseYear: '1993',
      marketPrice: 8.99,
      imageUrl: 'https://images.pexels.com/photos/9436715/pexels-photo-9436715.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '4',
      title: 'Final Fantasy VII',
      description: 'RPG that popularized the genre in Western markets.',
      type: 'game',
      platform: 'PlayStation',
      releaseYear: '1997',
      marketPrice: 79.99,
      imageUrl: 'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '5',
      title: 'The Breakfast Club',
      description: 'Classic 1985 coming-of-age comedy-drama film.',
      type: 'vhs',
      releaseYear: '1985',
      marketPrice: 12.99,
      imageUrl: 'https://images.pexels.com/photos/9436715/pexels-photo-9436715.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];
  
  // Filter results based on search query
  const filteredResults = mockResults.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase()) ||
    (item.platform && item.platform.toLowerCase().includes(query.toLowerCase()))
  );
  
  return filteredResults;
}

export async function getItemDetails(id: string): Promise<SearchResultItem | null> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock API call
  const mockResults: SearchResultItem[] = [
    {
      id: '1',
      title: 'Super Mario Bros.',
      description: 'The classic NES platformer that defined a generation of games.',
      type: 'game',
      platform: 'Nintendo (NES)',
      releaseYear: '1985',
      marketPrice: 25.99,
      imageUrl: 'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '2',
      title: 'The Legend of Zelda: Ocarina of Time',
      description: 'Widely considered one of the greatest video games of all time.',
      type: 'game',
      platform: 'Nintendo 64',
      releaseYear: '1998',
      marketPrice: 45.99,
      imageUrl: 'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '3',
      title: 'Jurassic Park',
      description: 'Science fiction adventure film directed by Steven Spielberg.',
      type: 'vhs',
      releaseYear: '1993',
      marketPrice: 8.99,
      imageUrl: 'https://images.pexels.com/photos/9436715/pexels-photo-9436715.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    // Additional items would be here in a real API
  ];
  
  return mockResults.find(item => item.id === id) || null;
}