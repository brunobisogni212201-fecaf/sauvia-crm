import React, { Animated } from "react-native";

export interface AnimationConfig {
  duration?: number;
  useNativeDriver?: boolean;
}

export function scaleIn(config: AnimationConfig = {}): Animated.Value {
  const { duration = 200, useNativeDriver = true } = config;
  const value = new Animated.Value(0.95);

  Animated.timing(value, {
    toValue: 1,
    duration,
    useNativeDriver,
  }).start();

  return value;
}

export function scaleOut(config: AnimationConfig = {}): Animated.Value {
  const { duration = 200, useNativeDriver = true } = config;
  const value = new Animated.Value(1);

  Animated.timing(value, {
    toValue: 0.95,
    duration,
    useNativeDriver,
  }).start();

  return value;
}

export function useScaleIn(config: AnimationConfig = {}) {
  const scaleAnim = new Animated.Value(0.95);

  React.useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: config.duration ?? 200,
      useNativeDriver: config.useNativeDriver ?? true,
    }).start();
  }, []);

  return scaleAnim;
}
