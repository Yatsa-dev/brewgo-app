import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import DrawerNavigator from './DrawerNavigator';
import { DRAWER, SCREENS, STACKS } from './routes';
import { colors } from '../theme';

// Navigation theme is derived from the design tokens so screen backgrounds
// and transitions match the rest of the app.
const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.coffee,
    background: colors.cream,
    card: colors.card,
    text: colors.textPrimary,
    border: colors.border,
  },
};

// Explicit paths for every screen: on web this turns the nested navigators into
// readable URLs, and productId travels in the path instead of being lost on reload.
const linking = {
  prefixes: [],
  config: {
    screens: {
      [DRAWER.TABS]: {
        screens: {
          [STACKS.MENU]: {
            screens: {
              [SCREENS.HOME]: 'menu',
              [SCREENS.PRODUCT_DETAILS]: 'menu/:productId',
            },
          },
          [STACKS.SEARCH]: {
            screens: {
              [SCREENS.SEARCH]: 'search',
              [SCREENS.PRODUCT_DETAILS]: 'search/:productId',
            },
          },
          [STACKS.CART]: {
            screens: {
              [SCREENS.CART]: 'cart',
              [SCREENS.CHECKOUT]: 'checkout',
              [SCREENS.CONFIRMATION]: 'confirmation',
            },
          },
          [STACKS.PROFILE]: {
            screens: {
              [SCREENS.PROFILE]: 'profile',
              [SCREENS.ORDER_HISTORY]: 'orders',
            },
          },
        },
      },
      [SCREENS.SUPPORT]: 'support',
      [SCREENS.ABOUT]: 'about',
    },
  },
};

export default function RootNavigator() {
  return (
    <NavigationContainer theme={navigationTheme} linking={linking}>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
