import { Icon } from '@rneui/themed';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuthStore } from '../../../store/slices/authSlice';

const ShoppingCartWithBadgeIcon = ({ badgeCount = 5 }: { badgeCount?: number }) => (
  <View style={styles.badgeContainer}>
    <Icon
      name="shopping-cart"
      type="feather"
      size={24}
      color="#FFFFFF"
    />
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{badgeCount}</Text>
    </View>
  </View>
);

interface HeaderProps {
  onCartPress?: () => void;
}

export const HomeHeader: React.FC<HeaderProps> = ({ onCartPress }) => {
  const { user } = useAuthStore();

  if (!user) {
    // No user state - Simple header with greeting and shopping cart
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.leftSection}>
            <Icon
              name="sun"
              type="feather"
              size={20}
              color="#FFFFFF"
            />
            <Text style={styles.greetingText}>Chào buổi sáng</Text>
          </View>
          <TouchableOpacity onPress={onCartPress} style={styles.cartButton}>
            <Icon
              name="shopping-cart"
              type="feather"
              size={24}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // User logged in - Header with user info, greeting and shopping cart with badge
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <Icon
            name="sun"
            type="feather"
            size={20}
            color="#FFFFFF"
          />
          <Text style={styles.greetingTextWithUser}>Chào buổi sáng, {user?.name}!</Text>
        </View>
        <TouchableOpacity onPress={onCartPress} style={styles.cartButton}>
          <ShoppingCartWithBadgeIcon badgeCount={5} />
        </TouchableOpacity>
      </View>
      <View style={styles.phoneSection}>
        <Text style={styles.phoneNumber}>0707 123 456</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingBottom: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 4,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 4,
  },
  greetingText: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    color: '#FFFFFF',
  },
  greetingTextWithUser: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    color: '#FFFFFF',
  },
  cartButton: {
    padding: 4,
  },
  phoneSection: {
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  phoneNumber: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
    color: '#FFFFFF',
  },
  badgeContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#0000EA',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default HomeHeader;
