import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../context/ThemeContext';

// variant: 'primary' | 'secondary' | 'outline'
export default function CustomButton({
  title, onPress, variant = 'primary', icon, disabled = false, small = false, style,
}) {
  const { theme } = useAppTheme();

  const variants = {
    primary: { bg: theme.primary, fg: theme.onPrimary, border: theme.primary },
    secondary: { bg: theme.primarySoft, fg: theme.primary, border: 'transparent' },
    outline: { bg: 'transparent', fg: theme.primary, border: theme.primary },
  };
  const v = variants[variant] || variants.primary;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        styles.button,
        small && styles.small,
        { backgroundColor: v.bg, borderColor: v.border, opacity: disabled ? 0.6 : 1 },
        style,
      ]}
    >
      {icon && <Ionicons name={icon} size={small ? 16 : 18} color={v.fg} style={styles.icon} />}
      <Text style={[styles.text, small && styles.smallText, { color: v.fg }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1.5,
    minHeight: 48,
  },
  small: { paddingVertical: 8, paddingHorizontal: 14, minHeight: 40, borderRadius: 10 },
  icon: { marginRight: 8 },
  text: { fontSize: 16, fontWeight: '700' },
  smallText: { fontSize: 14 },
});
