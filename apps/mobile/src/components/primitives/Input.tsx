import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";

interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  helper?: string;
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "password";
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
}

export function Input({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  helper,
  keyboardType = "default",
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  editable = true,
  style,
  inputStyle,
}: InputProps) {
  const hasError = Boolean(error);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#3f6b6250"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        numberOfLines={numberOfLines}
        editable={editable}
        style={[
          styles.input,
          hasError && styles.inputError,
          !editable && styles.inputDisabled,
          inputStyle,
        ]}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      {helper && !error && <Text style={styles.helper}>{helper}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#00201d",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#e4fff9",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#00201d",
    borderWidth: 2,
    borderColor: "transparent",
  },
  inputError: {
    borderColor: "#ba1a1a",
  },
  inputDisabled: {
    opacity: 0.5,
  },
  error: {
    fontSize: 12,
    color: "#ba1a1a",
    marginTop: 4,
  },
  helper: {
    fontSize: 12,
    color: "#3f6b62",
    marginTop: 4,
  },
});

export default Input;
