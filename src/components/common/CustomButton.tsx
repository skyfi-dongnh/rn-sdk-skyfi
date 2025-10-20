import React from 'react';
import { DimensionValue, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Button gradient colors
const buttonGradientColors = ['#2C4EFF', '#0000FF', '#6100FF', '#DA0191', '#FF8A00', '#FFB907'];

export type ButtonType = 'primary' | 'outline';
export type ButtonSize = 'small' | 'medium' | 'large';

interface CustomButtonProps {
  title: string;
  onPress?: () => void;
  type?: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  width?: DimensionValue;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  type = 'primary',
  size = 'medium',
  disabled = false,
  style,
  titleStyle,
  width,
}) => {
  const buttonStyle = [
    styles.baseButton,
    styles[`${size}Button`],
    width && { width },
    disabled && styles.disabledButton,
    style,
  ];

  const textStyle = [
    styles.baseTitle,
    styles[`${size}Title`],
    type === 'outline' ? styles.outlineTitle : styles.primaryTitle,
    disabled && styles.disabledTitle,
    titleStyle,
  ];

  if (type === 'primary') {
    return (
      <LinearGradient
        colors={disabled ? ['#CCCCCC', '#CCCCCC'] : buttonGradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.04, 0.47, 0.78, 0.98, 1]}
        style={buttonStyle}
      >
        <TouchableOpacity
          style={styles.touchableContent}
          onPress={onPress}
          disabled={disabled}
          activeOpacity={0.8}
        >
          <Text style={textStyle}>{title}</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  // Outline button
  return (
    <TouchableOpacity
      style={[buttonStyle, styles.outlineButton]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  touchableContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Size variants
  smallButton: {
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  mediumButton: {
    height: 48,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  largeButton: {
    height: 56,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  // Outline specific styles
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(84, 85, 86, 0.12)',
  },
  // Disabled states
  disabledButton: {
    opacity: 0.6,
  },
  // Text styles
  baseTitle: {
    fontWeight: '600',
    textAlign: 'center',
  },
  smallTitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  mediumTitle: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.2,
  },
  largeTitle: {
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: -0.2,
  },
  primaryTitle: {
    color: '#FFFFFF',
  },
  outlineTitle: {
    color: '#0E0E0F',
  },
  disabledTitle: {
    opacity: 0.6,
  },
});

export default CustomButton;