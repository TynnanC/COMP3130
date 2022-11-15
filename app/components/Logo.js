import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
//import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppColors from '../config/AppColors';

//Removed below in order to avoid errors while testing.
/*
function Logo({ style, size }) {
    //Returns the logo of the app.
    return (
        <View style={[styles.logo, style]}>
            <MaterialCommunityIcons name="heart-outline" size={size} color="black" style={styles.icon} />
        </View>
    )
};*/

//Temporary function, replaces vector-icons with an image.
function Logo({ style, size }) {
    //Returns the logo of the app.
    return (
        <View style={[styles.logo, style]}>
            <Image style={styles.icon} source={require('../assets/heart-outline.png')} />
        </View>
    )
};

const styles = StyleSheet.create({
    logo: {
        alignSelf: 'center',
        margin: 0,
        padding: 0,
        backgroundColor: AppColors.PrimaryColor,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    icon: {
        width: 48,
        height: 48
    }
});
export default Logo;