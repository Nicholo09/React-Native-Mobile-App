import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../context/ThemeContext';
import { useActivities } from '../context/ActivityContext';
import CustomHeader from '../components/CustomHeader';
import ProgressCard from '../components/ProgressCard';
import ProgressBar from '../components/ProgressBar';
import ActivityCard from '../components/ActivityCard';

export default function HomeScreen({ navigation }) {
  const { theme } = useAppTheme();
  const { stats, recentActivities } = useActivities();
  const { width } = useWindowDimensions();
  const [greeting, setGreeting] = useState('Hello');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  // 2 columns on phones, 4 columns on tablets / landscape
  const statWidth = width >= 600 ? '23.5%' : '48%';

  const statCards = [
    { icon: 'layers-outline', value: stats.total, label: 'Total Activities' },
    { icon: 'checkmark-circle-outline', value: stats.completed, label: 'Completed' },
    { icon: 'time-outline', value: stats.pending, label: 'Pending' },
    { icon: 'sync-outline', value: stats.inProgress, label: 'In Progress' },
  ];

  const openActivity = (id) => navigation.navigate('ActivityDetails', { id });

  return (
    <SafeAreaView edges={['top']} style={[styles.safe, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <CustomHeader
          eyebrow="Lab Portfolio"
          title={`${greeting}!`}
          subtitle="Ricafort & Rojas"
        />

        {/* Progress Overview */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Progress Overview</Text>
        <View style={styles.grid}>
          {statCards.map((card) => (
            <ProgressCard key={card.label} {...card} style={{ width: statWidth }} />
          ))}
        </View>

        {/* Overall Progress */}
        <View
          style={[styles.overall, { backgroundColor: theme.surface, borderColor: theme.border }]}
        >
          <View style={styles.overallTop}>
            <Text style={[styles.overallLabel, { color: theme.text }]}>Overall Progress</Text>
            <Text style={[styles.percent, { color: theme.primary }]}>{stats.percent}%</Text>
          </View>
          <ProgressBar percent={stats.percent} />
          <Text style={[styles.overallText, { color: theme.subtext }]}>
            {stats.completed} out of {stats.total} activities completed – {stats.percent}%
          </Text>
        </View>

        {/* Recent Activities */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Activities</Text>
        {recentActivities.length === 0 ? (
          <Text style={[styles.emptyText, { color: theme.subtext }]}>No recent activities yet.</Text>
        ) : (
          recentActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              compact
              onPress={() => openActivity(activity.id)}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { padding: 20, paddingBottom: 32 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  overall: { padding: 18, borderRadius: 16, borderWidth: 1, marginTop: 4, marginBottom: 28 },
  overallTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  overallLabel: { fontSize: 16, fontWeight: '700' },
  percent: { fontSize: 22, fontWeight: '800' },
  overallText: { fontSize: 13, marginTop: 10 },
  emptyText: { fontSize: 14 },
});
