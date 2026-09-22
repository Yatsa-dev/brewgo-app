import { useMemo } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

import CustomButton from '../components/CustomButton';
import { radii, spacing, typography } from '../theme';
import { useTheme } from '../context/ThemeContext';

export default function ConfirmationScreen({ route, navigation }) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { orderNumber, total, time, payment } = route.params ?? {};

  const rows = [
    ['Номер замовлення', orderNumber ? `№ ${orderNumber}` : '—'],
    ['Час готовності', time ?? '—'],
    ['Спосіб оплати', payment ?? '—'],
    ['Сплачено', total ? `${total} ₴` : '—'],
  ];

  return (
    <View style={styles.screen}>
      <View style={styles.badge}>
        <Ionicons name="checkmark" size={40} color={colors.textOnDark} />
      </View>

      <Text style={styles.title}>Замовлення прийнято</Text>
      <Text style={styles.subtitle}>Ми надішлемо сповіщення, коли напій буде готовий.</Text>

      <View style={styles.card}>
        {rows.map(([label, value], index) => (
          <View
            key={label}
            style={[styles.row, index < rows.length - 1 && styles.rowDivider]}
          >
            <Text style={styles.rowLabel}>{label}</Text>
            <Text style={styles.rowValue}>{value}</Text>
          </View>
        ))}
      </View>

      {/* popToTop returns to the first screen of this stack instead of stacking more screens. */}
      <CustomButton title="На головну" onPress={() => navigation.popToTop()} />
    </View>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.xxl,
  },
  badge: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.espresso,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.heading,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  card: {
    alignSelf: 'stretch',
    borderRadius: radii.lg,
    backgroundColor: colors.card,
    paddingHorizontal: spacing.lg,
    marginVertical: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  rowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  rowLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  rowValue: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
  },
});
