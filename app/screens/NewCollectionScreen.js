import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { View, StyleSheet, Image, Button, Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from '@react-navigation/native';

import AppScreen from '../components/AppScreen';
import AppTextInput from "../components/AppTextInput.js";
import CollectionIcon from '../components/CollectionIcon';
import AppColors from '../config/AppColors';
import DataManager from '../config/DataManager';

//Schema for creating a collection
const schema = Yup.object().shape({
    title: Yup.string().required('Please name your collection!')
});

function NewCollectionScreen({ navigation }) {
    const [image, setImage] = useState(null);
    //Sets the image to null when the screen is focused.
    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setImage(null)
            }
        }, [])
    );
    let commonData = DataManager.getInstance();
    let user = commonData.getUserId();
    const collections = commonData.getAllCollections();

    //New collection data structure.
    const newCollection = ({ title }) => {
        const newCollection = {
            title: title,
            userId: user,
            id: collections.length + 1,
            image: image.path,
        }
        commonData.newCollection(newCollection);
    }

    //Image picker
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

    //Returns the screen to create a new collection
    return (
        <AppScreen>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Formik
                    initialValues={{ title: '' }}
                    onSubmit={(values, { resetForm }) => {
                        if (image != null) {
                            setImage(null), newCollection(values), resetForm(),
                                navigation.navigate('CollectionsNavigator', {
                                    screen: 'CollectionsPage'
                                })
                        }
                        else {
                            alert("Please attach a collection picture!")
                        }
                    }}
                    validationSchema={schema}>
                    {({ values, handleChange, handleSubmit, setFieldTouched, touched, errors }) => (
                        <View style={styles.container}>
                            <AppTextInput
                                placeholder="Enter Collection Name"
                                onBlur={() => setFieldTouched("title")}
                                keyboardType="default"
                                onChangeText={handleChange("title")}
                                value={values.title}
                            />
                            {touched.title && errors.title ? (<Text style={styles.errorText}>{errors.title}</Text>) : null}
                            <TouchableOpacity onPress={openImagePickerAsync} style={styles.image}>
                                {image == null && <CollectionIcon name="camera" size={40} iconColor={AppColors.Black} />}
                            </TouchableOpacity>
                            <View style={styles.afterImage}>
                                {image && <Image source={{ uri: image.path }} style={styles.collectionImage} />}
                                {image && <Button title="Delete Image" onPress={() => setImage(null)} color='#ff002f' />}
                            </View>
                            <Button title="Create Collection" onPress={
                                handleSubmit
                            } />
                        </View>
                    )}
                </Formik>
            </TouchableWithoutFeedback>
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
    collectionImage: {
        height: 150,
        width: 150,
        borderRadius: 5
    },
    afterImage: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: '5%',
    },
    errorText: {
        color: 'red',
        marginBottom: '5%'
    },
    container: {
        width: '80%',
        marginLeft: '10%',
        marginTop: '5%'
    }
})

export default NewCollectionScreen;