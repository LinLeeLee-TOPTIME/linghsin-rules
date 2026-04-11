import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import { colors, radius, spacing } from '../theme/colors';
import { useAppData } from '../store/AppDataContext';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { sops, bookings } = useAppData();
  const today = dayjs().format('YYYY-MM-DD');
  const todayBookings = bookings.filter((b) => b.date === today && b.status !== 'cancelled');
  const featuredSops = sops.slice(0, 3);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>您好 👋</Text>
        <Text style={styles.heroSubtitle}>今天是 {dayjs().format('YYYY 年 M 月 D 日')}</Text>
        <TouchableOpacity
          style={styles.heroButton}
          onPress={() => navigation.navigate('Booking', { screen: 'BookingServices' })}
        >
          <Text style={styles.heroButtonText}>＋ 立即預約</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>今日行程</Text>
      {todayBookings.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>今天沒有行程</Text>
        </View>
      ) : (
        todayBookings.map((b) => (
          <View key={b.id} style={styles.bookingCard}>
            <Text style={styles.bookingTime}>{b.timeSlot}</Text>
            <Text style={styles.bookingName}>{b.serviceName}</Text>
            {b.note ? <Text style={styles.bookingNote}>備註:{b.note}</Text> : null}
          </View>
        ))
      )}

      <Text style={styles.sectionTitle}>SOP 精選</Text>
      {featuredSops.map((s) => (
        <TouchableOpacity
          key={s.id}
          style={styles.sopCard}
          onPress={() => navigation.navigate('SOP', { screen: 'SOPDetail', params: { sopId: s.id } })}
        >
          <Text style={styles.sopCategory}>{s.category}</Text>
          <Text style={styles.sopTitle}>{s.title}</Text>
          <Text style={styles.sopSummary} numberOfLines={2}>
            {s.summary}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  heroCard: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: radius.lg,
    marginBottom: spacing.lg,
  },
  heroTitle: { color: '#fff', fontSize: 22, fontWeight: '700' },
  heroSubtitle: { color: '#e0f2fe', fontSize: 14, marginTop: spacing.xs },
  heroButton: {
    marginTop: spacing.md,
    backgroundColor: '#fff',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    alignSelf: 'flex-start',
  },
  heroButtonText: { color: colors.primaryDark, fontWeight: '700' },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  emptyCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: radius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyText: { color: colors.textMuted },
  bookingCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
  },
  bookingTime: { fontSize: 14, color: colors.textSecondary },
  bookingName: { fontSize: 16, fontWeight: '600', color: colors.textPrimary, marginTop: 2 },
  bookingNote: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  sopCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sopCategory: { fontSize: 12, color: colors.primary, fontWeight: '600' },
  sopTitle: { fontSize: 16, fontWeight: '700', color: colors.textPrimary, marginTop: 2 },
  sopSummary: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
});
