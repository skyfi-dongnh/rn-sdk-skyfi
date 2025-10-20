import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MoneyIcon, PackageIcon, SimCardIcon, TravelIcon } from '../../Svgs';

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  onPress?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.iconContainer}>
      {icon}
    </View>
    <Text style={styles.menuTitle}>{title}</Text>
  </TouchableOpacity>
);

interface HomeMenuProps {
  onBuySimPress?: () => void;
  onPackagePress?: () => void;
  onTopUpPress?: () => void;
  onTravelSimPress?: () => void;
}

export const HomeMenu: React.FC<HomeMenuProps> = ({
  onBuySimPress,
  onPackagePress,
  onTopUpPress,
  onTravelSimPress,
}) => {
  return (
    <View style={styles.container}>
      <MenuItem
        icon={<SimCardIcon />}
        title="Mua SIM"
        onPress={onBuySimPress}
      />
      <MenuItem
        icon={<PackageIcon />}
        title="Gói cước"
        onPress={onPackagePress}
      />
      <MenuItem
        icon={<MoneyIcon />}
        title="Nạp tiền"
        onPress={onTopUpPress}
      />
      <MenuItem
        icon={<TravelIcon />}
        title="eSIM du lịch"
        onPress={onTravelSimPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 4,
    paddingHorizontal: 16,
		paddingVertical: 8,
	marginTop: 16,
  },
  menuItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  iconContainer: {
    backgroundColor: '#0000EA',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
  },
  menuTitle: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
    color: '#333333',
    textAlign: 'center',
  },
});

export default HomeMenu;
