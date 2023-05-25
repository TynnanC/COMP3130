import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CollectionsScreen from '../screens/CollectionsScreen.js';
import MemoryNavigator from './MemoryNavigator.js';
import EditCollectionScreen from '../screens/EditCollectionScreen.js';

const Stack = createStackNavigator();

function CollectionsNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="CollectionsPage" component={CollectionsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MemoryNavigator" component={MemoryNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="EditCollection" component={EditCollectionScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default CollectionsNavigator;