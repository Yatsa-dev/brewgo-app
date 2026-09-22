import { useMemo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { radii, shadows, sizes, spacing, typography } from '../theme';
import { useTheme } from '../context/ThemeContext';

const ACTIVE_OPACITY = 0.9;
const IMAGE_RATIO = 0.62; // image height relative to card width

export default function ProductCard({
  title,
  volume,
  price,
  rating,
  imageUrl,
  width,
  onPress,
  onAdd,
}) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <TouchableOpacity
      style={[styles.container, { width }]}
      onPress={onPress}
      activeOpacity={ACTIVE_OPACITY}
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${price}`}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: imageUrl }}
          style={[styles.image, { height: width * IMAGE_RATIO }]}
          resizeMode="cover"
        />
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
            onPress={onAdd}
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
