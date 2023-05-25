import React, { useState } from 'react';
import AppScreen from '../components/AppScreen';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { View, StyleSheet, Text, Image, Button, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import AppTextInput from "../components/AppTextInput.js";
import CollectionIcon from '../components/CollectionIcon';
import AppColors from '../config/AppColors';
import DataManager from '../config/DataManager';
import NewMemoryCollectionPicker from '../components/NewMemoryCollectionPicker';

//Schema for memory creation.
const schema = Yup.object().shape({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
});

function NewMemoryScreen({ navigation }) {
    const [collection, setCollection] = useState(null)
    const [image, setImage] = useState(null);

    //Creates a new memory object.
    const newMemory = ({ title, description }) => {
        let commonData = DataManager.getInstance();
        let user = commonData.getUserId();
        const memories = commonData.getMemories(user);
        const newMemory = {
            title: title,
            userId: user,
            id: Math.max(...memories.map(memory => memory.id)) + 1,
            image: image.path,
            description: description,
            collectionId: collection.id
        }
        commonData.newMemory(newMemory);
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
    //Returns the main screen to create a new memory.
    return (
        <AppScreen>
            <Formik
                initialValues={{ title: '', description: '' }}
                onSubmit={(values, { resetForm }) => {
                    if (collection != null && image != null) {
                        setImage(null), newMemory(values), setCollection(null), resetForm(), navigation.navigate('AllMemoriesNavigator', { screen: 'AllMemoriesScreen' })
                    }
                    else {
                        if (collection == null && image == null) {
                            alert("Please select a collection and attach an image!")
                        }
                        else if (collection == null && image != null) {
                            alert("Please select a collection, or create a new collection!")
                        }
                        else if (collection != null && image == null) {
                            alert("Please attach an image!")
                        }
                    }
                }}
                validationSchema={schema}>
                {({ values, handleChange, handleSubmit, setFieldTouched, errors, touched }) => (
                    <View style={styles.container}>
                        <AppTextInput
                            placeholder="Enter Title"
                            onBlur={() => setFieldTouched("title")}
                            keyboardType="default"
                            onChangeText={handleChange("title")}
                            value={values.title}
                        />
                        {touched.title && errors.title ? (<Text style={styles.errorText}>{errors.title}</Text>) : null}
                        <AppTextInput
                            placeholder="Enter Description"
                            onBlur={() => setFieldTouched("description")}
                            keyboardType="default"
                            onChangeText={handleChange("description")}
                            value={values.description}
                        />
                        {touched.description && errors.description ? (<Text style={styles.errorText}>{errors.description}</Text>) : null}
                        <NewMemoryCollectionPicker
                            collection={collection}
                            setCollection={setCollection}
                            onCollection={item => setCollection(item)}
                            style={styles.collectionPicker}
                        />
                        <View style={styles.collectionChosen}>
                            {collection && <Text style={styles.collectionText}>{collection.title}</Text>}
                        </View>
                        <TouchableOpacity onPress={openImagePickerAsync} style={styles.image}>
                            {image == null && <CollectionIcon name="camera" size={40} iconColor={AppColors.Black} />}
                        </TouchableOpacity>
                        <View style={styles.afterImage}>
                            {image && <Image source={{ uri: image.path }} style={styles.memoryImage} />}
                            {image && <Button title="Delete Image" onPress={() => setImage(null)} color='#ff002f' />}
                        </View>
                        <Button title="Create Memory" onPress={
                            handleSubmit
                        } />
                    </View>
                )}
            </Formik>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    image: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginBottom: 0,
        marginTop: '5%'
    },
    afterImage: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: '5%',
        marginTop: 0
    },
    container: {
        width: '80%',
        marginLeft: '10%'
    },
    memoryImage: {
        height: 150,
        width: 150,
        borderRadius: 5
    },
    errorText: {
        color: 'red',
        marginBottom: '5%',
        marginTop: 0
    },
    collectionPicker: {
        marginTop: '5%'
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
});

export default NewMemoryScreen;