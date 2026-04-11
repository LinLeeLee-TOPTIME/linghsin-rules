import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import dayjs from 'dayjs';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { colors, radius, spacing } from '../theme/colors';
import { useAppData } from '../store/AppDataContext';
import { CalendarStackParamList } from '../navigation/types';

const statusLabel: Record<string, string> = {
  pending: '等待確認',
  confirmed: '已預約',
  completed: '已完成',
  cancelled: '已取消',
};

export default function BookingDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<CalendarStackParamList, 'BookingDetail'>>();
  const { bookings, cancelBooking } = useAppData();
  const booking = bookings.find((b) => b.id === route.params.bookingId);

  if (!booking) {
    return (
      <View style={styles.center}>
        <Text style={{ color: colors.textMuted }}>找不到此預約</Text>
      </View>
    );
  }

  const handleCancel = () => {
    Alert.alert('取消預約', '確定要取消這筆預約嗎?', [
      { text: '不要', style: 'cancel' },
      {
        text: '確定取消',
        style: 'destructive',
        onPress: async () => {
          await cancelBooking(booking.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: spacing.md }}>
      <View style={styles.card}>
        <Row label="服務項目" value={booking.serviceName} />
        <Row label="日期" value={dayjs(booking.date).format('YYYY 年 M 月 D 日 (dd)')} />
        <Row label="時段" value={booking.timeSlot} />
        <Row label="狀態" value={statusLabel[booking.status]} />
        <Row label="備註" value={booking.note || '(無)'} />
        <Row label="建立時間" value={dayjs(booking.createdAt).format('YYYY-MM-DD HH:mm')} />
      </View>

      {booking.status !== 'cancelled' && booking.status !== 'completed' ? (
        <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
          <Text style={styles.cancelText}>取消此預約</Text>
        </TouchableOpacity>
      ) : null}
    </ScrollView>
  );
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowLabel: { color: colors.textMuted, fontSize: 13 },
  rowValue: { color: colors.textPrimary, fontSize: 14, fontWeight: '600', maxWidth: '60%', textAlign: 'right' },
  cancelBtn: {
    marginTop: spacing.lg,
    backgroundColor: colors.danger,
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  cancelText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
