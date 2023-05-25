import React, { useState } from 'react';
import { StyleSheet, Text, Button, FlatList, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import AppScreen from '../components/AppScreen.js';
import Memory from '../components/Memory.js';
import AppColors from '../config/AppColors.js';
import Delete from '../components/Delete.js';
import Edit from '../components/Edit.js';
import DataManager from '../config/DataManager.js';

//Retrieves all memories for a user.
const getMemories = () => {
    let commonData = DataManager.getInstance();
    let user = commonData.getUserId();
    return commonData.getMemories(user);
}

function MemoriesScreen({ navigation, route }) {
    const [memories, setMemories] = useState(route.params.memories);
    const [refreshing, setRefreshing] = useState(false);
    const [collection, setCollection] = useState(route.params.collectionId);

    //Sets memories when the screen is focused.
    useFocusEffect(
        React.useCallback(() => {
            setMemories(getMemoriesForCollection())
            return () => {
            }
        }, [])
    );

    //Returns the memories for the specific collection.
    const getMemoriesForCollection = () => {
        let commonData = DataManager.getInstance();
        let user = commonData.getUserId();
        return commonData.getMemoriesForCollection(user, collection);
    }

    //Deletes a memory.
    const handleDelete = (memory) => {
        let commonData = DataManager.getInstance();
        commonData.deleteMemory(memory.id)
        setMemories(getMemoriesForCollection());
    }

    //Handles editing a memory.
    const handleEdit = (memory, { navigation }) => {
        navigation.navigate('EditMemory', { data: memory, page: 'CollectionsPage' })
    }

    //Returns the screen showing memories from a specific collection.
    return (
        <AppScreen>
            <View style={styles.header}>
                <Text style={styles.collectionTitle}>{route.params.collectionTitle}</Text>
            </View>
            <FlatList
                style={styles.list}
                data={memories}
                refreshing={refreshing}
                onRefresh={() => setMemories(getMemoriesForCollection())}
                keyExtractor={memory => memory.id.toString()}
                renderItem={({ item }) =>
                    <Memory title={item.title} image={item.image} description={item.description}
                        onSwipeLeft={() => (<Delete item={item} handleDelete={handleDelete} />)}
                        onSwipeRight={() => (<Edit item={item} handleEdit={handleEdit} navigation={navigation} />)}
                    />
                }
            >
            </FlatList>
            <View style={styles.back}>
                <Button title="Go Back" onPress={() => navigation.goBack()} color={AppColors.Red} />
            </View>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    list: {
        width: "80%",
        marginLeft: '10%',
    },
    collectionTitle: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center'
    },
    header: {
        backgroundColor: AppColors.PrimaryColor,
        marginTop: '5%',
        marginBottom: '5%',
        width: '80%',
        marginLeft: '10%',
        borderRadius: 20
    },
    back: {
        width: '80%',
        marginLeft: '10%',
        marginBottom: '5%'
    }
});

export default MemoriesScreen;