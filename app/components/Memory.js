import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

import AppColors from '../config/AppColors';

//Returns a memory card for memories in a collection
function Memory({ title, description, image, onSwipeLeft, onSwipeRight, onPress }) {
    return (
        <Swipeable renderRightActions={onSwipeLeft} renderLeftActions={onSwipeRight}>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.container}>
                    {isFinite(image) ? <Image source={image} style={styles.image} /> : <Image source={{ uri: image }} style={styles.image} />}
                    <Text style={styles.title}>{title}</Text>
                    <Text>{description}</Text>
                </View>
            </TouchableOpacity>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    image: {
        height: 100,
        width: 100,
        borderRadius: 5
    },
    container: {
        backgroundColor: AppColors.Grey,
        borderRadius: 20,
        alignItems: "center",
        marginBottom: '5%',
        flexDirection: "column",
    },
    title: {
        fontWeight: 'bold'
    }
});

export default Memory;