import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MemoriesScreen from '../screens/MemoriesScreen.js';
import EditMemoryScreen from '../screens/EditMemoryScreen.js';
import AllMemoriesScreen from '../screens/AllMemoriesScreen';

const Stack = createStackNavigator();

//This is the memory navigator containing the screens for the memories within a collection, and the screen for editing memories.
function AllMemoriesNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="AllMemoriesScreen" component={AllMemoriesScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MemoryScreen" component={MemoriesScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EditMemory" component={EditMemoryScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default AllMemoriesNavigator;