import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductDetailsScreen from '../../screens/ProductDetailsScreen';
import SearchScreen from '../../screens/SearchScreen';
import { SCREENS, TITLES } from '../routes';
import { stackScreenOptions } from '../screenOptions';

const Stack = createNativeStackNavigator();

export default function SearchStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen
        name={SCREENS.SEARCH}
        component={SearchScreen}
        options={{ title: TITLES[SCREENS.SEARCH] }}
      />
      <Stack.Screen
        name={SCREENS.PRODUCT_DETAILS}
        component={ProductDetailsScreen}
        options={{ title: TITLES[SCREENS.PRODUCT_DETAILS], headerBackTitle: 'Пошук' }}
      />
    </Stack.Navigator>
  );
}
