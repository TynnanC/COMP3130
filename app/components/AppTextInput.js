import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import AppColors from '../config/AppColors';

function AppTextInput({ style, ...props }) {
    //Returns the primary component used for user text inputs.
    return (
        <>
            <TextInput style={[styles.textInput, style]} {...props} />
        </>
    );
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: AppColors.Grey,
        borderRadius: 20,
        padding: 5,
        marginTop: '5%'
    },
})

export default AppTextInput;