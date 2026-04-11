import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, radius, spacing } from '../theme/colors';
import { useAppData } from '../store/AppDataContext';

export default function BookingServicesScreen() {
  const navigation = useNavigation<any>();
  const { services } = useAppData();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>請選擇您想預約的服務項目</Text>
      <FlatList
        data={services}
        keyExtractor={(s) => s.id}
        contentContainerStyle={{ padding: spacing.md }}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('BookingDateTime', { serviceId: item.id })}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.desc}>{item.description}</Text>
              <Text style={styles.duration}>⏱ {item.durationMinutes} 分鐘</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { padding: spacing.md, color: colors.textSecondary },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: { fontSize: 16, fontWeight: '700', color: colors.textPrimary },
  desc: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
  duration: { fontSize: 12, color: colors.textMuted, marginTop: 6 },
  arrow: { fontSize: 28, color: colors.textMuted, marginLeft: spacing.md },
});
