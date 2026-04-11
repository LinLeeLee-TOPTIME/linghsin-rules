import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { colors, radius, spacing } from '../theme/colors';
import { useAppData } from '../store/AppDataContext';
import { SOPStackParamList } from '../navigation/types';

export default function SOPDetailScreen() {
  const route = useRoute<RouteProp<SOPStackParamList, 'SOPDetail'>>();
  const { sops } = useAppData();
  const sop = sops.find((s) => s.id === route.params.sopId);

  if (!sop) {
    return (
      <View style={styles.center}>
        <Text style={{ color: colors.textMuted }}>找不到此 SOP</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.category}>{sop.category}</Text>
      <Text style={styles.title}>{sop.title}</Text>
      <Text style={styles.summary}>{sop.summary}</Text>
      <Text style={styles.updated}>最後更新:{sop.updatedAt}</Text>

      <Text style={styles.sectionTitle}>執行步驟</Text>
      {sop.steps.map((step) => (
        <View key={step.order} style={styles.stepCard}>
          <View style={styles.stepNumberBadge}>
            <Text style={styles.stepNumberText}>{step.order}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepDesc}>{step.description}</Text>
            {step.note ? <Text style={styles.stepNote}>⚠️ {step.note}</Text> : null}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  category: { color: colors.primary, fontWeight: '600', fontSize: 13 },
  title: { fontSize: 22, fontWeight: '800', color: colors.textPrimary, marginTop: 4 },
  summary: { fontSize: 14, color: colors.textSecondary, marginTop: spacing.sm, lineHeight: 20 },
  updated: { fontSize: 12, color: colors.textMuted, marginTop: spacing.sm },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  stepCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  stepNumberBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  stepNumberText: { color: '#fff', fontWeight: '700' },
  stepTitle: { fontSize: 15, fontWeight: '700', color: colors.textPrimary },
  stepDesc: { fontSize: 13, color: colors.textSecondary, marginTop: 4, lineHeight: 19 },
  stepNote: {
    fontSize: 12,
    color: colors.warning,
    marginTop: 6,
    backgroundColor: '#fffbeb',
    padding: spacing.sm,
    borderRadius: radius.sm,
  },
});
