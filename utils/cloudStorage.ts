import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import * as Sharing from 'expo-sharing';
import { CollectionItem } from '@/types';
import { getCollection } from './collectionStorage';

// Function to export collection to a JSON file
export async function exportCollection() {
  try {
    const collection = await getCollection();
    const jsonString = JSON.stringify(collection, null, 2);
    
    if (Platform.OS === 'web') {
      // Web implementation using Blob and download
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'collectors_haven_backup.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      // Mobile implementation using expo-file-system and expo-sharing
      const fileUri = `${FileSystem.documentDirectory}collectors_haven_backup.json`;
      await FileSystem.writeAsStringAsync(fileUri, jsonString);
      await Sharing.shareAsync(fileUri, {
        mimeType: 'application/json',
        dialogTitle: 'Export Collection',
      });
    }
    
    return true;
  } catch (error) {
    console.error('Error exporting collection:', error);
    throw error;
  }
}

// Function to import collection from a JSON file
export async function importCollection(): Promise<CollectionItem[]> {
  try {
    if (Platform.OS === 'web') {
      // Web implementation using file input
      return new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        
        input.onchange = async (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (!file) {
            reject(new Error('No file selected'));
            return;
          }
          
          const reader = new FileReader();
          reader.onload = async (e) => {
            try {
              const content = e.target?.result as string;
              const collection = JSON.parse(content);
              resolve(collection);
            } catch (error) {
              reject(error);
            }
          };
          reader.onerror = () => reject(new Error('Error reading file'));
          reader.readAsText(file);
        };
        
        input.click();
      });
    } else {
      // Mobile implementation using expo-document-picker
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
      });
      
      if (result.canceled) {
        throw new Error('Document picking cancelled');
      }
      
      const content = await FileSystem.readAsStringAsync(result.assets[0].uri);
      return JSON.parse(content);
    }
  } catch (error) {
    console.error('Error importing collection:', error);
    throw error;
  }
}

// Google Cloud Storage integration would go here
// Note: This requires proper setup with credentials and backend support
export async function syncWithGoogleCloud(collection: CollectionItem[]) {
  // This is a placeholder for Google Cloud Storage integration
  // In a real implementation, you would:
  // 1. Set up a backend service with proper authentication
  // 2. Use environment variables for credentials
  // 3. Implement proper error handling and retry logic
  
  try {
    const response = await fetch('/api/sync-collection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(collection),
    });
    
    if (!response.ok) {
      throw new Error('Failed to sync with Google Cloud');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error syncing with Google Cloud:', error);
    throw error;
  }
}