import React, { useState } from 'react';
import { Formik } from 'formik';
import { View, StyleSheet, Text, Image, Button, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import AppScreen from '../components/AppScreen';
import AppTextInput from "../components/AppTextInput.js";
import CollectionIcon from '../components/CollectionIcon';
import AppColors from '../config/AppColors';
import DataManager from '../config/DataManager.js';
import NewMemoryCollectionPicker from '../components/NewMemoryCollectionPicker';

function EditMemoryScreen({ navigation, route }) {
    const [collection, setCollection] = useState(null)
    const [image, setImage] = useState(null);

    //Creates a memory object to replace a current one.
    const editMemory = ({ title, description }) => {
        let commonData = DataManager.getInstance();
        let user = commonData.getUserId();
        let newMemory = {
            title: title,
            userId: user,
            id: route.params.data.id,
            image: image.path,
            description: description,
            collectionId: collection.id
        }
        commonData.editMemory(newMemory);
    }
    //Handles cancelling of the memory edit.
    const handleCancel = () => {
        setImage(null);
        navigation.goBack();
    }
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
            return;
        }
        setImage({ path: pickerResult.uri });
    }
    //Returns the screen to edit a memory.
    return (
        <AppScreen>
            <Formik
                initialValues={{ title: '', description: '' }}
                onSubmit={(values, { resetForm }) => {
                    if (image != null) {
                        setImage(null), editMemory(values), resetForm(), navigation.navigate('AllMemoriesScreen')
                    }
                    else {
                        alert("Please attach an image")
                    }
                }
                }>
                {({ values, handleChange, handleSubmit, setFieldTouched }) => (
                    <View style={styles.container}>
                        <AppTextInput
                            placeholder="Enter New Title"
                            onBlur={() => setFieldTouched("title")}
                            keyboardType="default" onChangeText={handleChange("title")}
                            value={values.title}
                        />
                        <AppTextInput
                            placeholder="Enter New Description"
                            onBlur={() => setFieldTouched("description")}
                            keyboardType="default"
                            onChangeText={handleChange("description")}
                            value={values.description}
                        />
                        <NewMemoryCollectionPicker
                            collection={collection}
                            setCollection={setCollection}
                            onCollection={item => setCollection(item)}
                        />
                        <View style={styles.collectionChosen}>
                            {collection && <Text style={styles.collectionText}>{collection.title}</Text>}
                        </View>
                        <TouchableOpacity onPress={openImagePickerAsync} style={styles.image}>
                            {image == null ? (<CollectionIcon name="camera" size={40} iconColor={AppColors.Black} />) : null}
                        </TouchableOpacity>
                        <View style={styles.afterImage}>
                            {image && <Image source={{ uri: image.path }} style={styles.memoryImage} />}
                            {image && <Button title="Delete Image" onPress={() => setImage(null)} color={AppColors.Red} />}
                        </View>
                        <Button title="Edit Memory" onPress={
                            handleSubmit
                        } />
                    </View>
                )}
            </Formik>
            <View style={styles.button}>
                <Button title="Cancel" onPress={handleCancel} color={AppColors.Red} />
            </View>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    image: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginTop: '5%'
    },
    afterImage: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: '5%'
    },
    container: {
        width: '80%',
        marginLeft: '10%'
    },
    button: {
        width: '80%',
        marginLeft: '10%',
        marginTop: '5%'
    },
    memoryImage: {
        height: 150,
        width: 150
    },
    collectionChosen: {
        backgroundColor: AppColors.SecondaryDull,
        borderRadius: 20,
        marginTop: '5%'
    },
    collectionText: {
        textAlign: 'center',
        fontWeight: 'bold'
    }
})

export default EditMemoryScreen;