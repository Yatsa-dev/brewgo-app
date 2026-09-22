import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import QuantityStepper from './QuantityStepper';
import { radii, shadows, sizes, spacing, typography } from '../theme';
import { useTheme } from '../context/ThemeContext';

export default function CartItem({
  title,
  options,
  price,
  quantity = 1,
  imageUrl,
  onChangeQuantity,
  onRemove,
}) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
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

      <View style={styles.trailing}>
        <Text style={styles.price}>{price}</Text>
        {onRemove ? (
          <TouchableOpacity
            onPress={onRemove}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={`Видалити ${title} з кошика`}
          >
            <Ionicons name="trash-outline" size={sizes.iconMd} color={colors.textSecondary} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
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
  trailing: {
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  price: {
    ...typography.bodyStrong,
    color: colors.coffee,
  },
});
