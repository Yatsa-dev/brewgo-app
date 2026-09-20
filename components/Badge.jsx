import { StyleSheet, Text, View } from 'react-native';

import { colors, typography } from '../theme';

const BADGE_SIZE = 18;
const DEFAULT_MAX = 99;

// Renders nothing at zero so callers don't need their own condition.
export default function Badge({ value = 0, max = DEFAULT_MAX, backgroundColor = colors.caramel }) {
  if (!value || value <= 0) return null;

  const label = value > max ? `${max}+` : String(value);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: BADGE_SIZE,
    height: BADGE_SIZE,
    paddingHorizontal: 4,
    borderRadius: BADGE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...typography.label,
    color: colors.espresso,
  },
});
