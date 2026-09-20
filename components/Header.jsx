import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Badge from './Badge';
import { colors, sizes, spacing, typography } from '../theme';

const ACTIVE_OPACITY = 0.7;

// Шапка головного екрана: зліва точка самовивозу, справа кошик із лічильником.
export default function Header({
  label = 'ЗАБРАТИ В',
  title,
  cartCount = 0,
  onPressLocation,
  onPressCart,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.location}
        onPress={onPressLocation}
        activeOpacity={ACTIVE_OPACITY}
        accessibilityRole="button"
      >
        <Text style={styles.label}>{label}</Text>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Ionicons name="chevron-forward" size={sizes.iconSm} color={colors.coffee} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cart}
        onPress={onPressCart}
        activeOpacity={ACTIVE_OPACITY}
        accessibilityRole="button"
        accessibilityLabel={`Кошик, товарів: ${cartCount}`}
      >
        <Ionicons name="bag-handle-outline" size={sizes.iconMd} color={colors.textOnDark} />
        {/* Бейдж винесено за межі круглої кнопки, тому позиціонуємо його абсолютно. */}
        <View style={styles.badge}>
          <Badge value={cartCount} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.lg,
  },
  location: {
    flex: 1,
  },
  label: {
    ...typography.label,
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  title: {
    ...typography.subheading,
    color: colors.textPrimary,
    flexShrink: 1,
  },
  cart: {
    width: sizes.controlMd,
    height: sizes.controlMd,
    borderRadius: sizes.controlMd / 2,
    backgroundColor: colors.espresso,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
  },
});
