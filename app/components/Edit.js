import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import AppColors from '../config/AppColors';
import CollectionIcon from './CollectionIcon';

function Edit({ item, handleEdit, navigation }) {
    //Returns the edit component to edit collections and memories.
    return (
        <View style={styles.editView}>
            <TouchableOpacity onPress={() => handleEdit(item, { navigation })}>
                <CollectionIcon name="cog-outline" size={65} iconColor={AppColors.White} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    editView: {
        backgroundColor: AppColors.Blue,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '5%',
        width: '25%',
        borderRadius: 20
    }
});

export default Edit;