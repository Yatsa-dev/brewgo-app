import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OrderHistoryScreen from '../../screens/OrderHistoryScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import { SCREENS, TITLES } from '../routes';
import { stackScreenOptions } from '../screenOptions';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen
        name={SCREENS.PROFILE}
        component={ProfileScreen}
        options={{ title: TITLES[SCREENS.PROFILE] }}
      />
      <Stack.Screen
        name={SCREENS.ORDER_HISTORY}
        component={OrderHistoryScreen}
        options={{ title: TITLES[SCREENS.ORDER_HISTORY], headerBackTitle: 'Профіль' }}
      />
    </Stack.Navigator>
  );
}
