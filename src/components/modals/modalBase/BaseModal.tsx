import React from 'react';
import {
    Dimensions,
    Modal,
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { useModal } from '../../common/modal';

export interface BaseModalProps {
  visible: boolean;
  children: React.ReactNode;
  closeOnBackdrop?: boolean;
  animationType?: 'none' | 'slide' | 'fade';
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const BaseModal: React.FC<BaseModalProps> = ({
  visible,
  children,
  closeOnBackdrop = true,
  animationType = 'slide',
}) => {
  const { close } = useModal();
  return (
    <Modal
      visible={visible}
      transparent
      animationType={animationType}
      onRequestClose={closeOnBackdrop ? close : undefined}
    >
      <TouchableWithoutFeedback onPress={closeOnBackdrop ? close : undefined}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback onPress={closeOnBackdrop ? close : undefined}>
            <View style={styles.modalContainer}>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
    maxHeight: screenHeight * 0.8,
    maxWidth: screenWidth * 0.9,
  },
});