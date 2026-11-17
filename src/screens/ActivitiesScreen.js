import React, { useMemo, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../context/ThemeContext';
import { useActivities } from '../context/ActivityContext';
import CustomHeader from '../components/CustomHeader';
import SearchBar from '../components/SearchBar';
import ActivityCard from '../components/ActivityCard';

export default function ActivitiesScreen({ navigation }) {
  const { theme } = useAppTheme();
  const { activities } = useActivities();
  const { width } = useWindowDimensions();
  const [query, setQuery] = useState('');

  // Search by title or activity number
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return activities;
    return activities.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        String(a.number) === q.replace(/\D/g, '') ||
        `laboratory ${a.number}`.includes(q) ||
        `lab ${a.number}`.includes(q)
    );
  }, [query, activities]);

  const cardWidth = width >= 600 ? '48.5%' : '100%';

  return (
    <SafeAreaView edges={['top']} style={[styles.safe, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <CustomHeader
          title="My Activities"
          subtitle="All your laboratory exercises in one place."
        />

        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder="Search by title or number"
        />

        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="search-outline" size={36} color={theme.subtext} />
            <Text style={[styles.emptyText, { color: theme.subtext }]}>No activities found</Text>
          </View>
        ) : (
          <View style={styles.list}>
            {filtered.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                style={{ width: cardWidth }}
                onPress={() => navigation.navigate('ActivityDetails', { id: activity.id })}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { padding: 20, paddingBottom: 32 },
  list: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  empty: { alignItems: 'center', paddingVertical: 48 },
  emptyText: { fontSize: 15, marginTop: 10 },
});
