import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

import SearchBar from '../components/SearchBar';
import { products, searchHints } from '../data/products';
import { SCREENS } from '../navigation/routes';
import { colors, radii, shadows, sizes, spacing, typography } from '../theme';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');

  const results = products.filter((item) =>
    item.title.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <View style={styles.screen}>
      <View style={styles.searchWrapper}>
        <SearchBar value={query} onChangeText={setQuery} hints={searchHints} />
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<Text style={styles.counter}>Знайдено {results.length}</Text>}
        ListEmptyComponent={<Text style={styles.empty}>Нічого не знайшли за запитом</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            activeOpacity={0.9}
            onPress={() => navigation.navigate(SCREENS.PRODUCT_DETAILS, { productId: item.id })}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.thumb} resizeMode="cover" />
            <View style={styles.rowBody}>
              <Text style={styles.rowTitle}>{item.title}</Text>
              <Text style={styles.rowMeta}>{item.volume}</Text>
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
  searchWrapper: {
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.lg,
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
