import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import CartItem from '../components/CartItem';
import CustomButton from '../components/CustomButton';
import { cartItems as initialItems, getProductById } from '../data/products';
import { SCREENS } from '../navigation/routes';
import { colors, radii, spacing, typography } from '../theme';

const priceToNumber = (price) => Number(String(price).replace(/[^\d]/g, '')) || 0;

export default function CartScreen({ route, navigation }) {
  const [items, setItems] = useState(initialItems);
  const addedProductId = route.params?.addedProductId;

  // The details screen passes addedProductId. The param is cleared right after it is
  // handled, otherwise returning to this tab would add the same drink again.
  useEffect(() => {
    if (!addedProductId) return;

    const product = getProductById(addedProductId);
    if (product) {
      setItems((current) => {
        const existing = current.find((item) => item.productId === product.id);
        if (existing) {
          return current.map((item) =>
            item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [
          ...current,
          {
            id: `${product.id}-${Date.now()}`,
            productId: product.id,
            title: product.title,
            options: product.volume,
            price: product.price,
            quantity: 1,
            imageUrl: product.imageUrl,
          },
        ];
      });
    }

    navigation.setParams({ addedProductId: undefined });
  }, [addedProductId, navigation]);

  const total = items.reduce((sum, item) => sum + priceToNumber(item.price) * item.quantity, 0);

  const changeQuantity = (id, quantity) =>
    setItems((current) => current.map((item) => (item.id === id ? { ...item, quantity } : item)));

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>Кошик порожній</Text>
        <Text style={styles.emptyText}>Додайте напій із меню — це займе кілька секунд.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      {items.map((item) => (
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

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Позицій</Text>
          <Text style={styles.summaryValue}>{items.length}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>До сплати</Text>
          <Text style={styles.totalValue}>{total} ₴</Text>
        </View>
      </View>

      <CustomButton
        title="Перейти до оплати"
        onPress={() => navigation.navigate(SCREENS.CHECKOUT, { total })}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.xxl,
    gap: spacing.md,
  },
  summary: {
    padding: spacing.lg,
    borderRadius: radii.lg,
    backgroundColor: colors.card,
    gap: spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  summaryValue: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
  },
  totalLabel: {
    ...typography.subheading,
    color: colors.textPrimary,
  },
  totalValue: {
    ...typography.subheading,
    color: colors.coffee,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.xxl,
  },
  emptyTitle: {
    ...typography.heading,
    color: colors.textPrimary,
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
