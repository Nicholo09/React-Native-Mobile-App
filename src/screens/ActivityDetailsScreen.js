import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../context/ThemeContext';
import { useActivities } from '../context/ActivityContext';
import CustomHeader from '../components/CustomHeader';
import StatusBadge from '../components/StatusBadge';
import CustomButton from '../components/CustomButton';

export default function ActivityDetailsScreen({ route, navigation }) {
  const { theme } = useAppTheme();
  const { getActivity, markCompleted, markAccessed } = useActivities();
  const { id } = route.params;
  const activity = getActivity(id);
  const [justCompleted, setJustCompleted] = useState(false);

  // Record this activity as recently accessed
  useEffect(() => {
    markAccessed(id);
  }, [id, markAccessed]);

  // Hide the confirmation message after 2.5 seconds
  useEffect(() => {
    if (!justCompleted) return;
    const timer = setTimeout(() => setJustCompleted(false), 2500);
    return () => clearTimeout(timer);
  }, [justCompleted]);

  if (!activity) return null;

  const isCompleted = activity.status === 'Completed';
  const card = [styles.card, { backgroundColor: theme.surface, borderColor: theme.border }];

  const handleComplete = () => {
    markCompleted(activity.id);
    setJustCompleted(true);
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={[styles.safe, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <CustomHeader
          eyebrow={`LABORATORY ${activity.number}`}
          title="Activity Details"
          onBack={() => navigation.goBack()}
        />

        {/* Title + status */}
        <View style={card}>
          <Text style={[styles.title, { color: theme.text }]}>{activity.title}</Text>
          <Text style={[styles.body, { color: theme.subtext }]}>{activity.description}</Text>
          <View style={styles.statusRow}>
            <Text style={[styles.statusLabel, { color: theme.subtext }]}>Status</Text>
            <StatusBadge status={activity.status} />
          </View>
        </View>

        {/* Objective */}
        <View style={card}>
          <Text style={[styles.heading, { color: theme.primary }]}>Objective</Text>
          <Text style={[styles.body, { color: theme.text }]}>{activity.objective}</Text>
        </View>

        {/* Instructions */}
        <View style={card}>
          <Text style={[styles.heading, { color: theme.primary }]}>Instructions</Text>
          {activity.instructions.map((step, index) => (
            <View key={step} style={styles.listRow}>
              <View style={[styles.stepNum, { backgroundColor: theme.primarySoft }]}>
                <Text style={[styles.stepText, { color: theme.primary }]}>{index + 1}</Text>
              </View>
              <Text style={[styles.listText, { color: theme.text }]}>{step}</Text>
            </View>
          ))}
        </View>

        {/* Requirements */}
        <View style={card}>
          <Text style={[styles.heading, { color: theme.primary }]}>Requirements</Text>
          {activity.requirements.map((req) => (
            <View key={req} style={styles.listRow}>
              <View style={[styles.bullet, { backgroundColor: theme.primary }]} />
              <Text style={[styles.listText, { color: theme.text }]}>{req}</Text>
            </View>
          ))}
        </View>

        <CustomButton
          title={isCompleted ? 'Completed' : 'Mark as Completed'}
          icon={isCompleted ? 'checkmark-done' : 'checkmark'}
          disabled={isCompleted}
          onPress={handleComplete}
          style={styles.button}
        />
        {justCompleted && (
          <Text style={[styles.confirm, { color: theme.status.Completed.fg }]}>
            Activity marked as completed. Progress updated.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { padding: 20, paddingBottom: 32 },
  card: { padding: 18, borderRadius: 16, borderWidth: 1, marginBottom: 14 },
  title: { fontSize: 20, fontWeight: '800', marginBottom: 6 },
  heading: { fontSize: 13, fontWeight: '800', letterSpacing: 0.8, marginBottom: 10 },
  body: { fontSize: 15, lineHeight: 22 },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  statusLabel: { fontSize: 14, fontWeight: '600' },
  listRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  stepNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepText: { fontSize: 12, fontWeight: '800' },
  bullet: { width: 7, height: 7, borderRadius: 4, marginTop: 8, marginRight: 12, marginLeft: 8 },
  listText: { flex: 1, fontSize: 15, lineHeight: 22 },
  button: { marginTop: 6 },
  confirm: { textAlign: 'center', marginTop: 12, fontWeight: '600' },
});
