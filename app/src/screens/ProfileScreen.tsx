import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme/colors';
import { useAppData } from '../store/AppDataContext';

export default function ProfileScreen() {
  const { bookings } = useAppData();
  const total = bookings.length;
  const active = bookings.filter((b) => b.status === 'confirmed').length;
  const cancelled = bookings.filter((b) => b.status === 'cancelled').length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: spacing.md }}>
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>我</Text>
        </View>
        <Text style={styles.name}>訪客使用者</Text>
        <Text style={styles.email}>guest@example.com</Text>
      </View>

      <View style={styles.statsRow}>
        <Stat label="總預約" value={total} />
        <Stat label="進行中" value={active} />
        <Stat label="已取消" value={cancelled} />
      </View>

      <View style={styles.menu}>
        <MenuRow label="帳號設定" />
        <MenuRow label="通知設定" />
        <MenuRow label="隱私權政策" />
        <MenuRow label="關於 App" />
      </View>

      <Text style={styles.version}>版本 0.1.0 (MVP)</Text>
    </ScrollView>
  );
}

const Stat = ({ label, value }: { label: string; value: number }) => (
  <View style={styles.stat}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const MenuRow = ({ label }: { label: string }) => (
  <View style={styles.menuRow}>
    <Text style={styles.menuLabel}>{label}</Text>
    <Text style={styles.menuArrow}>›</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  card: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: radius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontSize: 28, fontWeight: '800' },
  name: { fontSize: 18, fontWeight: '700', color: colors.textPrimary, marginTop: spacing.sm },
  email: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  statsRow: {
    flexDirection: 'row',
    marginTop: spacing.md,
  },
  stat: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: { fontSize: 22, fontWeight: '800', color: colors.primary },
  statLabel: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  menu: {
    marginTop: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuLabel: { fontSize: 15, color: colors.textPrimary },
  menuArrow: { fontSize: 22, color: colors.textMuted },
  version: { textAlign: 'center', color: colors.textMuted, fontSize: 12, marginTop: spacing.lg },
});
