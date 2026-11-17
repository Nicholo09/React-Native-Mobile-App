import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../context/ThemeContext';
import StatusBadge from './StatusBadge';
import CustomButton from './CustomButton';

// compact = small row for "Recent Activities" on the Home screen
export default function ActivityCard({ activity, onPress, compact = false, style }) {
  const { theme } = useAppTheme();
  const cardStyle = [styles.card, { backgroundColor: theme.surface, borderColor: theme.border }, style];

  if (compact) {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={[cardStyle, styles.compact]}>
        <View style={[styles.number, { backgroundColor: theme.primarySoft }]}>
          <Text style={[styles.numberText, { color: theme.primary }]}>{activity.number}</Text>
        </View>
        <View style={styles.compactText}>
          <Text style={[styles.overline, { color: theme.subtext }]}>
            LABORATORY {activity.number}
          </Text>
          <Text style={[styles.compactTitle, { color: theme.text }]} numberOfLines={1}>
            {activity.title}
          </Text>
          <View style={styles.badgeGap}>
            <StatusBadge status={activity.status} />
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color={theme.subtext} />
      </TouchableOpacity>
    );
  }

  return (
    <View style={cardStyle}>
      <View style={styles.topRow}>
        <Text style={[styles.overline, { color: theme.primary }]}>
          LABORATORY {activity.number}
        </Text>
        <StatusBadge status={activity.status} />
      </View>
      <Text style={[styles.title, { color: theme.text }]}>{activity.title}</Text>
      <Text style={[styles.description, { color: theme.subtext }]} numberOfLines={2}>
        {activity.description}
      </Text>
      <CustomButton
        title="View Details"
        variant="secondary"
        icon="arrow-forward"
        small
        onPress={onPress}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, borderRadius: 16, borderWidth: 1, marginBottom: 12 },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  overline: { fontSize: 11, fontWeight: '700', letterSpacing: 0.8 },
  title: { fontSize: 17, fontWeight: '700' },
  description: { fontSize: 14, lineHeight: 20, marginTop: 4 },
  button: { alignSelf: 'flex-start', marginTop: 14 },
  compact: { flexDirection: 'row', alignItems: 'center' },
  number: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  numberText: { fontSize: 18, fontWeight: '800' },
  compactText: { flex: 1, marginRight: 8 },
  compactTitle: { fontSize: 15, fontWeight: '700', marginTop: 2 },
  badgeGap: { marginTop: 6 },
});
