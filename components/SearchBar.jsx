import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { colors, radii, sizes, spacing, typography } from '../theme';

const ACTIVE_OPACITY = 0.7;

// Поле пошуку з мікропідказками: поки текст порожній, під полем показуємо
// найчастіші запити. Тап по підказці одразу підставляє її у поле.
export default function SearchBar({
  value = '',
  onChangeText,
  placeholder = 'Пошук напою',
  hints = [],
  onSubmit,
}) {
  const hasText = value.length > 0;
  const showHints = !hasText && hints.length > 0;

  return (
    <View>
      <View style={styles.field}>
        <Ionicons name="search" size={sizes.iconMd} color={colors.textSecondary} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          returnKeyType="search"
          onSubmitEditing={onSubmit}
          accessibilityLabel={placeholder}
        />
        {hasText ? (
          <TouchableOpacity
            onPress={() => onChangeText?.('')}
            activeOpacity={ACTIVE_OPACITY}
            accessibilityRole="button"
            accessibilityLabel="Очистити пошук"
          >
            <Ionicons name="close-circle" size={sizes.iconMd} color={colors.textSecondary} />
          </TouchableOpacity>
        ) : null}
      </View>

      {showHints ? (
        <View style={styles.hints}>
          {hints.map((hint) => (
            <TouchableOpacity
              key={hint}
              style={styles.hint}
              onPress={() => onChangeText?.(hint)}
              activeOpacity={ACTIVE_OPACITY}
              accessibilityRole="button"
            >
              <Text style={styles.hintLabel}>{hint}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    height: sizes.controlLg - spacing.xs,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.pill,
    backgroundColor: colors.card,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: colors.border,
  },
  input: {
    ...typography.body,
    flex: 1,
    color: colors.textPrimary,
    // Прибираємо типовий вертикальний padding Android, інакше текст з'їжджає вниз.
    paddingVertical: 0,
  },
  hints: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  hint: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: colors.muted,
  },
  hintLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
