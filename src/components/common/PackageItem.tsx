import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CustomButton } from './CustomButton';

export interface PackageData {
  id: string;
  name: string;
  data: string;
  minutes: string;
  currentPrice: string;
  originalPrice?: string;
  duration: string;
  discount?: string;
  hasSaleTag?: boolean;
  onViewDetails?: () => void;
  onRegister?: () => void;
}

interface PackageItemProps {
  package: PackageData;
  width?: number;
}

const SpeedIcon: React.FC<{ color?: string }> = ({ color = '#0000EA' }) => (
  <View style={[styles.iconContainer, { backgroundColor: color }]}>
    <View style={styles.iconInner}>
      {/* Speed/Dashboard icon placeholder */}
      <View style={[styles.iconElement, { backgroundColor: color }]} />
    </View>
  </View>
);

const DiscountTag: React.FC<{ discount: string }> = ({ discount }) => (
  <View style={styles.discountTag}>
    <View style={styles.discountIcon} />
    <Text style={styles.discountText}>{discount}</Text>
  </View>
);

export const PackageItem: React.FC<PackageItemProps> = ({ package: pkg, width }) => {
  const containerStyle = width ? [styles.container, { width }] : styles.container;

  return (
    <View style={containerStyle}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <Text style={styles.packageName}>{pkg.name}</Text>
            {pkg.hasSaleTag && pkg.discount && (
              <DiscountTag discount={pkg.discount} />
            )}
          </View>
          <TouchableOpacity onPress={pkg.onViewDetails} style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>Xem chi tiết</Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Features */}
        <View style={styles.featuresSection}>
          <View style={styles.featureRow}>
            <SpeedIcon color="#0000EA" />
            <Text style={styles.featureText}>{pkg.data}</Text>
          </View>
          <View style={styles.featureRow}>
            <SpeedIcon color="#333333" />
            <Text style={styles.featureText}>{pkg.minutes}</Text>
          </View>
        </View>

        {/* Bottom Divider */}
        <View style={styles.divider} />

        {/* Price and Register */}
        <View style={styles.bottomSection}>
          <View style={styles.priceSection}>
            <View style={styles.priceContainer}>
              <Text style={[styles.currentPrice, { color: pkg.hasSaleTag ? '#D2008C' : '#ED1B2F' }]}>
                {pkg.currentPrice}
              </Text>
              {pkg.originalPrice && (
                <Text style={styles.originalPrice}>{pkg.originalPrice}</Text>
              )}
            </View>
            <Text style={styles.duration}>{pkg.duration}</Text>
          </View>
          <View style={styles.registerSection}>
            {pkg.hasSaleTag ? (
              <LinearGradient
                colors={['#2C4EFF', '#0000FF', '#6100FF', '#DA0191', '#FF8A00', '#FFB907']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <TouchableOpacity onPress={pkg.onRegister} style={styles.gradientButtonInner}>
                  <Text style={styles.registerButtonText}>Đăng ký</Text>
                </TouchableOpacity>
              </LinearGradient>
            ) : (
              <CustomButton
                title="Đăng ký"
                onPress={pkg.onRegister}
                type="primary"
                size="small"
                style={styles.registerButton}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F1F1',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    padding: 16,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  packageName: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    color: '#333333',
    flex: 1,
  },
  discountTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0000EA',
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 4,
    gap: 4,
  },
  discountIcon: {
    width: 16,
    height: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  discountText: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    color: '#FFFFFF',
  },
  detailsButton: {
    padding: 8,
  },
  detailsButtonText: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: '#D2008C',
    textDecorationLine: 'underline',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F1F1',
  },
  featuresSection: {
    gap: 8,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconInner: {
    width: 20,
    height: 20,
  },
  iconElement: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  featureText: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#333333',
  },
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  priceSection: {
    flex: 1,
    gap: 4,
  },
  priceContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  currentPrice: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
  },
  originalPrice: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#8A8A8A',
    textDecorationLine: 'line-through',
  },
  duration: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: '#8A8A8A',
  },
  registerSection: {
    gap: 4,
  },
  gradientButton: {
    borderRadius: 35,
    padding: 1,
  },
  gradientButtonInner: {
    backgroundColor: 'transparent',
    borderRadius: 34,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButton: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  registerButtonText: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: '#FFFFFF',
  },
});

export default PackageItem;