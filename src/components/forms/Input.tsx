import React from 'react';
import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

interface InputProps<T extends FieldValues> extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  containerStyle?: ViewStyle;
  rules?: RegisterOptions<T>;
}

const Input = <T extends FieldValues>({
  name,
  control,
  label,
  required = false,
  helperText,
  error,
  containerStyle,
  placeholder,
  rules,
  ...textInputProps
}: InputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error: fieldError } }) => (
        <View style={[styles.container, containerStyle]}>
          {label && (
            <View style={styles.labelContainer}>
              <Text style={styles.label}>{label}</Text>
              {required && <Text style={styles.required}>*</Text>}
            </View>
          )}

          <View style={[styles.inputWrapper, (error || fieldError) && styles.inputWrapperError]}>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor="#A1A1A1"
              {...textInputProps}
            />
          </View>

          {(error || fieldError) && <Text style={styles.errorText}>{error || fieldError?.message}</Text>}
          {!(error || fieldError) && helperText && <Text style={styles.helperText}>{helperText}</Text>}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: '#333333',
  },
  required: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
    color: '#ED1B2F',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F1F1F1',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 48,
    gap: 8,
  },
  inputWrapperError: {
    borderColor: '#ED1B2F',
  },
  input: {
    flex: 1,
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: '#000000',
    padding: 0,
  },
  errorText: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: '#ED1B2F',
    marginTop: 4,
  },
  helperText: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: '#666666',
    marginTop: 4,
  },
});

export default Input;
