import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

import AppColors from '../config/AppColors';

//Creates the bottom button to cancel user registration.
function CancelRegistrationBottomBar({ onPress }) {
    return (
        <View style={styles.container}>
            <Button title="Cancel" onPress={onPress} color={AppColors.Red} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: '90%',
        paddingLeft: '10%',
        margin: 0
    }
})

export default CancelRegistrationBottomBar;