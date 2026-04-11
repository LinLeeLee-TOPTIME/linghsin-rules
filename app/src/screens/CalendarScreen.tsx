import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import { colors, radius, spacing } from '../theme/colors';
import { useAppData } from '../store/AppDataContext';

const statusColor: Record<string, string> = {
  pending: colors.warning,
  confirmed: colors.accent,
  completed: colors.textMuted,
};

const statusLabel: Record<string, string> = {
  pending: '等待確認',
  confirmed: '已預約',
  completed: '已完成',
  cancelled: '已取消',
};

export default function CalendarScreen() {
  const navigation = useNavigation<any>();
  const { bookings } = useAppData();
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));

  const marked = useMemo(() => {
    const m: Record<string, any> = {};
    bookings
      .filter((b) => b.status !== 'cancelled')
      .forEach((b) => {
        m[b.date] = {
          ...(m[b.date] ?? {}),
          marked: true,
          dotColor: statusColor[b.status] ?? colors.primary,
        };
      });
    m[selectedDate] = { ...(m[selectedDate] ?? {}), selected: true, selectedColor: colors.primary };
    return m;
  }, [bookings, selectedDate]);

  const dayBookings = bookings.filter((b) => b.date === selectedDate && b.status !== 'cancelled');

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: spacing.xl }}>
      <Calendar
        onDayPress={(d) => setSelectedDate(d.dateString)}
        markedDates={marked}
        theme={{ todayTextColor: colors.primary, arrowColor: colors.primary }}
      />
      <Text style={styles.header}>{dayjs(selectedDate).format('YYYY / MM / DD')} 行程</Text>
      {dayBookings.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>此日無行程</Text>
        </View>
      ) : (
        dayBookings.map((b) => (
          <TouchableOpacity
            key={b.id}
            style={styles.card}
            onPress={() => navigation.navigate('BookingDetail', { bookingId: b.id })}
          >
            <View style={[styles.statusDot, { backgroundColor: statusColor[b.status] ?? colors.primary }]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.time}>{b.timeSlot}</Text>
              <Text style={styles.name}>{b.serviceName}</Text>
              <Text style={styles.status}>{statusLabel[b.status]}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    padding: spacing.md,
  },
  empty: {
    margin: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  emptyText: { color: colors.textMuted },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statusDot: { width: 10, height: 10, borderRadius: 5, marginRight: spacing.md },
  time: { fontSize: 13, color: colors.textSecondary },
  name: { fontSize: 16, fontWeight: '700', color: colors.textPrimary, marginTop: 2 },
  status: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  arrow: { fontSize: 28, color: colors.textMuted, marginLeft: spacing.sm },
});
