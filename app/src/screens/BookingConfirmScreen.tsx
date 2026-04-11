import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import dayjs from 'dayjs';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { colors, radius, spacing } from '../theme/colors';
import { useAppData } from '../store/AppDataContext';
import { BookingStackParamList } from '../navigation/types';

export default function BookingConfirmScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<BookingStackParamList, 'BookingConfirm'>>();
  const { services, addBooking } = useAppData();
  const service = services.find((s) => s.id === route.params.serviceId);
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (!service) return;
    try {
      setSubmitting(true);
      await addBooking({
        serviceId: service.id,
        serviceName: service.name,
        date: route.params.date,
        timeSlot: route.params.timeSlot,
        note: note.trim() || undefined,
      });
      Alert.alert('預約成功', '您的預約已建立,可於行事曆中查看。', [
        {
          text: '查看行事曆',
          onPress: () => {
            navigation.getParent()?.navigate('Calendar', { screen: 'CalendarMonth' });
          },
        },
        {
          text: '繼續預約',
          onPress: () => navigation.popToTop(),
        },
      ]);
    } catch (e) {
      Alert.alert('預約失敗', '請稍後再試。');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: spacing.md }}>
      <View style={styles.card}>
        <Row label="服務項目" value={service?.name ?? '-'} />
        <Row label="服務時長" value={`${service?.durationMinutes ?? '-'} 分鐘`} />
        <Row label="預約日期" value={dayjs(route.params.date).format('YYYY 年 M 月 D 日 (dd)')} />
        <Row label="預約時段" value={route.params.timeSlot} />
      </View>

      <Text style={styles.label}>備註 (選填)</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="有任何需要特別說明的事項..."
        placeholderTextColor={colors.textMuted}
        value={note}
        onChangeText={setNote}
      />

      <TouchableOpacity
        style={[styles.submit, submitting && { opacity: 0.5 }]}
        disabled={submitting}
        onPress={submit}
      >
        <Text style={styles.submitText}>{submitting ? '送出中...' : '確認送出'}</Text>
      </TouchableOpacity>
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
  rowValue: { color: colors.textPrimary, fontSize: 14, fontWeight: '600' },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    minHeight: 100,
    textAlignVertical: 'top',
    color: colors.textPrimary,
  },
  submit: {
    marginTop: spacing.lg,
    backgroundColor: colors.accent,
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  submitText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
