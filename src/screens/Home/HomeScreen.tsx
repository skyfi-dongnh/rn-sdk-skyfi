import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useI18n } from '../../hooks';
import { LanguageSwitcher } from '../../components/common';

const HomeScreen: React.FC = ({}) => {
  const navigation = useNavigation();
  const { t } = useI18n();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.languageContainer}>
        <LanguageSwitcher />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{t('home.title')}</Text>
        <Text style={styles.subtitle}>{t('home.subtitle')}</Text>

        <TouchableOpacity
          style={styles.button}
          // @ts-ignore
          onPress={() => navigation.navigate('Meeting', { room: '0879999328' })}>
          <Text style={styles.buttonText}>{t('home.startCall')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  languageContainer: {
    alignItems: 'flex-end',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
