import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

//Creates the bottom button used to navigate to the registration screen.
function RegisterBottomBar({ onPress }) {
    return (
        <View style={styles.container}>
            <Button title="Register" onPress={onPress} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        paddingLeft: '10%',
        marginTop: 0
    },
});

export default RegisterBottomBar;