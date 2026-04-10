export interface AnimationConfig {
  duration?: number;
  useNativeDriver?: boolean;
}

export interface FadeAnimationResult {
  value: Animated.Value;
  opacity: Animated.AnimatedInterpolation;
}

export interface SlideAnimationResult {
  value: Animated.Value;
  transform: Animated.AnimatedInterpolation;
}

export interface ScaleAnimationResult {
  value: Animated.Value;
  transform: Animated.AnimatedInterpolation;
}
