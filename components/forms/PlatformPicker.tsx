import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, FlatList } from 'react-native';
import { ChevronDown } from 'lucide-react-native';

import Colors from '@/constants/Colors';
import { PLATFORMS } from '@/constants/Platforms';

type PlatformPickerProps = {
  selectedPlatform: string;
  onSelectPlatform: (platform: string) => void;
};

export default function PlatformPicker({ selectedPlatform, onSelectPlatform }: PlatformPickerProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleSelect = (platform: string) => {
    onSelectPlatform(platform);
    closeModal();
  };

  const getSelectedPlatformLabel = () => {
    if (!selectedPlatform) return 'Select a platform';
    
    const platform = PLATFORMS.find(p => p.value === selectedPlatform);
    return platform ? platform.label : selectedPlatform;
  };

  return (
    <View>
      <TouchableOpacity style={styles.selector} onPress={openModal}>
        <Text style={[
          styles.selectorText, 
          !selectedPlatform && styles.placeholderText
        ]}>
          {getSelectedPlatformLabel()}
        </Text>
        <ChevronDown size={20} color={Colors.light.textSecondary} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Platform</Text>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={PLATFORMS}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.platformItem,
                    selectedPlatform === item.value && styles.selectedItem
                  ]}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text style={[
                    styles.platformLabel,
                    selectedPlatform === item.value && styles.selectedItemText
                  ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.light.inputBackground,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  selectorText: {
    fontSize: 16,
    color: Colors.light.text,
  },
  placeholderText: {
    color: Colors.light.textSecondary,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: Colors.light.background,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  closeButton: {
    fontSize: 16,
    color: Colors.light.tint,
  },
  platformItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  selectedItem: {
    backgroundColor: Colors.light.tintLight,
  },
  platformLabel: {
    fontSize: 16,
    color: Colors.light.text,
  },
  selectedItemText: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
});