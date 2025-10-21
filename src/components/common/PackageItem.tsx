import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { buttonGradientColors } from '../../theme/rneui.theme';
import SimData from '../../types/simdata';
import { toCurrency } from '../../utils/format';
import { IconCall, IconMail, IconSpeed } from '../Svgs';
import { CustomButton } from './CustomButton';



interface PackageItemProps {
  package: SimData.Package;
  width?: number;
  isViki?: boolean;
  isSelect?: boolean;
  isView?: boolean;
  vikiPoints?: {
    accumulated: string;
    required: string;
  };
  onViewDetails?: () => void;
  onRegister?: () => void;

}

const SpeedIcon: React.FC<{ color?: string; desc: string }> = ({ color = '#0000EA', desc }) => {
  if (desc.includes('data')) return <IconSpeed />;
  if (desc.includes('sms')) return <IconMail />;
  return (
    <IconCall />
  );
};



export const PackageItem: React.FC<PackageItemProps> = ({ package: pkg, width, isSelect, isView, isViki, onViewDetails, onRegister, vikiPoints }) => {
  const shouldShowBorder = isViki && isSelect && !isView;
  const containerStyle = width
    ? [styles.container, shouldShowBorder && styles.vikiContainer, { width }]
    : [styles.container, shouldShowBorder && styles.vikiContainer];

  return (
    <View style={containerStyle}>
      <View style={[styles.content, { borderColor: isSelect ? '#0000EA' : '#FFFFFF', borderWidth: isSelect ? 2 : 0, borderRadius: 12 }]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <Text style={[styles.packageName, isViki && styles.vikiPackageName]}>{pkg.name}</Text>
            {isViki && (
              <View style={styles.vikiIcon}>
                <View style={styles.vikiIconInner} />
              </View>
            )}
            {/* {pkg.hasSaleTag && pkg.discount && !pkg.isViki && (
              <DiscountTag discount={pkg.discount} />
            )} */}
          </View>
          <TouchableOpacity onPress={onViewDetails} style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>Xem chi tiết</Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Features */}
        <View style={styles.featuresSection}>
          {pkg.description && pkg.description.map((desc, index) => (
            <View key={index} style={styles.featureRow}>
              <SpeedIcon color="#0000EA" desc={desc} />
              <Text style={styles.featureText}>{desc}</Text>
            </View>
          ))}

        </View>

        {/* Viki Points Section */}
        {isViki && vikiPoints && (
          <View style={styles.vikiPointsContainer}>
            <LinearGradient
              colors={buttonGradientColors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.vikiGradientBorder}
            >
              <View style={styles.vikiPointsContent}>
                <View style={styles.vikiPointItem}>
                  <Text style={styles.vikiPointLabel}>Quà tặng Vikki</Text>
                  <View style={styles.vikiPointBadge}>
                    <View style={styles.vikiPointCircle} />
                    <View style={styles.vikiPointNumber}>
                      <Text style={styles.vikiPointNumberText}>1</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.vikiDivider} />
                <View style={styles.vikiPointItem}>
                  <Text style={styles.vikiPointLabel}>Tích lũy T9</Text>
                  <View style={styles.vikiPointValue}>
                    <Text style={styles.vikiPointValueText}>{vikiPoints.accumulated}</Text>
                  </View>
                </View>
                <View style={styles.vikiDivider} />
                <View style={styles.vikiPointItem}>
                  <Text style={styles.vikiPointLabel}>Cần đạt T9</Text>
                  <View style={styles.vikiPointValue}>
                    <Text style={styles.vikiPointValueText}>{vikiPoints.required}</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>
        )}

        {/* Bottom Divider */}
        <View style={styles.divider} />

        {/* Price and Register */}
        <View style={styles.bottomSection}>
          <View style={styles.priceSection}>
            <View style={styles.priceContainer}>
              <Text style={[styles.currentPrice, { color: '#ED1B2F' }]}>
                {toCurrency(pkg.sale_price)}
              </Text>
              {pkg.price && pkg.price > pkg.sale_price && (
                <Text style={styles.originalPrice}>{toCurrency(pkg.price)}</Text>
              )}
            </View>
            {/* <Text style={styles.duration}>{pkg.duration}</Text> */}
          </View>
          <View style={styles.registerSection}>
            {!isView ? (
              <TouchableOpacity onPress={onRegister} style={styles.vikiRadioButton}>
                <View style={[styles.vikiRadioOuter, isSelect && styles.vikiRadioOuterSelected]}>
                  {isSelect && <View style={styles.vikiRadioInner} />}
                </View>
              </TouchableOpacity>
            ) : (
              <CustomButton
                title="Đăng ký"
                onPress={onRegister}
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
  vikiContainer: {
    borderWidth: 2,
    borderColor: '#0000EA',
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
  vikiPackageName: {
    flex: 0,
  },
  vikiIcon: {
    backgroundColor: '#0000EA',
    borderRadius: 4,
    padding: 4,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vikiIconInner: {
    width: 12,
    height: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
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
    flexDirection: 'row'
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
  vikiPointsContainer: {
    marginVertical: 4,
  },
  vikiGradientBorder: {
    borderRadius: 16,
    padding: 1,
    paddingVertical: 12,
  },
  vikiPointsContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,

  },
  vikiPointItem: {
    flexDirection: 'column',
    gap: 4,

  },
  vikiPointLabel: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: '#fff',
  },
  vikiPointBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  vikiPointCircle: {
    width: 19,
    height: 19,
    borderRadius: 22,
    backgroundColor: '#0000EA',
  },
  vikiPointNumber: {
    width: 18,
    height: 18,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vikiPointNumberText: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 20,
    color: '#0A00F9',
  },
  vikiPointValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vikiPointValueText: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    color: '#fff',
  },
  vikiDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#8A8A8A',
    opacity: 0.5,
  },
  vikiRadioButton: {
    width: 125,
    height: 24,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  vikiRadioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#D6D6D6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vikiRadioOuterSelected: {
    borderColor: '#0000EA',
  },
  vikiRadioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0000EA',
  },
});

export default PackageItem;