import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RenderStatsOverlay from './dev/RenderStatsOverlay';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import RootNavigator from './navigation/RootNavigator';
import { store } from './store';

// Separate component because the status bar style has to read the theme,
// and the theme only exists below ThemeProvider.
function ThemedApp() {
  const { isDark } = useTheme();

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <RootNavigator />
      {/* Render counters for the optimisation report; stripped outside development. */}
      {__DEV__ ? <RenderStatsOverlay /> : null}
    </>
  );
}

export default function App() {
  return (
    // GestureHandlerRootView must wrap the tree for the drawer swipe gesture to work.
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <ThemeProvider>
          <SafeAreaProvider>
            <ThemedApp />
          </SafeAreaProvider>
        </ThemeProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
