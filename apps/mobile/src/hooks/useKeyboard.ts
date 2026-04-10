import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

/**
 * useKeyboard Hook
 * Tracks keyboard visibility and height
 * 
 * @returns Object with keyboard visibility and height
 * 
 * @example
 * const { visible, height } = useKeyboard();
 */
export function useKeyboard() {
  const [keyboard, setKeyboard] = useState({
    visible: false,
    height: 0,
  });

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener('keyboardWillShow', (e) => {
      setKeyboard({
        visible: true,
        height: e.endCoordinates.height,
      });
    });

    const keyboardWillHide = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboard({
        visible: false,
        height: 0,
      });
    });

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  return keyboard;
}
