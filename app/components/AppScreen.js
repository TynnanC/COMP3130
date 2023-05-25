import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppColors from '../config/AppColors';
import Logo from './Logo';

function AppScreen({ children, style }) {
    //Returns the primary screen used to render other components on for the App.
    return (
        <SafeAreaView style={[styles.container, style]}>
            <Logo size={60} />
            {children}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppColors.White,
        flex: 1,
        margin: 0,
        padding: 0,
    }
});

export default AppScreen;