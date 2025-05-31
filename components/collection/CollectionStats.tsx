import { StyleSheet, Text, View } from 'react-native';
import { Database, Film, Gamepad2 } from 'lucide-react-native';

import { CollectionItem } from '@/types';
import Colors from '@/constants/Colors';

type CollectionStatsProps = {
  collection: CollectionItem[];
};

export default function CollectionStats({ collection }: CollectionStatsProps) {
  const totalItems = collection.length;
  const vhsCount = collection.filter(item => item.type === 'vhs').length;
  const gamesCount = collection.filter(item => item.type === 'game').length;
  
  const totalValue = collection
    .filter(item => item.estValue)
    .reduce((sum, item) => sum + (item.estValue || 0), 0);

  return (
    <View style={styles.container}>
      <View style={styles.stat}>
        <View style={[styles.iconContainer, styles.totalIcon]}>
          <Database size={20} color="#fff" />
        </View>
        <View>
          <Text style={styles.value}>{totalItems}</Text>
          <Text style={styles.label}>Total Items</Text>
        </View>
      </View>
      
      <View style={styles.stat}>
        <View style={[styles.iconContainer, styles.vhsIcon]}>
          <Film size={20} color="#fff" />
        </View>
        <View>
          <Text style={styles.value}>{vhsCount}</Text>
          <Text style={styles.label}>VHS Movies</Text>
        </View>
      </View>
      
      <View style={styles.stat}>
        <View style={[styles.iconContainer, styles.gameIcon]}>
          <Gamepad2 size={20} color="#fff" />
        </View>
        <View>
          <Text style={styles.value}>{gamesCount}</Text>
          <Text style={styles.label}>Games</Text>
        </View>
      </View>
      
      <View style={styles.stat}>
        <View style={[styles.iconContainer, styles.valueIcon]}>
          <Text style={styles.dollarSign}>$</Text>
        </View>
        <View>
          <Text style={styles.value}>${totalValue.toFixed(2)}</Text>
          <Text style={styles.label}>Est. Value</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.light.cardBackground,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  stat: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  totalIcon: {
    backgroundColor: Colors.light.tint,
  },
  vhsIcon: {
    backgroundColor: Colors.light.accent,
  },
  gameIcon: {
    backgroundColor: Colors.light.success,
  },
  valueIcon: {
    backgroundColor: Colors.light.warning,
  },
  dollarSign: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
    textAlign: 'center',
  },
  label: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    textAlign: 'center',
  },
});