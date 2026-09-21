import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { typography } from '../theme';
import { useTheme } from '../context/ThemeContext';

const BADGE_SIZE = 18;
const DEFAULT_MAX = 99;

// Renders nothing at zero so callers don't need their own condition.
export default function Badge({ value = 0, max = DEFAULT_MAX, backgroundColor }) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  // Default cannot live in the signature: the palette is only known inside the component.
  const fill = backgroundColor ?? colors.caramel;
  if (!value || value <= 0) return null;

  const label = value > max ? `${max}+` : String(value);

  return (
    <View style={[styles.container, { backgroundColor: fill }]}>
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
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
