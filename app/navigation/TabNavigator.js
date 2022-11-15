import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AccountScreen from '../screens/AccountScreen';
import AppColors from '../config/AppColors';
import CollectionIcon from '../components/CollectionIcon';
import CollectionsNavigator from './CollectionsNavigator';
import NewCollectionScreen from '../screens/NewCollectionScreen';
import NewMemoryScreen from '../screens/NewMemoryScreen';
import AllMemoriesNavigator from './AllMemoriesNavigator';

const AppTab = createBottomTabNavigator();

//This is the bottom tab navigator. Contains other nested navigators for the collections screen.
const TabNavigator = () => (
    <AppTab.Navigator>
        <AppTab.Screen name="AccountPage" component={AccountScreen} options={{ headerShown: false, title: "Account", tabBarActiveBackgroundColor: AppColors.PrimaryColor, tabBarInactiveBackgroundColor: AppColors.Grey, tabBarIcon: () => <CollectionIcon name='home-variant' iconColor={AppColors.Black} size={30} /> }} />
        <AppTab.Screen name="CollectionsNavigator" component={CollectionsNavigator} options={{ headerShown: false, title: "My Collections", tabBarActiveBackgroundColor: AppColors.PrimaryColor, tabBarInactiveBackgroundColor: AppColors.Grey, tabBarIcon: () => <CollectionIcon name='library' iconColor={AppColors.Black} size={30} /> }} />
        <AppTab.Screen name="NewCollectionScreen" component={NewCollectionScreen} options={{ headerShown: false, title: "New Collection", tabBarActiveBackgroundColor: AppColors.PrimaryColor, tabBarInactiveBackgroundColor: AppColors.Grey, tabBarIcon: () => <CollectionIcon name='folder-plus' iconColor={AppColors.Black} size={30} /> }} />
        <AppTab.Screen name="AllMemoriesNavigator" component={AllMemoriesNavigator} options={{ headerShown: false, title: "My Memories", tabBarActiveBackgroundColor: AppColors.PrimaryColor, tabBarInactiveBackgroundColor: AppColors.Grey, tabBarIcon: () => <CollectionIcon name='note-text' iconColor={AppColors.Black} size={30} /> }} />
        <AppTab.Screen name="NewMemoriesScreen" component={NewMemoryScreen} options={{ headerShown: false, title: "New Memory", tabBarActiveBackgroundColor: AppColors.PrimaryColor, tabBarInactiveBackgroundColor: AppColors.Grey, tabBarIcon: () => <CollectionIcon name='note-plus' iconColor={AppColors.Black} size={30} /> }} />
    </AppTab.Navigator>
);

export default TabNavigator;