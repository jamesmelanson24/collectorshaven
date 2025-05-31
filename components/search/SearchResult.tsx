import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Tag, Calendar, DollarSign } from 'lucide-react-native';

import { SearchResultItem } from '@/types';
import Colors from '@/constants/Colors';

type SearchResultProps = {
  item: SearchResultItem;
  onPress: () => void;
};

export default function SearchResult({ item, onPress }: SearchResultProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>
              {item.type === 'vhs' ? 'VHS' : 'GAME'}
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        
        <View style={styles.metaContainer}>
          {item.type === 'game' && item.platform && (
            <View style={styles.metaItem}>
              <Tag size={14} color={Colors.light.tint} style={styles.metaIcon} />
              <Text style={styles.metaText}>{item.platform}</Text>
            </View>
          )}
          
          {item.releaseYear && (
            <View style={styles.metaItem}>
              <Calendar size={14} color={Colors.light.tint} style={styles.metaIcon} />
              <Text style={styles.metaText}>{item.releaseYear}</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        
        {item.marketPrice && (
          <View style={styles.priceContainer}>
            <DollarSign size={14} color={Colors.light.success} />
            <Text style={styles.price}>${item.marketPrice.toFixed(2)} CAD</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.light.cardBackground,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  imageContainer: {
    width: 100,
    height: 120,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.light.tintLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 4,
  },
  metaContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    marginRight: 4,
  },
  metaText: {
    fontSize: 12,
    color: Colors.light.text,
  },
  description: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.light.success,
  },
});