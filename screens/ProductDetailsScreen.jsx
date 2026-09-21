import { useLayoutEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import CustomButton from '../components/CustomButton';
import QuantityStepper from '../components/QuantityStepper';
import { getProductById } from '../data/products';
import { SCREENS, STACKS, TITLES } from '../navigation/routes';
import { colors, radii, spacing, typography } from '../theme';

const SIZES = ['250 мл', '350 мл', '450 мл'];
const MILK = ['Звичайне', 'Безлактозне', 'Рослинне'];

export default function ProductDetailsScreen({ route, navigation }) {
  // The screen can be reached from several places, so params are never trusted:
  // a missing or unknown productId falls through to the error state below.
  const productId = route.params?.productId;
  const product = productId ? getProductById(productId) : undefined;

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(SIZES[0]);
  const [milk, setMilk] = useState(MILK[0]);

  useLayoutEffect(() => {
    navigation.setOptions({ title: product?.title ?? TITLES[SCREENS.PRODUCT_DETAILS] });
  }, [navigation, product]);

  if (!product) {
    return (
      <View style={styles.errorScreen}>
        <Text style={styles.errorTitle}>Напій не знайдено</Text>
        <Text style={styles.errorText}>
          {productId
            ? `У меню немає позиції з кодом ${productId}.`
            : 'Екран відкрито без коду напою.'}
        </Text>
        <CustomButton title="Повернутись до меню" onPress={() => navigation.popToTop()} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} resizeMode="cover" />

      <View style={styles.titleRow}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{product.price}</Text>
      </View>
      <Text style={styles.rating}>★ {product.rating} · {product.volume}</Text>

      <Text style={styles.label}>РОЗМІР</Text>
      <OptionRow options={SIZES} value={size} onChange={setSize} />

      <Text style={styles.label}>МОЛОКО</Text>
      <OptionRow options={MILK} value={milk} onChange={setMilk} />

      <View style={styles.quantityRow}>
        <Text style={styles.quantityLabel}>Кількість</Text>
        <QuantityStepper value={quantity} onChange={setQuantity} />
      </View>

      <CustomButton
        title={`Додати в кошик · ${product.price}`}
        iconName="bag-add-outline"
        // The cart lives in its own tab, so the drink id is passed across navigators:
        // getParent() reaches the tab navigator, and params are forwarded to its screen.
        onPress={() =>
          navigation.getParent()?.navigate(STACKS.CART, {
            screen: SCREENS.CART,
            params: { addedProductId: product.id },
          })
        }
      />
    </ScrollView>
  );
}

function OptionRow({ options, value, onChange }) {
  return (
    <View style={styles.optionRow}>
      {options.map((option) => (
        <CustomButton
          key={option}
          title={option}
          variant={option === value ? 'primary' : 'secondary'}
          fullWidth={false}
          style={styles.option}
          onPress={() => onChange(option)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.xxl,
    gap: spacing.md,
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: radii.lg,
    backgroundColor: colors.muted,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    ...typography.heading,
    color: colors.textPrimary,
  },
  price: {
    ...typography.heading,
    color: colors.coffee,
  },
  rating: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  label: {
    ...typography.label,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  option: {
    height: 40,
    paddingHorizontal: spacing.lg,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: spacing.md,
  },
  quantityLabel: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
  },
  errorScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.xxl,
  },
  errorTitle: {
    ...typography.heading,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  errorText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
