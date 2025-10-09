import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Modal,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

interface SheetProps {
  visible: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  closeOnBackdrop?: boolean;
  animationType?: 'fade' | 'slide';
  position?: 'center' | 'top' | 'bottom';
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const Sheet: React.FC<SheetProps> = ({
  visible,
  onClose,
  children,
  closeOnBackdrop = true,
  animationType = 'slide',
  position = 'center',
}) => {
  const translateY = useRef(new Animated.Value(position === 'top' ? -screenHeight : screenHeight)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Animate in
      if (animationType === 'slide') {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    } else {
      // Animate out
      if (animationType === 'slide') {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: position === 'top' ? -screenHeight : screenHeight,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }).start();
      }
    }
  }, [visible, translateY, opacity, animationType, position]);

  const handleBackdropPress = () => {
    if (closeOnBackdrop && onClose) {
      onClose();
    }
  };

  const getSheetStyle = () => {
    switch (position) {
      case 'top':
        return styles.sheetTop;
      case 'bottom':
        return styles.sheetBottom;
      default:
        return styles.sheetCenter;
    }
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View
        style={[
          styles.backdrop,
          {
            opacity,
          },
        ]}
      >
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <View style={styles.backdropTouchable} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            getSheetStyle(),
            animationType === 'slide' && {
              transform: [{ translateY }],
            },
          ]}
        >
          {children}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  backdropTouchable: {
    ...StyleSheet.absoluteFillObject,
  },
  sheetCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: Math.min(screenWidth * 0.9, 400),
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
    transform: [
      { translateX: -Math.min(screenWidth * 0.9, 400) / 2 },
      { translateY: -100 }, // Approximate center offset
    ],
  },
  sheetTop: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  sheetBottom: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
});