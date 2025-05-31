import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Filter } from 'lucide-react-native';

import { CollectionItem } from '@/types';
import CollectionStats from '@/components/collection/CollectionStats';
import CollectionFilter from '@/components/collection/CollectionFilter';
import EmptyCollection from '@/components/collection/EmptyCollection';
import CollectionCard from '@/components/collection/CollectionCard';
import { getCollection } from '@/utils/collectionStorage';
import Colors from '@/constants/Colors';

export default function CollectionScreen() {
  const router = useRouter();
  const [collection, setCollection] = useState<CollectionItem[]>([]);
  const [filteredCollection, setFilteredCollection] = useState<CollectionItem[]>([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    type: 'all', // 'all', 'vhs', 'nes', 'snes', etc.
  });

  useEffect(() => {
    loadCollection();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [collection, activeFilters]);

  const loadCollection = async () => {
    const items = await getCollection();
    setCollection(items);
  };

  const applyFilters = () => {
    let filtered = [...collection];
    
    if (activeFilters.type !== 'all') {
      filtered = filtered.filter(item => item.type === activeFilters.type);
    }
    
    setFilteredCollection(filtered);
  };

  const handleItemPress = (item: CollectionItem) => {
    router.push({
      pathname: '/item/[id]',
      params: { id: item.id }
    });
  };

  const toggleFilterModal = () => {
    setFilterVisible(!filterVisible);
  };

  const updateFilters = (filters: any) => {
    setActiveFilters(filters);
    setFilterVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Collection</Text>
        <TouchableOpacity 
          style={styles.filterButton} 
          onPress={toggleFilterModal}
        >
          <Filter size={24} color={Colors.light.tint} />
        </TouchableOpacity>
      </View>

      <CollectionStats collection={collection} />
      
      {filterVisible && (
        <CollectionFilter 
          activeFilters={activeFilters} 
          onApply={updateFilters} 
          onClose={() => setFilterVisible(false)} 
        />
      )}

      {collection.length === 0 ? (
        <EmptyCollection />
      ) : (
        <FlatList
          data={filteredCollection}
          renderItem={({ item }) => (
            <CollectionCard item={item} onPress={() => handleItemPress(item)} />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          numColumns={2}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  filterButton: {
    padding: 8,
  },
  listContent: {
    padding: 8,
  },
});