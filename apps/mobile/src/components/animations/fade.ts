import React, { Animated } from "react-native";

export interface AnimationConfig {
  duration?: number;
  useNativeDriver?: boolean;
}

export function fadeIn(config: AnimationConfig = {}): Animated.Value {
  const { duration = 300, useNativeDriver = true } = config;
  const value = new Animated.Value(0);

  Animated.timing(value, {
    toValue: 1,
    duration,
    useNativeDriver,
  }).start();

  return value;
}

export function fadeOut(config: AnimationConfig = {}): Animated.AnimatedValue {
  const { duration = 300, useNativeDriver = true } = config;
  const value = new Animated.Value(1);

  Animated.timing(value, {
    toValue: 0,
    duration,
    useNativeDriver,
  }).start();

  return value;
}

export function useFadeIn(config: AnimationConfig = {}) {
  const fadeAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: config.duration ?? 300,
      useNativeDriver: config.useNativeDriver ?? true,
    }).start();
  }, []);

  return fadeAnim;
}
