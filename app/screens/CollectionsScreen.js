import React, { useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import AppScreen from '../components/AppScreen.js';
import ListCollections from '../components/ListCollections.js';
import AppColors from '../config/AppColors.js';
import Delete from '../components/Delete.js';
import CollectionPicker from '../components/CollectionPicker.js';
import DataManager from '../config/DataManager.js';
import Edit from '../components/Edit.js';

//Returns all collections for a user.
const getCollections = () => {
    let commonData = DataManager.getInstance();
    let user = commonData.getUserId();
    return commonData.getCollections(user);
}

//Returns all memories for a collection.
const getMemoriesForCollection = (collectionId) => {
    let commonData = DataManager.getInstance();
    let user = commonData.getUserId();
    return commonData.getMemoriesForCollection(user, collectionId);
}

function CollectionsScreen({ navigation }) {
    const [collections, setCollections] = useState(getCollections());
    const [refreshing, setRefreshing] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            setCollections(getCollections())
            return () => {
            }
        }, [])
    );

    //Deletes a collection.
    const handleDelete = (collection) => {
        let commonData = DataManager.getInstance();
        commonData.deleteCollection(collection.id)
        setCollections(getCollections());
    }

    //Handles editing a collection.
    const handleEdit = (collection, { navigation }) => {
        navigation.navigate('EditCollection', { data: collection, collections: getCollections() })
    }

    //Sets collections when the screen is focused or unfocused (for when the collection is changed).
    useFocusEffect(
        React.useCallback(() => {
            setCollections(getCollections())
            return () => {
                setCollections(getCollections())
            }
        }, [])
    );

    //Returns the collections screen containing a users collections.
    return (
        <AppScreen>
            <CollectionPicker placeholder={"Collections"} collections={collections} navigation={navigation} style={styles.picker} />
            <FlatList
                style={styles.collections}
                data={collections}
                refreshing={refreshing}
                onRefresh={() => setCollections(getCollections())}
                keyExtractor={collection => collection.id.toString()}
                renderItem={({ item }) =>
                    <ListCollections title={item.title} image={item.image}
                        style={styles.collection}
                        onPress={() => navigation.navigate('MemoryNavigator', {
                            screen: 'MemoryScreen',
                            params: {
                                memories: getMemoriesForCollection(item.id),
                                collectionTitle: item.title,
                                collections: getCollections(),
                                collectionId: item.id
                            }
                        })}
                        onSwipeLeft={() => (<Delete item={item} handleDelete={handleDelete} />)}
                        onSwipeRight={() => (<Edit item={item} handleEdit={handleEdit} navigation={navigation} />)}
                    />
                }>
            </FlatList>
        </AppScreen >
    );
}

const styles = StyleSheet.create({
    collections: {
        width: "100%",
        paddingLeft: '10%',
        paddingRight: '10%',
    },
    picker:
    {
        width: '80%',
        marginLeft: '10%'
    },
    collection: {
        backgroundColor: AppColors.SecondaryDull
    }
});

export default CollectionsScreen;