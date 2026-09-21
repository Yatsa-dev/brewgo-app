import { useMemo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { radii, spacing, typography } from '../theme';
import { useTheme } from '../context/ThemeContext';

const ACTIVE_OPACITY = 0.7;
const STEPPER_HEIGHT = 30;
const BUTTON_WIDTH = 30;

export default function QuantityStepper({ value = 1, min = 1, max = 99, onChange }) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const canDecrease = value > min;
  const canIncrease = value < max;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => canDecrease && onChange?.(value - 1)}
        disabled={!canDecrease}
        activeOpacity={ACTIVE_OPACITY}
        accessibilityRole="button"
        accessibilityLabel="Зменшити кількість"
      >
        <Ionicons
          name="remove"
          size={16}
          color={canDecrease ? colors.textPrimary : colors.border}
        />
      </TouchableOpacity>

      <Text style={styles.value}>{value}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => canIncrease && onChange?.(value + 1)}
        disabled={!canIncrease}
        activeOpacity={ACTIVE_OPACITY}
        accessibilityRole="button"
        accessibilityLabel="Збільшити кількість"
      >
        <Ionicons name="add" size={16} color={canIncrease ? colors.textPrimary : colors.border} />
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    height: STEPPER_HEIGHT,
    borderRadius: STEPPER_HEIGHT / 2,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  button: {
    width: BUTTON_WIDTH,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.textPrimary,
    minWidth: spacing.xl,
    textAlign: 'center',
  },
});
