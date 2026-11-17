import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useAppTheme } from '../context/ThemeContext';

const getInitials = (name) => {
  const parts = name.trim().split(/\s+/);
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export default function ProfileItem({ name, role, photo, showDivider = false }) {
  const { theme } = useAppTheme();

  return (
    <View>
      <View style={styles.row}>
        {photo ? (
          <Image source={photo} style={[styles.avatar, { backgroundColor: theme.accent }]} />
        ) : (
          <View style={[styles.avatar, { backgroundColor: theme.accent }]}>
            <Text style={[styles.initials, { color: theme.onAccent }]}>{getInitials(name)}</Text>
          </View>
        )}
        <View style={styles.textBox}>
          <Text style={[styles.name, { color: theme.text }]}>{name}</Text>
          {role ? <Text style={[styles.role, { color: theme.subtext }]}>{role}</Text> : null}
        </View>
      </View>
      {showDivider && <View style={[styles.divider, { backgroundColor: theme.border }]} />}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  initials: { fontSize: 15, fontWeight: '800' },
  textBox: { flex: 1 },
  name: { fontSize: 15, fontWeight: '700' },
  role: { fontSize: 13, marginTop: 2 },
  divider: { height: 1 },
});
