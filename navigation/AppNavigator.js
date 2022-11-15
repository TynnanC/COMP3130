import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen.js';
import TabNavigator from './TabNavigator.js';
import RegistrationScreen from '../screens/RegistrationScreen.js';

const Stack = createStackNavigator();
function AppNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TabNavigation" component={TabNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default AppNavigator;