import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { X } from 'lucide-react-native';

import Colors from '@/constants/Colors';
import { ITEM_TYPES } from '@/constants/ItemTypes';
import { PLATFORMS } from '@/constants/Platforms';

type CollectionFilterProps = {
  activeFilters: {
    type: string;
    platform?: string;
  };
  onApply: (filters: any) => void;
  onClose: () => void;
};

export default function CollectionFilter({ 
  activeFilters, 
  onApply, 
  onClose 
}: CollectionFilterProps) {
  const filters = { ...activeFilters };

  const handleTypeSelect = (type: string) => {
    filters.type = type;
  };

  const applyFilters = () => {
    onApply(filters);
  };

  const resetFilters = () => {
    onApply({ type: 'all' });
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter Collection</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color={Colors.light.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>Item Type</Text>
            <View style={styles.filterOptions}>
              <TouchableOpacity
                style={[
                  styles.filterOption,
                  activeFilters.type === 'all' && styles.activeOption
                ]}
                onPress={() => handleTypeSelect('all')}
              >
                <Text style={[
                  styles.filterOptionText,
                  activeFilters.type === 'all' && styles.activeOptionText
                ]}>All</Text>
              </TouchableOpacity>
              
              {ITEM_TYPES.map(type => (
                <TouchableOpacity
                  key={type.value}
                  style={[
                    styles.filterOption,
                    activeFilters.type === type.value && styles.activeOption
                  ]}
                  onPress={() => handleTypeSelect(type.value)}
                >
                  <Text style={[
                    styles.filterOptionText,
                    activeFilters.type === type.value && styles.activeOptionText
                  ]}>{type.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.resetButton} 
              onPress={resetFilters}
            >
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.applyButton} 
              onPress={applyFilters}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.light.background,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  filterSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: Colors.light.text,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
    backgroundColor: Colors.light.cardBackground,
  },
  activeOption: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
  },
  filterOptionText: {
    color: Colors.light.text,
  },
  activeOptionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  resetButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
    marginRight: 8,
    alignItems: 'center',
  },
  applyButton: {
    flex: 2,
    padding: 14,
    borderRadius: 8,
    backgroundColor: Colors.light.tint,
    marginLeft: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: Colors.light.text,
    fontWeight: '500',
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});