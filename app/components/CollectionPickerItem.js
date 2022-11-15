import React from 'react';
import { Text, TouchableOpacity, Image, View, StyleSheet } from 'react-native';

import AppColors from '../config/AppColors';

function CollectionPickerItem({ onPress, image, title }) {
    //Returns the card used in collection pickers.
    return (
        <TouchableOpacity onPress={onPress} underlayColor={AppColors.White}>
            <View style={styles.container}>
                <Text style={styles.text}>
                    {title}
                </Text>
                {isFinite(image) ? <Image source={image} style={styles.image} /> : <Image source={{ uri: image }} style={styles.image} />}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        backgroundColor: AppColors.White,
        borderRadius: 60,
    },
    container: {
        flexDirection: 'row',
        backgroundColor: AppColors.SecondaryDull,
        marginTop: 10,
        borderRadius: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        flex: 1,
        width: '80%',
        marginLeft: '10%'
    },
    text: {
        paddingBottom: 50,
        width: '45%',
        paddingLeft: '5%',
        fontWeight: 'bold'
    }
});

export default CollectionPickerItem;