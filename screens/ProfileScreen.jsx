import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { SCREENS } from '../navigation/routes';
import { colors, radii, sizes, spacing, typography } from '../theme';

export default function ProfileScreen({ navigation }) {
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

const styles = StyleSheet.create({
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
  loyaltyLabel: {
    ...typography.label,
    color: colors.caramel,
  },
  loyaltyValue: {
    ...typography.heading,
    color: colors.textOnDark,
  },
  loyaltyHint: {
    ...typography.caption,
    color: colors.caramel,
  },
  card: {
    borderRadius: radii.lg,
    backgroundColor: colors.card,
    paddingHorizontal: spacing.lg,
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
