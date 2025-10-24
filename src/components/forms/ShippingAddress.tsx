import { Icon } from '@rneui/themed';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ViewStyle,
} from 'react-native';
import Input from './Input';

interface ShippingAddressProps {
  control: Control<any>;
  selectedAddress?: {
    address: string;
    cityId: number;
    districtId: number;
    wardId: number;
  };
  onAddressSelect: () => void;
  isRequired?: boolean;
  containerStyle?: ViewStyle;
}

export const ShippingAddress: React.FC<ShippingAddressProps> = ({
  control,
  selectedAddress,
  onAddressSelect,
  isRequired = false,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.sectionTitle}>Địa chỉ nhận SIM</Text>

      <Controller
        name="address_selection"
        control={control}
        rules={
          isRequired
            ? {
                validate: () =>
                  selectedAddress ? true : 'Vui lòng chọn địa chỉ',
              }
            : undefined
        }
        render={({ fieldState: { error } }) => (
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              Tỉnh/Thành phố, Quận/ Huyện, Phường/Xã
              {isRequired && <Text style={styles.required}>*</Text>}
            </Text>
            <TouchableOpacity
              style={[
                styles.inputWithIcon,
                error && styles.inputError,
              ]}
              onPress={onAddressSelect}
            >
              <Text
                style={[
                  styles.input,
                  styles.inputNoBorder,
                  selectedAddress?.address
                    ? styles.addressText
                    : styles.addressPlaceholder,
                ]}
              >
                {selectedAddress?.address || 'Chọn địa chỉ'}
              </Text>
              <Icon name="chevron-down" type="ionicon" size={20} color="#333333" />
            </TouchableOpacity>
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </View>
        )}
      />

      <Input
        name="delivery_address"
        control={control}
        label="Địa chỉ chi tiết"
        placeholder="Nhập địa chỉ chi tiết"
        required={isRequired}
        rules={
          isRequired
            ? {
                required: 'Địa chỉ chi tiết là bắt buộc',
              }
            : undefined
        }
        containerStyle={styles.formGroup}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  formGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: '#333333',
    marginBottom: 4,
  },
  required: {
    color: '#ED1B2F',
  },
  input: {
    borderWidth: 1,
    borderColor: '#F1F1F1',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333333',
    backgroundColor: '#FFFFFF',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F1F1',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: '#ED1B2F',
  },
  inputNoBorder: {
    borderWidth: 0,
    flex: 1,
    paddingHorizontal: 0,
  },
  addressText: {
    color: '#333333',
    fontSize: 16,
  },
  addressPlaceholder: {
    color: '#A1A1A1',
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    color: '#ED1B2F',
    marginTop: 4,
  },
});

export default ShippingAddress;