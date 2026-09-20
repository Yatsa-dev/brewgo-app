import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import Badge from './components/Badge';
import CartItem from './components/CartItem';
import CategoryTabs from './components/CategoryTabs';
import CustomButton from './components/CustomButton';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import PromoBanner from './components/PromoBanner';
import SearchBar from './components/SearchBar';
import { categories, cartItems as initialCartItems, products, searchHints } from './data/products';
import { useCardWidth } from './hooks/useCardWidth';
import { colors, spacing, typography } from './theme';

// Showcase screen that renders every component with real props.
export default function App() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [cart, setCart] = useState(initialCartItems);

  const { cardWidth, columns } = useCardWidth();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const changeQuantity = (id, quantity) =>
    setCart((current) => current.map((item) => (item.id === id ? { ...item, quantity } : item)));

  const header = (
    <View style={styles.section}>
      <Header
        title="Січових Стрільців, 12"
        cartCount={cartCount}
        onPressCart={() => {}}
        onPressLocation={() => {}}
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

  const footer = (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Кошик</Text>
      {cart.map((item) => (
        <CartItem
          key={item.id}
          title={item.title}
          options={item.options}
          price={item.price}
          quantity={item.quantity}
          imageUrl={item.imageUrl}
          onChangeQuantity={(quantity) => changeQuantity(item.id, quantity)}
        />
      ))}

      <Text style={styles.sectionTitle}>Кнопки</Text>
      <CustomButton title="Додати в кошик · 55 ₴" iconName="bag-add-outline" />
      <CustomButton title="Повторити останнє замовлення" variant="secondary" />
      <CustomButton title="Пропустити" variant="ghost" />
      <CustomButton title="Недоступно" disabled />

      <View style={styles.badgeRow}>
        <Text style={styles.sectionTitle}>Лічильник</Text>
        <Badge value={cartCount} />
        <Badge value={128} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      <FlatList
        // FlatList does not rebuild the grid when numColumns changes,
        // so the key forces a remount after rotation.
        key={columns}
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={columns}
        columnWrapperStyle={columns > 1 ? styles.row : undefined}
        contentContainerStyle={styles.content}
        ListHeaderComponent={header}
        ListFooterComponent={footer}
        renderItem={({ item }) => (
          <ProductCard
            title={item.title}
            volume={item.volume}
            price={item.price}
            rating={item.rating}
            imageUrl={item.imageUrl}
            width={cardWidth}
            onPress={() => {}}
            onAdd={() => {}}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.cream,
  },
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
    paddingVertical: spacing.lg,
  },
  sectionTitle: {
    ...typography.heading,
    fontSize: 18,
    color: colors.textPrimary,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
});
