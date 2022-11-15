import React, { useState } from 'react';
import { View, StyleSheet, Button, Text, Modal, Image } from 'react-native';
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useFocusEffect } from '@react-navigation/native';

import AppColors from '../config/AppColors';
import DataManager from '../config/DataManager';
import CollectionPickerItem from './CollectionPickerItem';

const getCollections = () => {
    let commonData = DataManager.getInstance();
    let user = commonData.getUserId();
    return commonData.getCollections(user);
}

function NewMemoryCollectionPicker({ onCollection, style }) {
    const [collections, setCollections] = useState(getCollections());
    const [modalVisible, setModalVisible] = useState(false);

    //Sets all collections when the screen is focused.
    useFocusEffect(
        React.useCallback(() => {
            setCollections(getCollections())
            return () => {
            }
        }, [])
    )
    //Returns the collection picker for making a new memory.
    return (
        <>
            < TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                <View style={[styles.container, style]}>
                    <Text style={styles.text}>Pick a Collection</Text>
                    <MaterialCommunityIcons name="chevron-down" size={25} />
                </View>
            </TouchableWithoutFeedback >
            <Modal visible={modalVisible} animationType="slide">
                <Button title="Close" onPress={() => setModalVisible(false)} />
                {collections.length > 0 ? <FlatList
                    data={collections}
                    keyExtractor={collection => collection.id.toString()}
                    renderItem={({ item }) =>
                        <CollectionPickerItem onPress={() => {
                            setModalVisible(false),
                                onCollection(item)
                        }}
                            title={item.title}
                            image={item.image} />
                    }
                /> : <Text style={styles.errorText}>Please make a collection first!</Text>}
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        marginVertical: 0,
        backgroundColor: AppColors.SecondaryDull,
        padding: 5,
        marginTop: '5%'

    },
    text: {
        flex: 1,
        color: AppColors.Black,
        fontWeight: 'bold',
    },
    errorText: {
        color: AppColors.Red,
        textAlign: 'center'
    },
})

export default NewMemoryCollectionPicker;