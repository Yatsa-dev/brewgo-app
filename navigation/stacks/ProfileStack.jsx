import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OrderHistoryScreen from '../../screens/OrderHistoryScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import { SCREENS, TITLES } from '../routes';
import { createStackScreenOptions } from '../screenOptions';
import { useTheme } from '../../context/ThemeContext';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator screenOptions={createStackScreenOptions(colors)}>
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
