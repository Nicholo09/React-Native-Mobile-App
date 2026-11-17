import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../context/ThemeContext';
import CustomHeader from '../components/CustomHeader';
import SettingsSection from '../components/SettingsSection';
import ProfileItem from '../components/ProfileItem';

const DEVELOPERS = ['Nicholo Jhon D. Ricafort', 'Levin John E. Rojas'];

export default function AboutScreen({ navigation }) {
  const { theme } = useAppTheme();

  return (
    <SafeAreaView edges={['top', 'bottom']} style={[styles.safe, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <CustomHeader title="About" onBack={() => navigation.goBack()} />

        <View style={styles.hero}>
          <View style={[styles.logo, { backgroundColor: theme.primary }]}>
            <Ionicons name="flask" size={36} color={theme.onPrimary} />
          </View>
          <Text style={[styles.appName, { color: theme.text }]}>Lab Portfolio</Text>
          <Text style={[styles.meta, { color: theme.subtext }]}>
            Version 1.0.0 · School Year 2026–2027
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Text style={[styles.description, { color: theme.text }]}>
            Lab Portfolio is a student laboratory compilation application designed to organize
            laboratory activities, monitor completion progress, and provide convenient access to
            academic exercises in one place.
          </Text>
        </View>

        <SettingsSection title="Developers">
          {DEVELOPERS.map((name, index) => (
            <ProfileItem
              key={name}
              name={name}
              role="Developer"
              showDivider={index < DEVELOPERS.length - 1}
            />
          ))}
        </SettingsSection>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { padding: 20, paddingBottom: 32 },
  hero: { alignItems: 'center', marginBottom: 24 },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  appName: { fontSize: 24, fontWeight: '800' },
  meta: { fontSize: 13, marginTop: 4 },
  card: { padding: 18, borderRadius: 16, borderWidth: 1, marginBottom: 24 },
  description: { fontSize: 15, lineHeight: 23, textAlign: 'center' },
});
