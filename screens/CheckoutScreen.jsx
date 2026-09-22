import { useState, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import CustomButton from '../components/CustomButton';
import { SCREENS } from '../navigation/routes';
import { radii, spacing, typography } from '../theme';
import { useTheme } from '../context/ThemeContext';

const PICKUP_TIMES = ['Якнайшвидше · 10 хв', '12:30', '13:00'];
const PAYMENTS = ['Apple Pay', 'Картка •••• 1234', 'Готівка в закладі'];

export default function CheckoutScreen({ route, navigation }) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const total = route.params?.total ?? 0;
  const [time, setTime] = useState(PICKUP_TIMES[0]);
  const [payment, setPayment] = useState(PAYMENTS[0]);

  const confirm = () =>
    navigation.navigate(SCREENS.CONFIRMATION, {
      orderNumber: Math.floor(1000 + Math.random() * 9000),
      total,
      time,
      payment,
    });

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.label}>ЧАС САМОВИВОЗУ</Text>
      <View style={styles.chips}>
        {PICKUP_TIMES.map((option) => (
          <CustomButton
            key={option}
            title={option}
            variant={option === time ? 'primary' : 'secondary'}
            fullWidth={false}
            style={styles.chip}
            onPress={() => setTime(option)}
          />
        ))}
      </View>

      <Text style={styles.label}>СПОСІБ ОПЛАТИ</Text>
      <View style={styles.card}>
        {PAYMENTS.map((option, index) => (
          <TouchableOpacity
            key={option}
            style={[styles.payment, index < PAYMENTS.length - 1 && styles.paymentDivider]}
            activeOpacity={0.8}
            onPress={() => setPayment(option)}
            accessibilityRole="radio"
            accessibilityState={{ selected: option === payment }}
          >
            <View style={[styles.radio, option === payment && styles.radioActive]} />
            <Text style={styles.paymentLabel}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>До сплати</Text>
        <Text style={styles.totalValue}>{total} ₴</Text>
      </View>

      <CustomButton title="Підтвердити замовлення" onPress={confirm} />
    </ScrollView>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
  content: {
    padding: spacing.xxl,
    gap: spacing.md,
  },
  label: {
    ...typography.label,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    height: 40,
    paddingHorizontal: spacing.lg,
  },
  card: {
    borderRadius: radii.lg,
    backgroundColor: colors.card,
    paddingHorizontal: spacing.lg,
  },
  payment: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.lg,
  },
  paymentDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
  },
  radioActive: {
    borderColor: colors.coffee,
    borderWidth: 6,
  },
  paymentLabel: {
    ...typography.body,
    color: colors.textPrimary,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  totalLabel: {
    ...typography.subheading,
    color: colors.textPrimary,
  },
  totalValue: {
    ...typography.subheading,
    color: colors.coffee,
  },
});
