import React, { Animated } from "react-native";

export interface AnimationConfig {
  duration?: number;
  useNativeDriver?: boolean;
}

export function slideUp(
  distance: number = 50,
  config: AnimationConfig = {},
): Animated.Value {
  const { duration = 300, useNativeDriver = true } = config;
  const value = new Animated.Value(distance);

  Animated.timing(value, {
    toValue: 0,
    duration,
    useNativeDriver,
  }).start();

  return value;
}

export function slideDown(
  distance: number = 50,
  config: AnimationConfig = {},
): Animated.Value {
  const { duration = 300, useNativeDriver = true } = config;
  const value = new Animated.Value(-distance);

  Animated.timing(value, {
    toValue: 0,
    duration,
    useNativeDriver,
  }).start();

  return value;
}

export function slideLeft(
  distance: number = 50,
  config: AnimationConfig = {},
): Animated.Value {
  const { duration = 300, useNativeDriver = true } = config;
  const value = new Animated.Value(distance);

  Animated.timing(value, {
    toValue: 0,
    duration,
    useNativeDriver,
  }).start();

  return value;
}

export function slideRight(
  distance: number = 50,
  config: AnimationConfig = {},
): Animated.Value {
  const { duration = 300, useNativeDriver = true } = config;
  const value = new Animated.Value(-distance);

  Animated.timing(value, {
    toValue: 0,
    duration,
    useNativeDriver,
  }).start();

  return value;
}

export function useSlideUp(
  distance: number = 50,
  config: AnimationConfig = {},
) {
  const slideAnim = new Animated.Value(distance);

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: config.duration ?? 300,
      useNativeDriver: config.useNativeDriver ?? true,
    }).start();
  }, []);

  return slideAnim;
}
