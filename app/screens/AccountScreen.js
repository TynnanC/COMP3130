import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

import AppScreen from '../components/AppScreen.js';
import DataManager from '../config/DataManager.js';
import UserHomeList from '../components/UserHomeList.js';
import AppColors from '../config/AppColors.js';

function AccountScreen({ navigation, route }) {
    //Logs the user out.
    const logoutHandler = () => {
        navigation.navigate('LoginScreen');
        DataManager.userId = '';
    }
    //Returns the account screen containing the users details.
    return (
        <AppScreen>
            <View style={styles.container}>
                <UserHomeList
                    profileImage={route.params.profileImage}
                    username={route.params.username}
                    firstName={route.params.firstName}
                    lastName={route.params.lastName}
                    email={route.params.email} />
            </View>
            <View style={styles.logout}>
                <Button title="Log Out" onPress={logoutHandler} color={AppColors.Red} />
            </View>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        width: '80%'
    },
    logout: {
        width: '80%',
        alignSelf: 'center'
    },
});

export default AccountScreen;