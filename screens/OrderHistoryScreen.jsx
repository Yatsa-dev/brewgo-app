import { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import CustomButton from '../components/CustomButton';
import { STACKS, SCREENS } from '../navigation/routes';
import { radii, shadows, spacing, typography } from '../theme';
import { useTheme } from '../context/ThemeContext';

// drinkId values match ids in the menu API, so "repeat" resolves to a real drink.
const ORDERS = [
  { id: '1024', date: '20 вересня', status: 'Готується', items: 'Latte, Caramel Latte', total: '115 ₴', drinkId: '2' },
  { id: '1019', date: '18 вересня', status: 'Виконано', items: 'Caramel Latte', total: '60 ₴', drinkId: '3' },
  { id: '1012', date: '15 вересня', status: 'Виконано', items: 'Americano, Cappuccino', total: '110 ₴', drinkId: '4' },
];

export default function OrderHistoryScreen({ navigation }) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  // "Repeat" jumps to the cart tab and passes the drink id, which the cart screen
  // resolves through the API into a new line item.
  const repeat = (drinkId) =>
    navigation.getParent()?.navigate(STACKS.CART, {
      screen: SCREENS.CART,
      params: { addedDrinkId: drinkId },
    });

  return (
    <FlatList
      data={ORDERS}
      keyExtractor={(order) => order.id}
      contentContainerStyle={styles.content}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.header}>
            <View>
              <Text style={styles.number}>№ {item.id}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <View style={styles.status}>
              <Text style={styles.statusLabel}>{item.status}</Text>
            </View>
          </View>

          <Text style={styles.items}>{item.items}</Text>

          <View style={styles.footer}>
            <Text style={styles.total}>{item.total}</Text>
            <CustomButton
              title="Повторити"
              variant="secondary"
              fullWidth={false}
              style={styles.repeat}
              onPress={() => repeat(item.drinkId)}
            />
          </View>
        </View>
      )}
    />
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
  content: {
    padding: spacing.xxl,
    gap: spacing.md,
  },
  card: {
    padding: spacing.lg,
    borderRadius: radii.lg,
    backgroundColor: colors.card,
    gap: spacing.sm,
    ...shadows.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  number: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
  },
  date: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  status: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.sm,
    backgroundColor: colors.muted,
  },
  statusLabel: {
    ...typography.label,
    color: colors.coffee,
  },
  items: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  total: {
    ...typography.bodyStrong,
    color: colors.coffee,
  },
  repeat: {
    height: 40,
    paddingHorizontal: spacing.lg,
  },
});
