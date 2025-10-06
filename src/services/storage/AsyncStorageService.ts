import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

/**
 * AsyncStorage Service
 * Provides typed wrapper methods for AsyncStorage operations
 */
export class AsyncStorageService {
  /**
   * Save data to storage
   */
  static async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error saving ${key} to storage:`, error);
      throw error;
    }
  }

  /**
   * Get data from storage
   */
  static async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error(`Error reading ${key} from storage:`, error);
      return null;
    }
  }

  /**
   * Remove data from storage
   */
  static async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from storage:`, error);
      throw error;
    }
  }

  /**
   * Clear all data from storage
   */
  static async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }

  /**
   * Get multiple items from storage
   */
  static async multiGet(keys: string[]): Promise<Record<string, any>> {
    try {
      const pairs = await AsyncStorage.multiGet(keys);
      const result: Record<string, any> = {};

      pairs.forEach(([key, value]) => {
        if (value) {
          result[key] = JSON.parse(value);
        }
      });

      return result;
    } catch (error) {
      console.error('Error getting multiple items from storage:', error);
      throw error;
    }
  }

  /**
   * Set multiple items to storage
   */
  static async multiSet(items: Array<[string, any]>): Promise<void> {
    try {
      const pairs: Array<[string, string]> = items.map(([key, value]) => [
        key,
        JSON.stringify(value),
      ]);
      await AsyncStorage.multiSet(pairs);
    } catch (error) {
      console.error('Error setting multiple items to storage:', error);
      throw error;
    }
  }
}
