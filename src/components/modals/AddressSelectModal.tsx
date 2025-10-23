import React, { useMemo, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useCities, useDistricts, useWards } from '../../hooks/useAddress';
import { modal, useModal } from '../common';

interface AddressSelectModalProps {
  onSelect: (address: SelectedAddress) => void;
  initialAddress?: SelectedAddress;
}

export interface SelectedAddress {
  cityId?: number;
  districtId?: number;
  wardId?: number;
  address?: string;
}

type AddressStep = 'city' | 'district' | 'ward';

interface InternalSelectedAddress {
  city?: Checkout.City;
  district?: Checkout.District;
  ward?: Checkout.Ward;
}

const AddressSelectModalContent: React.FC<AddressSelectModalProps> = ({
  onSelect,
  initialAddress,
}) => {
  const { close } = useModal();
  
  const [internalAddress, setInternalAddress] = useState<InternalSelectedAddress>({});
  const [currentStep, setCurrentStep] = useState<AddressStep>('city');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch data using hooks
  const cities = useCities();
  const districts = useDistricts(internalAddress.city?.id || 0);
  const wards = useWards(internalAddress.district?.id || 0);

  // Filter based on search query
  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      switch (currentStep) {
        case 'city':
          return cities;
        case 'district':
          return districts;
        case 'ward':
          return wards;
      }
    }

    switch (currentStep) {
      case 'city':
        return cities.filter((item) => item.name.toLowerCase().includes(query));
      case 'district':
        return districts.filter((item) => item.name.toLowerCase().includes(query));
      case 'ward':
        return wards.filter((item) => item.name.toLowerCase().includes(query));
    }
  }, [currentStep, searchQuery, cities, districts, wards]);

  const handleReset = () => {
    setInternalAddress({});
    setCurrentStep('city');
    setSearchQuery('');
  };

  const handleSelectCity = (city: Checkout.City) => {
    setInternalAddress({ city });
    setCurrentStep('district');
    setSearchQuery('');
  };

  const handleSelectDistrict = (district: Checkout.District) => {
    setInternalAddress((prev) => ({ ...prev, district }));
    setCurrentStep('ward');
    setSearchQuery('');
  };

  const handleSelectWard = (ward: Checkout.Ward) => {
    const finalInternalAddress = { ...internalAddress, ward };
    setInternalAddress(finalInternalAddress);
    const addressString = `${ward.name}, ${finalInternalAddress.district?.name}, ${finalInternalAddress.city?.name}`;
    const selectedAddress: SelectedAddress = {
      cityId: finalInternalAddress.city?.id,
      districtId: finalInternalAddress.district?.id,
      wardId: finalInternalAddress.ward?.id,
      address: addressString,
    };
    onSelect(selectedAddress);
    close();
  };

  const handleConfirm = () => {
    if (internalAddress.city && internalAddress.district && internalAddress.ward) {
      const addressString = `${internalAddress.ward.name}, ${internalAddress.district.name}, ${internalAddress.city.name}`;
      const selectedAddress: SelectedAddress = {
        cityId: internalAddress.city.id,
        districtId: internalAddress.district.id,
        wardId: internalAddress.ward.id,
        address: addressString,
      };
      onSelect(selectedAddress);
      close();
    }
  };

  const isConfirmDisabled = !internalAddress.city || !internalAddress.district || !internalAddress.ward;

  const getStepTitle = () => {
    switch (currentStep) {
      case 'city':
        return 'Tỉnh/Thành phố';
      case 'district':
        return 'Quận/Huyện';
      case 'ward':
        return 'Phường/Xã';
    }
  };

  const renderItem = ({ item }: { item: Checkout.City | Checkout.District | Checkout.Ward }) => {
    const handlePress = () => {
      if (currentStep === 'city') {
        handleSelectCity(item as Checkout.City);
      } else if (currentStep === 'district') {
        handleSelectDistrict(item as Checkout.District);
      } else {
        handleSelectWard(item as Checkout.Ward);
      }
    };

    return (
      <TouchableOpacity style={styles.listItem} onPress={handlePress}>
        <Text style={styles.listItemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderStepIndicator = () => (
    <View style={styles.stepContainer}>
      {internalAddress.city && (
        <View style={styles.stepItem}>
          <View style={styles.stepIconFinished} />
          <View style={styles.stepTextWrapper}>
            <Text style={styles.stepTextFinished}>{internalAddress.city.name}</Text>
          </View>
        </View>
      )}
      {internalAddress.district && (
        <View style={styles.stepItem}>
          <View style={styles.stepIconFinished} />
          <View style={styles.stepTextWrapper}>
            <Text style={styles.stepTextFinished}>{internalAddress.district.name}</Text>
          </View>
        </View>
      )}
      {!internalAddress.ward && (
        <View style={styles.stepItemWaiting}>
          <View style={styles.stepIconContainer}>
            <View style={styles.stepIconWaiting} />
          </View>
          <View style={styles.stepTextWrapperWaiting}>
            <Text style={styles.stepTextWaiting}>
              {currentStep === 'city'
                ? 'Chọn Tỉnh/Thành phố'
                : currentStep === 'district'
                ? 'Chọn Quận/Huyện'
                : 'Chọn Phường/Xã'}
            </Text>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={close}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chọn địa chỉ nhận SIM</Text>
      </View>

      {/* Selected Area & Reset */}
      <View style={styles.selectedAreaHeader}>
        <Text style={styles.selectedAreaLabel}>Khu vực được chọn</Text>
        <TouchableOpacity onPress={handleReset}>
          <Text style={styles.resetButton}>Thiết lập lại</Text>
        </TouchableOpacity>
      </View>

      {/* Step Indicator */}
      {renderStepIndicator()}

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm"
            placeholderTextColor="#A1A1A1"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Category Header */}
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryHeaderText}>{getStepTitle()}</Text>
      </View>

      {/* List */}
      {cities.length === 0 && currentStep === 'city' ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#D2008C" />
        </View>
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}

      {/* Confirm Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.confirmButton, isConfirmDisabled && styles.confirmButtonDisabled]}
          onPress={handleConfirm}
          disabled={isConfirmDisabled}
        >
          <Text
            style={[
              styles.confirmButtonText,
              isConfirmDisabled && styles.confirmButtonTextDisabled,
            ]}
          >
            Xác nhận
          </Text>
        </TouchableOpacity>
        <View style={styles.homeIndicator} />
      </View>
    </View>
  );
};

export const showAddressSelectModal = (props: AddressSelectModalProps): Promise<SelectedAddress | null> => {
  return new Promise((resolve) => {
    const wrappedOnSelect = (address: SelectedAddress) => {
      props.onSelect(address);
      resolve(address);
    };

    modal.showBottomSheet({
      render: <AddressSelectModalContent {...props} onSelect={wrappedOnSelect} />,
      onClose: () => {
        resolve(null);
      },
      props: {
        closeOnBackdrop: true,
        maxHeight: 0.9,
      } as any,
    });
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    paddingHorizontal: 16,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    left: 16,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: '#333333',
  },
  headerTitle: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
    color: '#333333',
    textAlign: 'center',
  },
  selectedAreaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  selectedAreaLabel: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: '#8A8A8A',
  },
  resetButton: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: '#D2008C',
  },
  stepContainer: {
    flexDirection: 'column',
    paddingHorizontal: 16,
    gap: 0,
  },
  stepItem: {
    flexDirection: 'row',
    gap: 16,
    height: 33,
  },
  stepItemWaiting: {
    flexDirection: 'row',
    gap: 16,
    minHeight: 33,
  },
  stepIconFinished: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0000EA',
    marginTop: 7,
  },
  stepIconContainer: {
    alignItems: 'center',
    paddingTop: 7,
    gap: 6,
  },
  stepIconWaiting: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C0C0C0',
  },
  stepTextWrapper: {
    flex: 1,
    gap: 4,
    paddingBottom: 12,
  },
  stepTextWrapperWaiting: {
    flex: 1,
    gap: 4,
    paddingBottom: 8,
  },
  stepTextFinished: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
    color: '#222222',
  },
  stepTextWaiting: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
    color: '#D2008C',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
  },
  searchIcon: {
    fontSize: 20,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: '#000000',
    padding: 0,
  },
  categoryHeader: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  categoryHeaderText: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#8A8A8A',
  },
  list: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 16,
  },
  listItem: {
    paddingVertical: 16,
  },
  listItemText: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: '#333333',
  },
  separator: {
    height: 1,
    backgroundColor: '#F1F1F1',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 10,
  },
  confirmButton: {
    backgroundColor: '#C0C0C0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: '#C0C0C0',
  },
  confirmButtonText: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    color: '#A1A1A1',
    textAlign: 'center',
  },
  confirmButtonTextDisabled: {
    color: '#A1A1A1',
  },
  homeIndicator: {
    width: 139,
    height: 5,
    backgroundColor: '#000000',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
});

export default AddressSelectModalContent;
