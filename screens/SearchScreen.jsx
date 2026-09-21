import { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import CategoryTabs from '../components/CategoryTabs';
import RequestState from '../components/RequestState';
import SearchBar from '../components/SearchBar';
import { CATEGORIES } from '../api/coffee';
import { searchHints } from '../data/products';
import { STATUS, useCoffeeMenu } from '../hooks/useCoffeeMenu';
import { SCREENS } from '../navigation/routes';
import { colors, radii, shadows, sizes, spacing, typography } from '../theme';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].id);

  const { status, drinks, error, reload } = useCoffeeMenu(category);

  const results = drinks.filter((item) =>
    item.title.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <View style={styles.screen}>
      <View style={styles.controls}>
        <SearchBar value={query} onChangeText={setQuery} hints={searchHints} />
        <CategoryTabs categories={CATEGORIES} activeId={category} onChange={setCategory} />
      </View>

      <FlatList
        data={status === STATUS.SUCCESS ? results : []}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          status === STATUS.SUCCESS ? (
            <Text style={styles.counter}>Знайдено {results.length}</Text>
          ) : null
        }
        ListEmptyComponent={
          status === STATUS.SUCCESS ? (
            <Text style={styles.empty}>Нічого не знайшли за запитом</Text>
          ) : (
            <RequestState status={status} error={error} onRetry={reload} />
          )
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            activeOpacity={0.9}
            onPress={() =>
              navigation.navigate(SCREENS.PRODUCT_DETAILS, { drinkId: item.id, category })
            }
          >
            <Image source={{ uri: item.imageUrl }} style={styles.thumb} resizeMode="cover" />
            <View style={styles.rowBody}>
              <Text style={styles.rowTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.rowMeta} numberOfLines={1}>
                {item.volume}
              </Text>
            </View>
            <Text style={styles.rowPrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  controls: {
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.lg,
    gap: spacing.md,
  },
  list: {
    padding: spacing.xxl,
    gap: spacing.md,
  },
  counter: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.card,
    ...shadows.card,
  },
  thumb: {
    width: sizes.thumbSm,
    height: sizes.thumbSm,
    borderRadius: radii.md,
    backgroundColor: colors.muted,
  },
  rowBody: { flex: 1 },
  rowTitle: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
  },
  rowMeta: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  rowPrice: {
    ...typography.bodyStrong,
    color: colors.coffee,
  },
  empty: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingVertical: spacing.xxxl,
  },
});
