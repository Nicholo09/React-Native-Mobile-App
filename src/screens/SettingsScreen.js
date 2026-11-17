import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../context/ThemeContext';
import CustomHeader from '../components/CustomHeader';
import SettingsSection from '../components/SettingsSection';
import ProfileItem from '../components/ProfileItem';

// Profile photos live in assets/images/. Set photo to null to show initials instead.
const DEVELOPERS = [
  { name: 'Nicholo Jhon D. Ricafort', photo: require('../../assets/images/ricafort.jpg') },
  { name: 'Levin John E. Rojas', photo: require('../../assets/images/rojas.jpg') },
];

const APP_INFO = [
  { label: 'Application Name', value: 'Lab Portfolio' },
  { label: 'Version', value: '1.0.0' },
  { label: 'School Year', value: '2026–2027' },
];

export default function SettingsScreen({ navigation }) {
  const { theme, mode, setTheme } = useAppTheme();

  const ThemeOption = ({ value, label, icon }) => {
    const selected = mode === value;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setTheme(value)}
        style={[
          styles.option,
          {
            borderColor: selected ? theme.primary : theme.border,
            backgroundColor: selected ? theme.primarySoft : 'transparent',
          },
        ]}
      >
        <Ionicons name={icon} size={22} color={selected ? theme.primary : theme.subtext} />
        <Text style={[styles.optionText, { color: selected ? theme.primary : theme.text }]}>
          {label}
        </Text>
        {selected && <Ionicons name="checkmark-circle" size={18} color={theme.primary} />}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView edges={['top']} style={[styles.safe, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <CustomHeader title="Settings" subtitle="Manage your app preferences." />

        {/* A. Profile */}
        <SettingsSection title="Profile">
          {DEVELOPERS.map(({ name, photo }, index) => (
            <ProfileItem
              key={name}
              name={name}
              photo={photo}
              role="Developer"
              showDivider={index < DEVELOPERS.length - 1}
            />
          ))}
        </SettingsSection>

        {/* B. Appearance */}
        <SettingsSection title="Appearance">
          <View style={styles.options}>
            <ThemeOption value="light" label="Light Mode" icon="sunny-outline" />
            <ThemeOption value="dark" label="Dark Mode" icon="moon-outline" />
          </View>
        </SettingsSection>

        {/* C. App Information */}
        <SettingsSection title="App Information">
          {APP_INFO.map((item, index) => (
            <View
              key={item.label}
              style={[
                styles.infoRow,
                { borderBottomColor: theme.border },
                index === APP_INFO.length - 1 && { borderBottomWidth: 0 },
              ]}
            >
              <Text style={[styles.infoLabel, { color: theme.subtext }]}>{item.label}</Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>{item.value}</Text>
            </View>
          ))}
        </SettingsSection>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { padding: 20, paddingBottom: 32 },
  options: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, gap: 12 },
  option: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 8,
    gap: 8,
    minHeight: 52,
  },
  optionText: { fontSize: 14, fontWeight: '700' },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  infoLabel: { fontSize: 14 },
  infoValue: { fontSize: 14, fontWeight: '700' },
});
