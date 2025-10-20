import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PackageData, PackageItem } from '../../common/PackageItem';

interface HomePackagesProps {
  packages?: PackageData[];
  onViewAll?: () => void;
}

export const HomePackages: React.FC<HomePackagesProps> = ({
  packages = [],
  onViewAll,
}) => {
  const mockPackages: PackageData[] = [
    {
      id: '1',
      name: 'DATA NAME',
      data: 'Data: 2GB/ngày',
      minutes: 'Phút gọi: 800 phút gọi liên mạng',
      currentPrice: '70.000 VND',
      originalPrice: '100.000 VND',
      duration: '/ 30 ngày',
      discount: '30%',
      hasSaleTag: true,
      onViewDetails: () => console.log('View details 1'),
      onRegister: () => console.log('Register 1'),
    },
    {
      id: '2',
      name: 'DATA NAME',
      data: 'Data: 2GB/ngày',
      minutes: 'Phút gọi: 800 phút gọi liên mạng',
      currentPrice: '70.000 VND',
      originalPrice: '100.000 VND',
      duration: '/ 30 ngày',
      hasSaleTag: false,
      onViewDetails: () => console.log('View details 2'),
      onRegister: () => console.log('Register 2'),
    },
  ];

  const displayPackages = packages.length > 0 ? packages : mockPackages;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Gói cước hot</Text>
        </View>
        <TouchableOpacity onPress={onViewAll} style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>Khám phá</Text>
        </TouchableOpacity>
      </View>

      {/* Packages Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        {displayPackages.map((pkg, index) => (
          <PackageItem
            key={pkg.id}
            package={pkg}
            width={index === 0 ? 323 : 313} // First item is slightly wider
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  titleSection: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
    color: '#333333',
    textAlign: 'left',
  },
  viewAllButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  viewAllText: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: '#0000EA',
    textAlign: 'center',
  },
  scrollView: {
    marginLeft: 16,
  },
  scrollContent: {
    gap: 20,
    paddingRight: 16,
  },
});

export default HomePackages;
