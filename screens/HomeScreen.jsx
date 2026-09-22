import { DrawerActions } from '@react-navigation/native';
import { useState, useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import CategoryTabs from '../components/CategoryTabs';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import PromoBanner from '../components/PromoBanner';
import RequestState from '../components/RequestState';
import SearchBar from '../components/SearchBar';
import { useSelector } from 'react-redux';

import { CATEGORIES } from '../api/coffee';
import { searchHints } from '../data/products';
import { selectCartCount } from '../store/cartSlice';
import { useCardWidth } from '../hooks/useCardWidth';
import { STATUS, useCoffeeMenu } from '../hooks/useCoffeeMenu';
import { SCREENS, STACKS } from '../navigation/routes';
import { spacing, typography } from '../theme';
import { useTheme } from '../context/ThemeContext';

export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].id);
  const { cardWidth, columns } = useCardWidth();

  const { status, drinks, error, reload } = useCoffeeMenu(category);
  const cartCount = useSelector(selectCartCount);

  const visibleDrinks = drinks.filter((item) =>
    item.title.toLowerCase().includes(query.trim().toLowerCase())
  );

  // The details screen loads the drink itself, so only the id and its category travel.
  const openDrink = (drinkId) =>
    navigation.navigate(SCREENS.PRODUCT_DETAILS, { drinkId, category });

  const header = (
    <View style={styles.section}>
      <Header
        title="Січових Стрільців, 12"
        cartCount={cartCount}
        onPressMenu={() => navigation.dispatch(DrawerActions.openDrawer())}
        onPressCart={() => navigation.getParent()?.navigate(STACKS.CART)}
      />
      <SearchBar value={query} onChangeText={setQuery} hints={searchHints} />
      <CategoryTabs categories={CATEGORIES} activeId={category} onChange={setCategory} />
      <PromoBanner title="−20% на раф" subtitle="До кінця тижня" actionLabel="Дивитись" />
      {status === STATUS.SUCCESS ? (
        <Text style={styles.sectionTitle}>Меню · {visibleDrinks.length}</Text>
      ) : null}
    </View>
  );

  return (
    <FlatList
      // FlatList does not rebuild the grid when numColumns changes,
      // so the key forces a remount after rotation.
      key={columns}
      data={status === STATUS.SUCCESS ? visibleDrinks : []}
      keyExtractor={(item) => item.id}
      numColumns={columns}
      columnWrapperStyle={columns > 1 ? styles.row : undefined}
      contentContainerStyle={styles.content}
      ListHeaderComponent={header}
      ListEmptyComponent={
        status === STATUS.SUCCESS ? (
          <Text style={styles.empty}>Нічого не знайшли за запитом</Text>
        ) : (
          <RequestState status={status} error={error} onRetry={reload} />
        )
      }
      renderItem={({ item }) => (
        <ProductCard
          title={item.title}
          volume={item.volume}
          price={item.price}
          imageUrl={item.imageUrl}
          width={cardWidth}
          onPress={() => openDrink(item.id)}
          onAdd={() => openDrink(item.id)}
        />
      )}
    />
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
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
