import { Button } from '@rneui/themed';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { modal, useModal } from './modal';

// Example modal content component based on the Figma design
const ExampleModalContent = () => {
    const { close, done } = useModal();
  return (
    <View style={styles.modalContent}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Gửi yêu cầu thất bại!</Text>
        <Text style={styles.description}>
          Vui lòng kiểm tra kết nối mạng và thử lại{'\n'}
          Hãy đảm bảo ánh sáng và camera rõ ràng, sau đó thử lại{'\n'}
          Nếu lỗi vẫn tiếp tục, vui lòng thực hiện lại video call.
        </Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.outlineButton} onPress={close}>
          <Text style={styles.outlineButtonText}>Thực hiện lại</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.primaryButton} onPress={() => done({ action: 'send_video' })}>
          <Text style={styles.primaryButtonText}>Gửi Video</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Example usage component
export const ModalExamples = () => {
  const showModal = () => {
    modal.open({
      typeModal: 'modal',
      render: <ExampleModalContent />,
      onDone: (data: any) => {
        console.log('Modal done with data:', data);
      },
      onClose: () => {
        console.log('Modal closed');
      },
    });
  };

  const showBottomSheet = () => {
    modal.showBottomSheet({
      render: ({ close, done }) => (
        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>Bottom Sheet Example</Text>
          <Text style={styles.bottomSheetText}>
            This is a bottom sheet modal that slides up from the bottom.
          </Text>
          <View style={styles.bottomSheetButtons}>
            <Button title="Close" onPress={close} type="outline" />
            <Button title="Confirm" onPress={() => done({ confirmed: true })} />
          </View>
        </View>
      ),
      onDone: (data: any) => {
        console.log('Bottom sheet done with data:', data);
      },
    });
  };

  const showSheet = () => {
    modal.open({
      render: ({ close, done }) => (
        <View style={styles.sheetContent}>
          <Text style={styles.sheetTitle}>Sheet Example</Text>
          <Text style={styles.sheetText}>
            This is a sheet modal with a different presentation style.
          </Text>
          <View style={styles.sheetButtons}>
            <Button title="Cancel" onPress={close} type="outline" />
            <Button title="Save" onPress={() => done({ saved: true })} />
          </View>
        </View>
      ),
      onDone: (data: any) => {
        console.log('Sheet done with data:', data);
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.exampleTitle}>Modal Examples</Text>
      
      <TouchableOpacity style={styles.exampleButton} onPress={showModal}>
        <Text style={styles.exampleButtonText}>Show Modal</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.exampleButton} onPress={showBottomSheet}>
        <Text style={styles.exampleButtonText}>Show Bottom Sheet</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.exampleButton} onPress={showSheet}>
        <Text style={styles.exampleButtonText}>Show Sheet</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
  },
  exampleTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  exampleButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  exampleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Modal content styles (based on Figma design)
  modalContent: {
    gap: 24,
  },
  header: {
    gap: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 26.4,
    color: '#D2008C',
    textAlign: 'center',
  },
  description: {
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 15,
    color: '#5C5C5C',
    textAlign: 'center',
    width: 300,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  outlineButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: 'rgba(84, 85, 86, 0.12)',
    backgroundColor: '#FFFFFF',
    width: 144,
    alignItems: 'center',
  },
  outlineButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0E0E0F',
    lineHeight: 20,
  },
  primaryButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 1000,
    width: 144,
    alignItems: 'center',
    backgroundColor: '#6100FF', // Fallback color - use LinearGradient component for actual gradient
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 20,
  },
  
  // Bottom sheet styles
  bottomSheetContent: {
    gap: 16,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  bottomSheetText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  bottomSheetButtons: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  
  // Sheet styles
  sheetContent: {
    gap: 16,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  sheetText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
  },
  sheetButtons: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
});