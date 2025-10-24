import { Icon } from '@rneui/themed';
import React from 'react';
import {
	Linking,
	StyleSheet,
	Text,
	TextStyle,
	TouchableOpacity,
	View,
	ViewStyle,
} from 'react-native';

export interface TextSegment {
  text: string;
  isLink?: boolean;
  url?: string;
  onPress?: () => void;
  style?: TextStyle;
}

export interface CustomCheckboxProps {
  checked: boolean;
  onPress: () => void;
  textSegments: TextSegment[];
  disabled?: boolean;
  containerStyle?: ViewStyle;
  checkboxStyle?: ViewStyle;
  textContainerStyle?: ViewStyle;
  size?: number;
  checkedColor?: string;
  uncheckedColor?: string;
  checkboxBorderColor?: string;
  checkboxBackgroundColor?: string;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onPress,
  textSegments,
  disabled = false,
  containerStyle,
  checkboxStyle,
  textContainerStyle,
  size = 20,
  checkedColor = '#D2008C',
  uncheckedColor = '#A1A1A1',
  checkboxBorderColor = '#A1A1A1',
  checkboxBackgroundColor = '#FFFFFF',
}) => {
  const handleLinkPress = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.warn(`Cannot open URL: ${url}`);
      }
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  const renderTextSegments = () => {
    return textSegments.map((segment, index) => {
      if (segment.isLink && (segment.url || segment.onPress)) {
        const handlePress = () => {
          if (segment.onPress) {
            segment.onPress();
          } else if (segment.url) {
            handleLinkPress(segment.url);
          }
        };

        return (
          <Text
            key={index}
            style={[
              styles.linkText,
              segment.style,
              disabled && styles.disabledText,
            ]}
            onPress={disabled ? undefined : handlePress}
          >
            {segment.text}
          </Text>
        );
      }

      return (
        <Text
          key={index}
          style={[
            styles.normalText,
            segment.style,
            disabled && styles.disabledText,
          ]}
        >
          {segment.text}
        </Text>
      );
    });
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[
          styles.checkbox,
          {
            width: size,
            height: size,
            borderColor: checked ? checkedColor : checkboxBorderColor,
            backgroundColor: checked ? checkedColor : checkboxBackgroundColor,
          },
          checkboxStyle,
          disabled && styles.disabledCheckbox,
        ]}
        onPress={disabled ? undefined : onPress}
        activeOpacity={0.7}
      >
        {checked && (
          <Icon
            name="check"
            type="material"
            size={size * 0.7}
            color="#FFFFFF"
          />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.textContainer, textContainerStyle]}
        onPress={disabled ? undefined : onPress}
        activeOpacity={1}
      >
        <Text style={styles.textWrapper}>
          {renderTextSegments()}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  checkbox: {
    borderWidth: 1.25,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2, // Slight offset to align with text baseline
  },
  textContainer: {
    flex: 1,
  },
  textWrapper: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333333',
    flexWrap: 'wrap',
  },
  normalText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333333',
    fontWeight: '400',
  },
  linkText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#D2008C',
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
  disabledCheckbox: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.5,
  },
});

export default CustomCheckbox;