import { useMemo } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { DrawerActions } from '@react-navigation/native';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

import { SCREENS } from '../navigation/routes';
import { radii, sizes, spacing, typography } from '../theme';
import { useTheme } from '../context/ThemeContext';

export default function ProfileScreen({ navigation }) {
  const { colors, isDark, toggleTheme } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const rows = [
    { label: 'Мої замовлення', icon: 'receipt-outline', onPress: () => navigation.navigate(SCREENS.ORDER_HISTORY) },
    { label: 'Підтримка', icon: 'help-buoy-outline', onPress: () => navigation.dispatch(DrawerActions.jumpTo(SCREENS.SUPPORT)) },
    { label: 'Про заклад', icon: 'information-circle-outline', onPress: () => navigation.dispatch(DrawerActions.jumpTo(SCREENS.ABOUT)) },
  ];

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.identity}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>ІЯ</Text>
        </View>
        <View>
          <Text style={styles.name}>Ігор Яцишин</Text>
          <Text style={styles.phone}>+380 67 123 45 67</Text>
        </View>
      </View>

      <View style={styles.loyalty}>
        <Text style={styles.loyaltyLabel}>БОНУСНА КАРТКА</Text>
        <Text style={styles.loyaltyValue}>6 з 8 стаканів</Text>
        <Text style={styles.loyaltyHint}>Девʼятий напій у подарунок</Text>
      </View>

      {/* The switch is the only control that writes to the theme context;
          every other component just reads the palette from it. */}
      <View style={styles.themeRow}>
        <Ionicons
          name={isDark ? 'moon' : 'sunny'}
          size={sizes.iconMd}
          color={colors.coffee}
        />
        <View style={styles.themeText}>
          <Text style={styles.rowLabel}>Темна тема</Text>
          <Text style={styles.themeHint}>{isDark ? 'Увімкнено' : 'Вимкнено'}</Text>
        </View>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          trackColor={{ false: colors.border, true: colors.coffee }}
          thumbColor={colors.card}
          accessibilityLabel="Перемикач темної теми"
        />
      </View>

      <View style={styles.card}>
        {rows.map((row, index) => (
          <TouchableOpacity
            key={row.label}
            style={[styles.row, index < rows.length - 1 && styles.rowDivider]}
            onPress={row.onPress}
            activeOpacity={0.8}
            accessibilityRole="button"
          >
            <Ionicons name={row.icon} size={sizes.iconMd} color={colors.coffee} />
            <Text style={styles.rowLabel}>{row.label}</Text>
            <Ionicons name="chevron-forward" size={sizes.iconSm} color={colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
  content: {
    padding: spacing.xxl,
    gap: spacing.lg,
  },
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    ...typography.heading,
    color: colors.coffee,
  },
  name: {
    ...typography.subheading,
    color: colors.textPrimary,
  },
  phone: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  loyalty: {
    padding: spacing.lg,
    borderRadius: radii.xl,
    backgroundColor: colors.coffee,
    gap: spacing.xs,
  },
  // The loyalty card sits on colors.coffee, which is dark in the light theme and
  // light in the dark one. textOnDark flips with it, so the text stays readable.
  loyaltyLabel: {
    ...typography.label,
    color: colors.textOnDark,
  },
  loyaltyValue: {
    ...typography.heading,
    color: colors.textOnDark,
  },
  loyaltyHint: {
    ...typography.caption,
    color: colors.textOnDark,
  },
  card: {
    borderRadius: radii.lg,
    backgroundColor: colors.card,
    paddingHorizontal: spacing.lg,
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radii.lg,
    backgroundColor: colors.card,
  },
  themeText: {
    flex: 1,
  },
  themeHint: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.lg,
  },
  rowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  rowLabel: {
    ...typography.body,
    color: colors.textPrimary,
    flex: 1,
  },
});
