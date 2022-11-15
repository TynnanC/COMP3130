import React, { useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import AppScreen from '../components/AppScreen.js';
import ListCollections from '../components/ListCollections.js';
import Delete from '../components/Delete.js';
import DataManager from '../config/DataManager.js';
import Edit from '../components/Edit.js';

//Retrieves all memories for a user.
const getMemories = () => {
    let commonData = DataManager.getInstance();
    let user = commonData.getUserId();
    return commonData.getMemories(user);
}

function AllMemoriesScreen({ navigation }) {
    const [memories, setMemories] = useState();
    const [refreshing, setRefreshing] = useState(false);

    //Deletes a memory.
    const handleDelete = (memory) => {
        let commonData = DataManager.getInstance();
        commonData.deleteMemory(memory.id)
        setMemories(getMemories());
    }

    //Handles editing a memory.
    const handleEdit = (memory, { navigation }) => {
        navigation.navigate('AllMemoriesNavigator', {
            screen: 'EditMemory', params: {
                data: memory
            }
        });
    }

    //Sets memories when the screen is focused.
    useFocusEffect(
        React.useCallback(() => {
            setMemories(getMemories())
            return () => {
            }
        }, [])
    );
    //Returns the screen containing all memories a user has.
    return (
        <AppScreen>
            <FlatList
                style={styles.container}
                numColumns={1}
                data={memories}
                refreshing={refreshing}
                onRefresh={() => setMemories(getMemories())}
                keyExtractor={memory => memory.id.toString()}
                renderItem={({ item }) =>
                    <ListCollections title={item.title} image={item.image} description={item.description}
                        onSwipeLeft={() => (<Delete item={item} handleDelete={handleDelete} />)}
                        onSwipeRight={() => (<Edit item={item} handleEdit={handleEdit} navigation={navigation} />)}
                    />
                }></FlatList>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: '5%',
        width: '80%',
        marginLeft: '10%'
    }
});

export default AllMemoriesScreen;