import AsyncStorage from '@react-native-async-storage/async-storage';
import { CollectionItem } from '@/types';

const COLLECTION_STORAGE_KEY = 'collectors_haven_collection';

export async function getCollection(): Promise<CollectionItem[]> {
  try {
    const jsonValue = await AsyncStorage.getItem(COLLECTION_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error reading collection from storage:', error);
    return [];
  }
}

export async function getItemById(id: string): Promise<CollectionItem | null> {
  try {
    const collection = await getCollection();
    return collection.find(item => item.id === id) || null;
  } catch (error) {
    console.error('Error getting item by ID:', error);
    return null;
  }
}

export async function addToCollection(item: CollectionItem): Promise<void> {
  try {
    const collection = await getCollection();
    collection.push(item);
    await AsyncStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(collection));
  } catch (error) {
    console.error('Error adding item to collection:', error);
    throw error;
  }
}

export async function updateItem(updatedItem: CollectionItem): Promise<void> {
  try {
    const collection = await getCollection();
    const index = collection.findIndex(item => item.id === updatedItem.id);
    
    if (index !== -1) {
      collection[index] = updatedItem;
      await AsyncStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(collection));
    } else {
      throw new Error('Item not found in collection');
    }
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
}

export async function removeFromCollection(id: string): Promise<void> {
  try {
    const collection = await getCollection();
    const filteredCollection = collection.filter(item => item.id !== id);
    await AsyncStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(filteredCollection));
  } catch (error) {
    console.error('Error removing item from collection:', error);
    throw error;
  }
}

export async function clearAllData(): Promise<void> {
  try {
    await AsyncStorage.removeItem(COLLECTION_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing collection data:', error);
    throw error;
  }
}