import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MemoriesScreen from '../screens/MemoriesScreen.js';
import EditMemoryScreen from '../screens/EditMemoryScreen.js';

const Stack = createStackNavigator();

//This is the memory navigator containing the screens for the memories within a collection, and the screen for editing memories.
function CollectionsNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MemoryScreen" component={MemoriesScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EditMemory" component={EditMemoryScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default CollectionsNavigator;