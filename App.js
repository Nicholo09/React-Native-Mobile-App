import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/context/ThemeContext';
import { ActivityProvider } from './src/context/ActivityContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ActivityProvider>
          <AppNavigator />
        </ActivityProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
