import { useState } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { ChevronRight, Download, Upload, Trash2, Cloud } from 'lucide-react-native';

import Colors from '@/constants/Colors';
import { clearAllData, getCollection } from '@/utils/collectionStorage';
import { exportCollection, importCollection } from '@/utils/cloudStorage';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [useCAD, setUseCAD] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleDarkMode = () => setDarkMode(previousState => !previousState);
  const toggleNotifications = () => setNotifications(previousState => !previousState);
  const toggleCurrency = () => setUseCAD(previousState => !previousState);

  const handleExport = async () => {
    try {
      setIsLoading(true);
      await exportCollection();
      Alert.alert(
        "Export Successful",
        "Your collection has been exported successfully."
      );
    } catch (error) {
      Alert.alert(
        "Export Failed",
        "There was an error exporting your collection. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleImport = async () => {
    try {
      setIsLoading(true);
      const importedCollection = await importCollection();
      Alert.alert(
        "Import Successful",
        `Successfully imported ${importedCollection.length} items.`
      );
    } catch (error) {
      Alert.alert(
        "Import Failed",
        "There was an error importing your collection. Please make sure you selected a valid backup file."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloudSync = () => {
    Alert.alert(
      "Cloud Sync",
      "To use Google Cloud Storage sync, you'll need to set up a Google Cloud project and configure authentication. Would you like to learn more?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Learn More",
          onPress: () => {
            // Here you would typically open a web browser to documentation
            Alert.alert(
              "Cloud Storage Setup",
              "Contact your developer to set up Google Cloud Storage integration with proper authentication and security measures."
            );
          }
        }
      ]
    );
  };

  const handleClearData = () => {
    Alert.alert(
      "Clear All Data",
      "This will permanently delete your entire collection. This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete Everything", 
          style: "destructive",
          onPress: async () => {
            await clearAllData();
            Alert.alert("Collection cleared", "All collection data has been deleted.");
          }
        }
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
        <Text style={styles.loadingText}>Processing...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Preferences</Text>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Dark Mode</Text>
        <Switch
          trackColor={{ false: "#767577", true: Colors.light.tintLight }}
          thumbColor={darkMode ? Colors.light.tint : "#f4f3f4"}
          onValueChange={toggleDarkMode}
          value={darkMode}
        />
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Notifications</Text>
        <Switch
          trackColor={{ false: "#767577", true: Colors.light.tintLight }}
          thumbColor={notifications ? Colors.light.tint : "#f4f3f4"}
          onValueChange={toggleNotifications}
          value={notifications}
        />
      </View>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Use CAD Currency</Text>
        <Switch
          trackColor={{ false: "#767577", true: Colors.light.tintLight }}
          thumbColor={useCAD ? Colors.light.tint : "#f4f3f4"}
          onValueChange={toggleCurrency}
          value={useCAD}
        />
      </View>
      
      <Text style={styles.sectionTitle}>Data Management</Text>
      
      <TouchableOpacity style={styles.actionItem} onPress={handleExport}>
        <View style={styles.actionContent}>
          <Download size={24} color={Colors.light.text} style={styles.actionIcon} />
          <View>
            <Text style={styles.actionLabel}>Export Collection</Text>
            <Text style={styles.actionDescription}>Save your collection as a backup file</Text>
          </View>
        </View>
        <ChevronRight size={20} color={Colors.light.textSecondary} />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.actionItem} onPress={handleImport}>
        <View style={styles.actionContent}>
          <Upload size={24} color={Colors.light.text} style={styles.actionIcon} />
          <View>
            <Text style={styles.actionLabel}>Import Collection</Text>
            <Text style={styles.actionDescription}>Restore from a backup file</Text>
          </View>
        </View>
        <ChevronRight size={20} color={Colors.light.textSecondary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionItem} onPress={handleCloudSync}>
        <View style={styles.actionContent}>
          <Cloud size={24} color={Colors.light.text} style={styles.actionIcon} />
          <View>
            <Text style={styles.actionLabel}>Cloud Sync</Text>
            <Text style={styles.actionDescription}>Sync with Google Cloud Storage</Text>
          </View>
        </View>
        <ChevronRight size={20} color={Colors.light.textSecondary} />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.dangerItem} onPress={handleClearData}>
        <View style={styles.actionContent}>
          <Trash2 size={24} color={Colors.light.danger} style={styles.actionIcon} />
          <View>
            <Text style={[styles.actionLabel, styles.dangerText]}>Clear All Data</Text>
            <Text style={styles.actionDescription}>Delete your entire collection</Text>
          </View>
        </View>
        <ChevronRight size={20} color={Colors.light.textSecondary} />
      </TouchableOpacity>
      
      <View style={styles.footer}>
        <Text style={styles.version}>Collectors Haven v1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.light.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: Colors.light.text,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  settingLabel: {
    fontSize: 16,
    color: Colors.light.text,
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  dangerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
    marginTop: 24,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    marginRight: 16,
  },
  actionLabel: {
    fontSize: 16,
    color: Colors.light.text,
  },
  dangerText: {
    color: Colors.light.danger,
  },
  actionDescription: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginTop: 4,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    padding: 16,
  },
  version: {
    color: Colors.light.textSecondary,
  },
});