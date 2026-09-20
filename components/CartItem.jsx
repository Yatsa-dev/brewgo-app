import { Image, StyleSheet, Text, View } from 'react-native';

import QuantityStepper from './QuantityStepper';
import { colors, radii, shadows, sizes, spacing, typography } from '../theme';

export default function CartItem({
  title,
  options,
  price,
  quantity = 1,
  imageUrl,
  onChangeQuantity,
}) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />

      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {options ? (
          <Text style={styles.options} numberOfLines={1}>
            {options}
          </Text>
        ) : null}
        <QuantityStepper value={quantity} onChange={onChangeQuantity} />
      </View>

      <Text style={styles.price}>{price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.card,
    ...shadows.card,
  },
  image: {
    width: sizes.thumbMd,
    height: sizes.thumbMd,
    borderRadius: radii.md,
    backgroundColor: colors.muted,
  },
  body: {
    // Takes the free space so the price stays pinned to the right edge.
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
  },
  options: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  price: {
    ...typography.bodyStrong,
    color: colors.coffee,
  },
});
