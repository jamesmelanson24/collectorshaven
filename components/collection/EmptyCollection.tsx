import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Folder, Plus } from 'lucide-react-native';
import { useRouter } from 'expo-router';

import Colors from '@/constants/Colors';

export default function EmptyCollection() {
  const router = useRouter();

  const handleAddItem = () => {
    router.push('/add');
  };

  return (
    <View style={styles.container}>
      <Folder size={64} color={Colors.light.textSecondary} />
      <Text style={styles.title}>Your Collection is Empty</Text>
      <Text style={styles.subtitle}>
        Start adding your VHS movies and video games to build your collection
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleAddItem}>
        <Plus size={20} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Add Your First Item</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: Colors.light.textSecondary,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.tint,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});