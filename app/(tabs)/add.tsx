import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Camera, Scan, FileText } from 'lucide-react-native';

import Colors from '@/constants/Colors';

export default function AddItemScreen() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const navigateToMethod = (method: string) => {
    setSelectedMethod(method);
    
    switch (method) {
      case 'camera':
        router.push('/add/camera');
        break;
      case 'barcode':
        router.push('/add/barcode');
        break;
      case 'manual':
        router.push('/add/manual');
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add to Collection</Text>
      <Text style={styles.subtitle}>Choose how you want to add an item</Text>
      
      <View style={styles.methodsContainer}>
        <TouchableOpacity 
          style={[styles.methodCard, selectedMethod === 'camera' && styles.selectedMethod]} 
          onPress={() => navigateToMethod('camera')}
        >
          <Camera size={48} color={Colors.light.tint} />
          <Text style={styles.methodTitle}>Camera</Text>
          <Text style={styles.methodDescription}>
            Scan cover art or cartridge to identify and add item
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.methodCard, selectedMethod === 'barcode' && styles.selectedMethod]} 
          onPress={() => navigateToMethod('barcode')}
        >
          <Scan size={48} color={Colors.light.tint} />
          <Text style={styles.methodTitle}>Barcode</Text>
          <Text style={styles.methodDescription}>
            Scan product barcode to quickly identify and add item
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.methodCard, selectedMethod === 'manual' && styles.selectedMethod]} 
          onPress={() => navigateToMethod('manual')}
        >
          <FileText size={48} color={Colors.light.tint} />
          <Text style={styles.methodTitle}>Manual Entry</Text>
          <Text style={styles.methodDescription}>
            Enter item details manually when scanning isn't possible
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    color: Colors.light.textSecondary,
  },
  methodsContainer: {
    flex: 1,
    gap: 16,
  },
  methodCard: {
    backgroundColor: Colors.light.cardBackground,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedMethod: {
    borderColor: Colors.light.tint,
    borderWidth: 2,
  },
  methodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
    color: Colors.light.text,
  },
  methodDescription: {
    fontSize: 14,
    textAlign: 'center',
    color: Colors.light.textSecondary,
  },
});