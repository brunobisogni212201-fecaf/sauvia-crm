import React, { useState } from "react";
import { StyleSheet, View, Text, Image, ViewStyle } from "react-native";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  fallback?: string;
  rounded?: boolean;
  style?: ViewStyle;
}

const sizeStyles: Record<AvatarSize, { size: number; fontSize: number }> = {
  xs: { size: 24, fontSize: 10 },
  sm: { size: 32, fontSize: 12 },
  md: { size: 40, fontSize: 14 },
  lg: { size: 48, fontSize: 16 },
  xl: { size: 64, fontSize: 20 },
};

export function Avatar({
  src,
  alt,
  size = "md",
  fallback,
  rounded = true,
  style,
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const sizes = sizeStyles[size];

  const initials = fallback
    ? fallback
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <View
      style={[
        styles.avatar,
        {
          width: sizes.size,
          height: sizes.size,
          borderRadius: rounded ? sizes.size / 2 : 8,
        },
        style,
      ]}
    >
      {src && !imageError ? (
        <Image
          source={{ uri: src }}
          alt={alt || "Avatar"}
          style={styles.image}
          onError={() => setImageError(true)}
        />
      ) : (
        <Text style={[styles.fallback, { fontSize: sizes.fontSize }]}>
          {initials}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: "#006b2c",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  fallback: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default Avatar;
