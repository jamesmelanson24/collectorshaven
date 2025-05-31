import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { CreditCard as Edit, Trash2, Heart, DollarSign, Calendar, Tag } from 'lucide-react-native';

import Colors from '@/constants/Colors';
import { CollectionItem } from '@/types';
import { getItemById, removeFromCollection, updateItem } from '@/utils/collectionStorage';
import LoadingScreen from '@/components/common/LoadingScreen';

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [item, setItem] = useState<CollectionItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItem();
  }, [id]);

  const loadItem = async () => {
    try {
      const loadedItem = await getItemById(id as string);
      setItem(loadedItem);
    } catch (error) {
      console.error('Error loading item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    router.push({
      pathname: '/item/edit/[id]',
      params: { id: id as string }
    });
  };

  const toggleFavorite = async () => {
    if (!item) return;
    
    try {
      const updatedItem = { ...item, favorite: !item.favorite };
      await updateItem(updatedItem);
      setItem(updatedItem);
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to remove this item from your collection?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: async () => {
            try {
              await removeFromCollection(id as string);
              router.replace('/(tabs)');
            } catch (error) {
              console.error('Error deleting item:', error);
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Item not found</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.replace('/(tabs)')}
        >
          <Text style={styles.buttonText}>Back to Collection</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const getFormattedValue = () => {
    if (!item.estValue) return 'Not available';
    return `$${item.estValue.toFixed(2)} CAD`;
  };

  const getPlatformLabel = () => {
    if (!item.platform) return null;
    
    // In a real app, this would come from a lookup table
    const platforms: {[key: string]: string} = {
      'nes': 'Nintendo Entertainment System',
      'snes': 'Super Nintendo',
      'n64': 'Nintendo 64',
      'ps1': 'PlayStation',
      'ps2': 'PlayStation 2',
      'genesis': 'Sega Genesis',
      'dreamcast': 'Sega Dreamcast'
    };
    
    return platforms[item.platform] || item.platform;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.favoriteButton} 
          onPress={toggleFavorite}
        >
          <Heart 
            size={24} 
            color={item.favorite ? Colors.light.heart : Colors.light.textSecondary} 
            fill={item.favorite ? Colors.light.heart : 'none'} 
          />
        </TouchableOpacity>
        
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
            <Edit size={20} color={Colors.light.text} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Trash2 size={20} color={Colors.light.danger} />
          </TouchableOpacity>
        </View>
      </View>
      
      {item.imageUri ? (
        <Image 
          source={{ uri: item.imageUri }} 
          style={styles.image} 
          resizeMode="cover" 
        />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>No Image Available</Text>
        </View>
      )}
      
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        
        <View style={styles.metaContainer}>
          {item.type === 'game' && item.platform && (
            <View style={styles.metaItem}>
              <Tag size={18} color={Colors.light.tint} style={styles.metaIcon} />
              <Text style={styles.metaText}>{getPlatformLabel()}</Text>
            </View>
          )}
          
          {item.releaseYear && (
            <View style={styles.metaItem}>
              <Calendar size={18} color={Colors.light.tint} style={styles.metaIcon} />
              <Text style={styles.metaText}>{item.releaseYear}</Text>
            </View>
          )}
          
          {item.estValue && (
            <View style={styles.metaItem}>
              <DollarSign size={18} color={Colors.light.tint} style={styles.metaIcon} />
              <Text style={styles.metaText}>{getFormattedValue()}</Text>
            </View>
          )}
        </View>
        
        {item.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Type</Text>
            <Text style={styles.detailValue}>
              {item.type === 'vhs' ? 'VHS Movie' : 'Video Game'}
            </Text>
          </View>
          
          {item.condition && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Condition</Text>
              <Text style={styles.detailValue}>{item.condition}</Text>
            </View>
          )}
          
          {item.estValue && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Estimated Value</Text>
              <Text style={styles.detailValue}>{getFormattedValue()}</Text>
            </View>
          )}
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date Added</Text>
            <Text style={styles.detailValue}>
              {new Date(item.dateAdded).toLocaleDateString()}
            </Text>
          </View>
        </View>
        
        {item.notes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Text style={styles.notes}>{item.notes}</Text>
          </View>
        )}
      </View>
    </ScrollView>
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
    padding: 16,
  },
  favoriteButton: {
    padding: 8,
  },
  headerButtons: {
    flexDirection: 'row',
  },
  editButton: {
    padding: 8,
    marginRight: 8,
  },
  deleteButton: {
    padding: 8,
  },
  image: {
    width: '100%',
    height: 250,
  },
  placeholderImage: {
    width: '100%',
    height: 250,
    backgroundColor: Colors.light.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: Colors.light.textSecondary,
    fontSize: 16,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
    gap: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.cardBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  metaIcon: {
    marginRight: 6,
  },
  metaText: {
    color: Colors.light.text,
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  detailLabel: {
    fontSize: 16,
    color: Colors.light.textSecondary,
  },
  detailValue: {
    fontSize: 16,
    color: Colors.light.text,
    fontWeight: '500',
  },
  notes: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text,
  },
  errorText: {
    fontSize: 18,
    color: Colors.light.text,
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  button: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});