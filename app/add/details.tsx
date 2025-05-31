import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Image, Switch, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Camera, Circle as XCircle } from 'lucide-react-native';

import Colors from '@/constants/Colors';
import { ITEM_TYPES } from '@/constants/ItemTypes';
import PlatformPicker from '@/components/forms/PlatformPicker';
import { addToCollection } from '@/utils/collectionStorage';
import { generateId } from '@/utils/helpers';

export default function ItemDetailsScreen() {
  const { imageUri } = useLocalSearchParams();
  const router = useRouter();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [itemType, setItemType] = useState('');
  const [platform, setPlatform] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [condition, setCondition] = useState('');
  const [estValue, setEstValue] = useState('');
  const [notes, setNotes] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // For demo purposes, pre-populate some fields as if we got data from API
  useEffect(() => {
    if (imageUri) {
      // Simulate data fetching
      setTimeout(() => {
        setTitle('Super Mario Bros.');
        setDescription('The classic NES platformer that defined a generation of games.');
        setItemType('game');
        setPlatform('nes');
        setReleaseYear('1985');
        setEstValue('25.99');
      }, 500);
    }
  }, [imageUri]);

  const handleSave = async () => {
    if (!title || !itemType) {
      alert('Please fill in at least the title and item type.');
      return;
    }

    setIsLoading(true);

    const newItem = {
      id: generateId(),
      title,
      description,
      type: itemType,
      platform: platform || null,
      releaseYear: releaseYear || null,
      condition: condition || 'Good',
      estValue: estValue ? parseFloat(estValue) : null,
      notes,
      favorite,
      imageUri: imageUri as string || null,
      dateAdded: new Date().toISOString(),
    };

    try {
      await addToCollection(newItem);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Failed to save item:', error);
      alert('Failed to save item. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const removeImage = () => {
    // In a real app, you'd delete the image file and clear the uri
    router.setParams({ imageUri: null });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Item Details</Text>
          <Text style={styles.subtitle}>
            Fill in the details for your collection item
          </Text>
        </View>

        {imageUri ? (
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: imageUri as string }} 
              style={styles.image} 
              resizeMode="cover" 
            />
            <TouchableOpacity 
              style={styles.removeImageButton} 
              onPress={removeImage}
            >
              <XCircle size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.addImageButton}
            onPress={() => router.push('/add/camera')}
          >
            <Camera size={32} color={Colors.light.tint} />
            <Text style={styles.addImageText}>Add Image</Text>
          </TouchableOpacity>
        )}

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Title *</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter title"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Item Type *</Text>
            <View style={styles.typeContainer}>
              {ITEM_TYPES.map((type) => (
                <TouchableOpacity
                  key={type.value}
                  style={[
                    styles.typeButton,
                    itemType === type.value && styles.typeButtonSelected
                  ]}
                  onPress={() => setItemType(type.value)}
                >
                  <Text style={[
                    styles.typeButtonText,
                    itemType === type.value && styles.typeButtonTextSelected
                  ]}>
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {itemType === 'game' && (
            <View style={styles.formGroup}>
              <Text style={styles.label}>Platform</Text>
              <PlatformPicker
                selectedPlatform={platform}
                onSelectPlatform={setPlatform}
              />
            </View>
          )}
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Release Year</Text>
            <TextInput
              style={styles.input}
              value={releaseYear}
              onChangeText={setReleaseYear}
              placeholder="Enter year"
              keyboardType="number-pad"
            />
          </View>
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Details</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter description"
              multiline
              numberOfLines={4}
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Condition</Text>
            <TextInput
              style={styles.input}
              value={condition}
              onChangeText={setCondition}
              placeholder="Mint, Good, Fair, Poor"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Estimated Value (CAD)</Text>
            <TextInput
              style={styles.input}
              value={estValue}
              onChangeText={setEstValue}
              placeholder="Enter value"
              keyboardType="decimal-pad"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={notes}
              onChangeText={setNotes}
              placeholder="Enter any additional notes"
              multiline
              numberOfLines={4}
            />
          </View>
          
          <View style={styles.switchContainer}>
            <Text style={styles.label}>Mark as Favorite</Text>
            <Switch
              trackColor={{ false: "#767577", true: Colors.light.tintLight }}
              thumbColor={favorite ? Colors.light.tint : "#f4f3f4"}
              onValueChange={setFavorite}
              value={favorite}
            />
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]} 
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.button, 
              styles.saveButton,
              isLoading && styles.disabledButton
            ]} 
            onPress={handleSave}
            disabled={isLoading}
          >
            <Text style={styles.saveButtonText}>
              {isLoading ? 'Saving...' : 'Save Item'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    marginTop: 4,
  },
  imageContainer: {
    margin: 16,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 4,
  },
  addImageButton: {
    margin: 16,
    height: 120,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.light.border,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageText: {
    marginTop: 8,
    fontSize: 16,
    color: Colors.light.tint,
  },
  formSection: {
    padding: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: Colors.light.text,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: Colors.light.text,
  },
  input: {
    backgroundColor: Colors.light.inputBackground,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.light.text,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
    backgroundColor: Colors.light.inputBackground,
  },
  typeButtonSelected: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
  },
  typeButtonText: {
    color: Colors.light.text,
    fontSize: 14,
  },
  typeButtonTextSelected: {
    color: '#fff',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginTop: 8,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: Colors.light.inputBackground,
    marginRight: 8,
  },
  saveButton: {
    backgroundColor: Colors.light.tint,
    marginLeft: 8,
  },
  disabledButton: {
    opacity: 0.7,
  },
  cancelButtonText: {
    fontSize: 16,
    color: Colors.light.text,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});