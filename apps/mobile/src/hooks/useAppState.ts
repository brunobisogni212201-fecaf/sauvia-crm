import { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

/**
 * useAppState Hook
 * Tracks the current state of the app (active, background, inactive)
 * 
 * @returns The current app state
 * 
 * @example
 * const appState = useAppState();
 */
export function useAppState(): AppStateStatus {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return appState;
}
