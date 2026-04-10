import React from "react";
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const variantStyles: Record<ButtonVariant, ViewStyle> = {
  primary: { backgroundColor: "#006b2c" },
  secondary: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#006b2c",
  },
  ghost: { backgroundColor: "transparent" },
  danger: { backgroundColor: "#ba1a1a" },
};

const sizeStyles: Record<ButtonSize, { padding: number; fontSize: number }> = {
  sm: { padding: 8, fontSize: 14 },
  md: { padding: 12, fontSize: 16 },
  lg: { padding: 16, fontSize: 18 },
};

const textColorStyles: Record<ButtonVariant, string> = {
  primary: "#fff",
  secondary: "#006b2c",
  ghost: "#006b2c",
  danger: "#fff",
};

export function Button({
  title,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  onPress,
  style,
  textStyle,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <React.Fragment>
      <Text
        onPress={isDisabled ? undefined : onPress}
        style={[
          styles.button,
          variantStyles[variant],
          {
            paddingVertical: sizeStyles[size].padding,
            paddingHorizontal: sizeStyles[size].padding * 1.5,
          },
          fullWidth && { width: "100%" },
          isDisabled && { opacity: 0.5 },
          style,
        ]}
        disabled={isDisabled}
      >
        {loading ? (
          <ActivityIndicator color={textColorStyles[variant]} size="small" />
        ) : (
          <Text
            style={[
              styles.text,
              {
                fontSize: sizeStyles[size].fontSize,
                color: textColorStyles[variant],
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
        )}
      </Text>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  text: {
    fontWeight: "600",
  },
});

export default Button;
