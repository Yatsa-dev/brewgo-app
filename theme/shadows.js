import { Platform } from 'react-native';

import { colors } from './colors';

// iOS і Android малюють тіні різними наборами властивостей: iOS — shadow*,
// Android — elevation. Platform.select віддає потрібний набір, тому компоненти
// просто підключають shadows.card і не думають про платформу.
const shadow = ({ elevation, opacity, radius, offsetY }) =>
  Platform.select({
    ios: {
      shadowColor: colors.espresso,
      shadowOffset: { width: 0, height: offsetY },
      shadowOpacity: opacity,
      shadowRadius: radius,
    },
    android: { elevation },
    default: {},
  });

export const shadows = {
  // Легка тінь для карток у списках.
  card: shadow({ elevation: 2, opacity: 0.08, radius: 12, offsetY: 4 }),
  // Помітніша тінь для елементів, що «висять» над контентом.
  raised: shadow({ elevation: 6, opacity: 0.16, radius: 20, offsetY: 8 }),
};
