import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import AnimatedSplashScreen from "../components/AnimatedSplashScreen";

// Keep the native splash visible while we load resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isSplashDone, setIsSplashDone] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts, check auth, prefetch data, etc.
        // Example:
        // await Font.loadAsync({
        //   "InstrumentSerif-Regular": require("../assets/fonts/InstrumentSerif-Regular.ttf"),
        //   "PlusJakartaSans-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
        // });
        // await checkAuthToken();
      } catch (e) {
        console.warn("Error loading app resources:", e);
      } finally {
        // Hide the native splash, reveal the animated one
        await SplashScreen.hideAsync();
        setIsAppReady(true);
      }
    }

    prepare();
  }, []);

  const onSplashComplete = useCallback(() => {
    setIsSplashDone(true);
  }, []);

  return (
    <View style={styles.root}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>

      {!isSplashDone && (
        <AnimatedSplashScreen
          isAppReady={isAppReady}
          onAnimationComplete={onSplashComplete}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
