import { useWindowDimensions } from 'react-native';

import { spacing, WIDE_SCREEN_BREAKPOINT } from '../theme';

// Ширина картки рахується від реальної ширини вікна, а не задається числом,
// тому сітка коректно виглядає і в портреті, і в ландшафті, і на планшеті.
// useWindowDimensions оновлюється при повороті екрана — на відміну від
// Dimensions.get('window'), яке віддає значення лише на момент виклику.
export function useCardWidth({
  horizontalPadding = spacing.xxl,
  gutter = spacing.md,
  columns,
} = {}) {
  const { width, height } = useWindowDimensions();

  const isLandscape = width > height;
  // На широкому екрані (планшет або телефон у ландшафті) двоколонкова сітка
  // залишає надто широкі картки, тому додаємо третю колонку.
  const resolvedColumns = columns ?? (width >= WIDE_SCREEN_BREAKPOINT ? 3 : 2);

  const available = width - horizontalPadding * 2 - gutter * (resolvedColumns - 1);
  const cardWidth = Math.floor(available / resolvedColumns);

  return { cardWidth, columns: resolvedColumns, isLandscape, windowWidth: width };
}
