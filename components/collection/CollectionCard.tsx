import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Heart } from 'lucide-react-native';

import { CollectionItem } from '@/types';
import Colors from '@/constants/Colors';

type CollectionCardProps = {
  item: CollectionItem;
  onPress: () => void;
};

export default function CollectionCard({ item, onPress }: CollectionCardProps) {
  const getFormattedValue = () => {
    if (!item.estValue) return 'N/A';
    return `$${item.estValue.toFixed(2)}`;
  };

  const getPlatformLabel = () => {
    if (!item.platform) return null;
    return item.platform.toUpperCase();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        {item.imageUri ? (
          <Image source={{ uri: item.imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>
              {item.type === 'vhs' ? 'VHS' : 'GAME'}
            </Text>
          </View>
        )}
        {item.favorite && (
          <View style={styles.favoriteTag}>
            <Heart size={14} color="#fff" fill="#fff" />
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {item.title}
        </Text>
        
        <View style={styles.details}>
          {item.type === 'game' && getPlatformLabel() && (
            <View style={styles.platformTag}>
              <Text style={styles.platformText}>{getPlatformLabel()}</Text>
            </View>
          )}
          
          {item.type === 'vhs' && (
            <View style={styles.typeTag}>
              <Text style={styles.typeText}>VHS</Text>
            </View>
          )}
          
          {item.estValue && (
            <Text style={styles.price}>{getFormattedValue()}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    backgroundColor: Colors.light.cardBackground,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    maxWidth: '47%',
  },
  imageContainer: {
    height: 120,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.light.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: Colors.light.textSecondary,
    fontSize: 16,
  },
  favoriteTag: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: Colors.light.heart,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.light.text,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  platformTag: {
    backgroundColor: Colors.light.tintLight,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  platformText: {
    color: Colors.light.tint,
    fontSize: 12,
    fontWeight: 'bold',
  },
  typeTag: {
    backgroundColor: Colors.light.accentLight,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  typeText: {
    color: Colors.light.accent,
    fontSize: 12,
    fontWeight: 'bold',
  },
  price: {
    color: Colors.light.success,
    fontSize: 14,
    fontWeight: 'bold',
  },
});