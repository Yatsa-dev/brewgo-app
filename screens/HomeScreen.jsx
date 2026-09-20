import { DrawerActions } from '@react-navigation/native';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import CategoryTabs from '../components/CategoryTabs';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import PromoBanner from '../components/PromoBanner';
import SearchBar from '../components/SearchBar';
import { cartItems, categories, products, searchHints } from '../data/products';
import { useCardWidth } from '../hooks/useCardWidth';
import { SCREENS, STACKS } from '../navigation/routes';
import { colors, spacing, typography } from '../theme';

export default function HomeScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const { cardWidth, columns } = useCardWidth();

  const visibleProducts = products.filter((item) =>
    item.title.toLowerCase().includes(query.trim().toLowerCase())
  );

  const openProduct = (productId) => navigation.navigate(SCREENS.PRODUCT_DETAILS, { productId });

  const header = (
    <View style={styles.section}>
      <Header
        title="Січових Стрільців, 12"
        cartCount={cartItems.length}
        // openDrawer bubbles up from the stack to the drawer that wraps the tabs.
        onPressMenu={() => navigation.dispatch(DrawerActions.openDrawer())}
        onPressCart={() => navigation.getParent()?.navigate(STACKS.CART)}
      />
      <SearchBar value={query} onChangeText={setQuery} hints={searchHints} />
      <CategoryTabs
        categories={categories}
        activeId={activeCategory}
        onChange={setActiveCategory}
      />
      <PromoBanner title="−20% на раф" subtitle="До кінця тижня" actionLabel="Дивитись" />
      <Text style={styles.sectionTitle}>Популярне</Text>
    </View>
  );

  return (
    <FlatList
      // FlatList does not rebuild the grid when numColumns changes,
      // so the key forces a remount after rotation.
      key={columns}
      data={visibleProducts}
      keyExtractor={(item) => item.id}
      numColumns={columns}
      columnWrapperStyle={columns > 1 ? styles.row : undefined}
      contentContainerStyle={styles.content}
      ListHeaderComponent={header}
      ListEmptyComponent={<Text style={styles.empty}>Нічого не знайшли за запитом</Text>}
      renderItem={({ item }) => (
        <ProductCard
          title={item.title}
          volume={item.volume}
          price={item.price}
          rating={item.rating}
          imageUrl={item.imageUrl}
          width={cardWidth}
          onPress={() => openProduct(item.id)}
          onAdd={() => openProduct(item.id)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.xxl,
    paddingBottom: spacing.xxxl,
    gap: spacing.md,
  },
  row: {
    justifyContent: 'space-between',
  },
  section: {
    gap: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  sectionTitle: {
    ...typography.heading,
    fontSize: 18,
    color: colors.textPrimary,
  },
  empty: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingVertical: spacing.xxxl,
  },
});
