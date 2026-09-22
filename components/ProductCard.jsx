import { memo, useCallback, useMemo } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { radii, shadows, sizes, spacing, typography } from '../theme';
import { useRenderLog } from '../hooks/useRenderLog';
import { useTheme } from '../context/ThemeContext';

const ACTIVE_OPACITY = 0.9;
const IMAGE_RATIO = 0.62; // image height relative to card width

// The card takes an id and hands it back to the screen, so the whole grid can
// share one callback instead of getting a fresh arrow per item on every render.
function ProductCard({ id, title, volume, price, rating, imageUrl, width, onPress, onAdd }) {
  useRenderLog('ProductCard');
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const handlePress = useCallback(() => onPress?.(id), [id, onPress]);
  const handleAdd = useCallback(() => onAdd?.(id), [id, onAdd]);

  // Both styles mix a sheet entry with a runtime size, so they are composed once
  // per width change instead of allocating a new array on every render.
  const containerStyle = useMemo(() => [styles.container, { width }], [styles, width]);
  const imageStyle = useMemo(
    () => [styles.image, { height: width * IMAGE_RATIO }],
    [styles, width]
  );

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={handlePress}
      activeOpacity={ACTIVE_OPACITY}
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${price}`}
    >
      <View style={styles.imageWrapper}>
        <Image source={{ uri: imageUrl }} style={imageStyle} resizeMode="cover" />
        {rating ? (
          <View style={styles.rating}>
            <Ionicons name="star" size={12} color={colors.caramel} />
            <Text style={styles.ratingLabel}>{rating}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {volume ? <Text style={styles.volume}>{volume}</Text> : null}

        <View style={styles.footer}>
          <Text style={styles.price}>{price}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAdd}
            activeOpacity={ACTIVE_OPACITY}
            accessibilityRole="button"
            accessibilityLabel={`Додати ${title} у кошик`}
          >
            <Ionicons name="add" size={sizes.iconMd} color={colors.textOnDark} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default memo(ProductCard);

const createStyles = (colors) =>
  StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: spacing.md,
    ...shadows.card,
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    borderRadius: radii.md,
    backgroundColor: colors.muted,
  },
  rating: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radii.sm,
    backgroundColor: colors.card,
  },
  ratingLabel: {
    ...typography.label,
    color: colors.textPrimary,
  },
  body: {
    marginTop: spacing.md,
  },
  title: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
  },
  volume: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  price: {
    ...typography.bodyStrong,
    color: colors.coffee,
  },
  addButton: {
    width: sizes.controlSm,
    height: sizes.controlSm,
    borderRadius: sizes.controlSm / 2,
    backgroundColor: colors.espresso,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
