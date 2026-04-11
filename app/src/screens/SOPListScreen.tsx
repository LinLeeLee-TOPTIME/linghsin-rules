import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, radius, spacing } from '../theme/colors';
import { useAppData } from '../store/AppDataContext';

export default function SOPListScreen() {
  const navigation = useNavigation<any>();
  const { sops } = useAppData();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    sops.forEach((s) => set.add(s.category));
    return ['全部', ...Array.from(set)];
  }, [sops]);

  const filtered = useMemo(() => {
    return sops.filter((s) => {
      const matchCategory = !category || category === '全部' || s.category === category;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q));
      return matchCategory && matchQuery;
    });
  }, [sops, query, category]);

  return (
    <View style={styles.container}>
      <View style={styles.searchWrap}>
        <TextInput
          style={styles.search}
          placeholder="搜尋 SOP 標題、標籤..."
          value={query}
          onChangeText={setQuery}
          placeholderTextColor={colors.textMuted}
        />
      </View>
      <View style={styles.chipRow}>
        <FlatList
          data={categories}
          horizontal
          keyExtractor={(c) => c}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            const active = (category ?? '全部') === item;
            return (
              <TouchableOpacity
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setCategory(item)}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{item}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(s) => s.id}
        contentContainerStyle={{ padding: spacing.md }}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('SOPDetail', { sopId: item.id })}
          >
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.summary} numberOfLines={2}>
              {item.summary}
            </Text>
            <View style={styles.tagRow}>
              {item.tags.map((t) => (
                <Text key={t} style={styles.tag}>
                  #{t}
                </Text>
              ))}
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>沒有符合的 SOP</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  searchWrap: { padding: spacing.md, paddingBottom: spacing.sm },
  search: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.textPrimary,
  },
  chipRow: { paddingHorizontal: spacing.md, paddingBottom: spacing.sm },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { color: colors.textSecondary, fontSize: 13 },
  chipTextActive: { color: '#fff', fontWeight: '600' },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  category: { fontSize: 12, color: colors.primary, fontWeight: '600' },
  title: { fontSize: 16, fontWeight: '700', color: colors.textPrimary, marginTop: 2 },
  summary: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
  tagRow: { flexDirection: 'row', marginTop: spacing.sm, flexWrap: 'wrap' },
  tag: { fontSize: 11, color: colors.textMuted, marginRight: spacing.sm },
  empty: { textAlign: 'center', color: colors.textMuted, marginTop: spacing.xl },
});
