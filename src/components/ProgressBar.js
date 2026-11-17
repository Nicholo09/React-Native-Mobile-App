import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppTheme } from '../context/ThemeContext';

export default function ProgressBar({ percent = 0, height = 10 }) {
  const { theme } = useAppTheme();
  const safe = Math.min(Math.max(percent, 0), 100);

  return (
    <View style={[styles.track, { height, backgroundColor: theme.track }]}>
      <View style={[styles.fill, { width: `${safe}%`, backgroundColor: theme.primary }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { width: '100%', borderRadius: 999, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 999 },
});
