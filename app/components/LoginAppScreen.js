import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppColors from '../config/AppColors';
import Logo from './Logo';

function LoginAppScreen({ children }) {
    //Returns the main screen the login components are displayed on.
    return (
        <SafeAreaView style={styles.container}>
            <Logo style={styles.logo} size={100} />
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
    },
    logo: {
        backgroundColor: AppColors.White,
    }
});

export default LoginAppScreen;