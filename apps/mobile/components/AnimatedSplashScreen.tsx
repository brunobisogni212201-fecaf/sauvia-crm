import React, { useRef, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Platform,
} from "react-native";
import { Leaf } from "lucide-react-native";

/* ─── Design Tokens ─── */
const COLORS = {
  background: "hsl(40, 20%, 98%)",
  primary: "#7C3AED",
  primaryDark: "#5B21B6",
  tagline: "rgba(91, 33, 182, 0.6)",
};

interface AnimatedSplashScreenProps {
  isAppReady: boolean;
  onAnimationComplete: () => void;
}

export default function AnimatedSplashScreen({
  isAppReady,
  onAnimationComplete,
}: AnimatedSplashScreenProps) {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.95)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const taglineTranslateY = useRef(new Animated.Value(10)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  const entryAnimationDone = useRef(false);

  // Entry animations
  useEffect(() => {
    Animated.parallel([
      // Logo: fade-in + scale-up (800ms)
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      // Tagline: fade-in + slide-up (600ms, starts 300ms after logo)
      Animated.sequence([
        Animated.delay(300),
        Animated.parallel([
          Animated.timing(taglineOpacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(taglineTranslateY, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]).start(() => {
      entryAnimationDone.current = true;
    });
  }, [logoOpacity, logoScale, taglineOpacity, taglineTranslateY]);

  // Exit animation when app is ready
  const fadeOut = useCallback(() => {
    Animated.timing(screenOpacity, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      onAnimationComplete();
    });
  }, [screenOpacity, onAnimationComplete]);

  useEffect(() => {
    if (!isAppReady) return;

    if (entryAnimationDone.current) {
      fadeOut();
    } else {
      // Wait for entry animation to finish, then fade out
      const interval = setInterval(() => {
        if (entryAnimationDone.current) {
          clearInterval(interval);
          fadeOut();
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isAppReady, fadeOut]);

  return (
    <Animated.View style={[s.container, { opacity: screenOpacity }]}>
      {/* Logo */}
      <Animated.View
        style={[
          s.logoContainer,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        <View style={s.logoRow}>
          <Text style={s.logoText}>Sau</Text>
          <View style={s.leafWrapper}>
            <Text style={s.logoText}>v</Text>
            <View style={s.leafIcon}>
              <Leaf
                size={18}
                color={COLORS.primary}
                strokeWidth={2.5}
              />
            </View>
          </View>
          <Text style={s.logoText}>ia</Text>
        </View>
      </Animated.View>

      {/* Tagline */}
      <Animated.View
        style={{
          opacity: taglineOpacity,
          transform: [{ translateY: taglineTranslateY }],
        }}
      >
        <Text style={s.tagline}>Health & Lifestyle</Text>
      </Animated.View>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  logoContainer: {
    marginBottom: 12,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  logoText: {
    fontSize: 48,
    color: COLORS.primary,
    fontWeight: "300",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    letterSpacing: 1,
  },
  leafWrapper: {
    position: "relative",
  },
  leafIcon: {
    position: "absolute",
    top: -4,
    right: -6,
    transform: [{ rotate: "-30deg" }],
  },
  tagline: {
    fontSize: 14,
    color: COLORS.tagline,
    fontWeight: "500",
    letterSpacing: 3,
    textTransform: "uppercase",
  },
});
