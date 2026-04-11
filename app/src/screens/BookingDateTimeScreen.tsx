import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { colors, radius, spacing } from '../theme/colors';
import { useAppData } from '../store/AppDataContext';
import { AVAILABLE_TIME_SLOTS } from '../data/services';
import { BookingStackParamList } from '../navigation/types';

export default function BookingDateTimeScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<BookingStackParamList, 'BookingDateTime'>>();
  const { services, bookings } = useAppData();
  const service = services.find((s) => s.id === route.params.serviceId);

  const today = dayjs().format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const takenSlots = useMemo(
    () =>
      new Set(
        bookings
          .filter((b) => b.date === selectedDate && b.status !== 'cancelled')
          .map((b) => b.timeSlot),
      ),
    [bookings, selectedDate],
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: spacing.xl }}>
      <View style={styles.serviceBanner}>
        <Text style={styles.serviceName}>{service?.name}</Text>
        <Text style={styles.serviceMeta}>⏱ {service?.durationMinutes} 分鐘</Text>
      </View>

      <Text style={styles.label}>選擇日期</Text>
      <Calendar
        minDate={today}
        onDayPress={(d) => {
          setSelectedDate(d.dateString);
          setSelectedSlot(null);
        }}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: colors.primary },
        }}
        theme={{
          todayTextColor: colors.primary,
          arrowColor: colors.primary,
        }}
      />

      <Text style={styles.label}>選擇時段</Text>
      <View style={styles.slotGrid}>
        {AVAILABLE_TIME_SLOTS.map((slot) => {
          const taken = takenSlots.has(slot);
          const active = selectedSlot === slot;
          return (
            <TouchableOpacity
              key={slot}
              disabled={taken}
              onPress={() => setSelectedSlot(slot)}
              style={[
                styles.slot,
                active && styles.slotActive,
                taken && styles.slotDisabled,
              ]}
            >
              <Text
                style={[
                  styles.slotText,
                  active && styles.slotTextActive,
                  taken && styles.slotTextDisabled,
                ]}
              >
                {slot}
              </Text>
              {taken ? <Text style={styles.slotTaken}>已預約</Text> : null}
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        style={[styles.nextButton, !selectedSlot && styles.nextButtonDisabled]}
        disabled={!selectedSlot}
        onPress={() =>
          navigation.navigate('BookingConfirm', {
            serviceId: route.params.serviceId,
            date: selectedDate,
            timeSlot: selectedSlot!,
          })
        }
      >
        <Text style={styles.nextButtonText}>下一步</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  serviceBanner: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    margin: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  serviceName: { fontSize: 16, fontWeight: '700', color: colors.textPrimary },
  serviceMeta: { fontSize: 12, color: colors.textMuted, marginTop: 4 },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  slotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.md,
  },
  slot: {
    width: '31%',
    marginRight: '2.5%',
    marginBottom: spacing.sm,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  slotActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  slotDisabled: { backgroundColor: '#f1f5f9', borderColor: '#e2e8f0' },
  slotText: { fontSize: 13, color: colors.textPrimary, fontWeight: '600' },
  slotTextActive: { color: '#fff' },
  slotTextDisabled: { color: colors.textMuted },
  slotTaken: { fontSize: 10, color: colors.textMuted, marginTop: 2 },
  nextButton: {
    margin: spacing.md,
    marginTop: spacing.lg,
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  nextButtonDisabled: { backgroundColor: colors.textMuted },
  nextButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
