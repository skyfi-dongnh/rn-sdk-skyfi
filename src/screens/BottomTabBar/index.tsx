import { Icon } from '@rneui/themed';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useI18n } from '../../hooks';
import HomeScreen from '../Home/HomeScreen';
import NotificationScreen from '../Notification/NotificationScreen';
import ProfileScreen from '../Profile/ProfileScreen';
import SupportScreen from '../Support/SupportScreen';

type TabName = 'HomeTab' | 'NotificationTab' | 'SupportTab' | 'ProfileTab';

interface TabItem {
  name: TabName;
  iconFocused: string;
  iconUnfocused: string;
  labelKey: string;
  component: React.ComponentType<any>;
}

const tabs: TabItem[] = [
  {
    name: 'HomeTab',
    iconFocused: 'home',
    iconUnfocused: 'home-outline',
    labelKey: 'tabs.home',
    component: HomeScreen,
  },
  {
    name: 'NotificationTab',
    iconFocused: 'bell',
    iconUnfocused: 'bell-outline',
    labelKey: 'tabs.notification',
    component: NotificationScreen,
  },
  {
    name: 'SupportTab',
    iconFocused: 'headset',
    iconUnfocused: 'headset',
    labelKey: 'tabs.support',
    component: SupportScreen,
  },
  {
    name: 'ProfileTab',
    iconFocused: 'account',
    iconUnfocused: 'account-outline',
    labelKey: 'tabs.profile',
    component: ProfileScreen,
  },
];

const BottomTabNavigator: React.FC = () => {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<TabName>('HomeTab');

  const ActiveComponent = tabs.find(tab => tab.name === activeTab)?.component || HomeScreen;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ActiveComponent />
      </View>

      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isFocused = activeTab === tab.name;
          const color = isFocused ? '#0000EA' : '#5C5C5C';
          const iconName = isFocused ? tab.iconFocused : tab.iconUnfocused;

          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tabBarItem}
              onPress={() => setActiveTab(tab.name)}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                <Icon
                  name={iconName}
                  type="material-community"
                  size={24}
                  color={color}
                />
              </View>
              <Text style={[styles.tabLabel, { color }]}>
                {t(tab.labelKey)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F1F1',
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 16,
    height: 70,
  },
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 16.5,
    textAlign: 'center',
    marginTop: 4,
  },
});

export default BottomTabNavigator;
