import React, { useState } from 'react';
import { View, StyleSheet, Button, Text, Modal } from 'react-native';
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import AppColors from '../config/AppColors';
import DataManager from '../config/DataManager';
import CollectionPickerItem from './CollectionPickerItem';

function CollectionPicker({ navigation, placeholder, collections, style }) {
    const [modalVisible, setModalVisible] = useState(false);

    //Returns the memories for a specific collection.
    const getMemoriesForCollection = (collectionId) => {
        let commonData = DataManager.getInstance();
        let user = commonData.getUserId();
        return commonData.getMemoriesForCollection(user, collectionId);
    }
    //Returns the picker component, containing a bar to indicate options can be picked, and a flatlist containing options to pick from.
    //Mainly used for selecting collections.
    return (
        <>
            < TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                <View style={[styles.container, style]}>
                    <Text style={styles.text}>{placeholder}</Text>
                    <MaterialCommunityIcons name="chevron-down" size={25} />
                </View>
            </TouchableWithoutFeedback >
            <Modal visible={modalVisible} animationType="slide">
                <Button title="Close" onPress={() => setModalVisible(false)} />
                <FlatList
                    data={collections}
                    keyExtractor={collection => collection.id.toString()}
                    renderItem={({ item }) =>
                        <CollectionPickerItem onPress={() => {
                            setModalVisible(false),
                                navigation.navigate('MemoryNavigator', {
                                    screen: 'MemoryScreen', params: {
                                        memories: getMemoriesForCollection(item.id),
                                        collectionTitle: item.title,
                                        collections: collections
                                    }
                                })
                        }}
                            title={item.title}
                            image={item.image}
                        />
                    }
                />
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        marginVertical: 20,
        backgroundColor: AppColors.Grey,
        width: "90%",
        padding: 5,
        marginLeft: '5%'

    },
    text: {
        flex: 1,
        color: AppColors.Black,
        fontWeight: 'bold',
    }
});

export default CollectionPicker;