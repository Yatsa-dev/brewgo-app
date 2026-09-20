import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors, radii, spacing, typography } from '../theme';

const ACTIVE_OPACITY = 0.9;
const BANNER_HEIGHT = 96;
const DECOR_SIZE = 120;

// Промо-банер з головного екрана. Декоративне коло — звичайний View з великим
// radius; банер має overflow: 'hidden', тому коло не вилазить за скруглені кути.
export default function PromoBanner({ title, subtitle, actionLabel, onPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.decor} />

      <View style={styles.text}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      {actionLabel ? (
        <TouchableOpacity
          style={styles.action}
          onPress={onPress}
          activeOpacity={ACTIVE_OPACITY}
          accessibilityRole="button"
        >
          <Text style={styles.actionLabel}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: BANNER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.xl,
    backgroundColor: colors.coffee,
    overflow: 'hidden',
  },
  decor: {
    position: 'absolute',
    right: -DECOR_SIZE / 3,
    top: -DECOR_SIZE / 3,
    width: DECOR_SIZE,
    height: DECOR_SIZE,
    borderRadius: DECOR_SIZE / 2,
    backgroundColor: colors.caramel,
    opacity: 0.25,
  },
  text: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    ...typography.heading,
    fontSize: 19,
    color: colors.textOnDark,
  },
  subtitle: {
    ...typography.caption,
    color: colors.caramel,
  },
  action: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: colors.card,
  },
  actionLabel: {
    ...typography.label,
    color: colors.espresso,
  },
});
