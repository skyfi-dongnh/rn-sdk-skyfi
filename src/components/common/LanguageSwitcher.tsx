import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useI18n } from '../../hooks';

export const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, changeLanguage, languages } = useI18n();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          currentLanguage === languages.EN && styles.activeButton,
        ]}
        onPress={() => changeLanguage(languages.EN)}>
        <Text
          style={[
            styles.buttonText,
            currentLanguage === languages.EN && styles.activeText,
          ]}>
          EN
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          currentLanguage === languages.VI && styles.activeButton,
        ]}
        onPress={() => changeLanguage(languages.VI)}>
        <Text
          style={[
            styles.buttonText,
            currentLanguage === languages.VI && styles.activeText,
          ]}>
          VI
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#007AFF',
    backgroundColor: 'transparent',
  },
  activeButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  activeText: {
    color: '#fff',
  },
});
