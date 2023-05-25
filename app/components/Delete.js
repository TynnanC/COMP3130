import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import AppColors from '../config/AppColors';
import CollectionIcon from './CollectionIcon';

function Delete({ item, handleDelete }) {
    //Returns the delete component for deleting collections and memories.
    return (
        <View style={styles.deleteView}>
            <TouchableOpacity onPress={() => handleDelete(item)}>
                <CollectionIcon name="trash-can" size={65} iconColor={AppColors.White} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    deleteView: {
        backgroundColor: AppColors.Red,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '5%',
        width: '25%',
        borderRadius: 20
    }
});

export default Delete;