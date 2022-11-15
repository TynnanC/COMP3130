import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

import AppColors from '../config/AppColors';

function ListCollections({ image, title, description, onPress, onSwipeLeft, onSwipeRight, style }) {
    //Creates the card used in some flatlists such as the collections flatlist.
    return (
        <Swipeable renderRightActions={onSwipeLeft} renderLeftActions={onSwipeRight}>
            <TouchableOpacity onPress={onPress}>
                <View style={[styles.collection, style]}>
                    {isFinite(image) ? <Image source={image} style={styles.image} /> : <Image source={{ uri: image }} style={styles.image} />}
                    {title && <Text style={styles.title}>{description}</Text>}
                    <Text style={styles.text}>{title}</Text>
                </View>
            </TouchableOpacity >
        </Swipeable >
    );
}

const styles = StyleSheet.create({
    image: {
        width: 85,
        height: 85,
        borderRadius: 5
    },
    text: {
        fontStyle: 'italic',
    },
    title: {
        fontWeight: 'bold',
    },
    collection: {
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: AppColors.Grey,
        borderRadius: 20,
        marginBottom: '5%'
    }
});

export default ListCollections;