import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function CollectionIcon({ name, size = 40, iconColor }) {
    //Returns a component used for displaying Material Community Icons for generic icon and images.
    return (
        <View>
            <MaterialCommunityIcons name={name} size={size} color={iconColor} />
        </View>
    );
}

export default CollectionIcon;