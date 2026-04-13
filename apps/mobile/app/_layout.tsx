import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { ClerkProvider } from "@clerk/clerk-expo";
import AnimatedSplashScreen from "../components/AnimatedSplashScreen";
import { isClerkConfigured, getClerkPublishableKey } from "../lib/clerk";

// Keep the native splash visible while we load resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isSplashDone, setIsSplashDone] = useState(false);

  const publishableKey = getClerkPublishableKey();

  useEffect(() => {
    async function prepare() {
      try {
        // Initialize Clerk if configured
        await isClerkConfigured();
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
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
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
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

// Token cache for Clerk
const tokenCache = {
  getToken: async (key: string) => {
    try {
      const item = await import("expo-secure-store").then((SecureStore) =>
        SecureStore.getItemAsync(key),
      );
      return item ?? null;
    } catch {
      return null;
    }
  },
  saveToken: async (key: string, value: string) => {
    try {
      await import("expo-secure-store").then((SecureStore) =>
        SecureStore.setItemAsync(key, value),
      );
    } catch {}
  },
  clearToken: async (key: string) => {
    try {
      await import("expo-secure-store").then((SecureStore) =>
        SecureStore.deleteItemAsync(key),
      );
    } catch {}
  },
};
