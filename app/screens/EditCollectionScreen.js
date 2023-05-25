import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { View, StyleSheet, Image, Button, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import AppScreen from '../components/AppScreen';
import AppTextInput from "../components/AppTextInput.js";
import CollectionIcon from '../components/CollectionIcon';
import AppColors from '../config/AppColors';
import DataManager from '../config/DataManager';

//Schema for editing a collection.
const schema = Yup.object().shape({
    title: Yup.string().required('Please name your collection!')
});
function EditCollectionScreen({ navigation, route }) {
    const [image, setImage] = useState(null);

    //Creates a new collection.
    const newCollection = ({ title }) => {
        let commonData = DataManager.getInstance();
        let user = commonData.getUserId();
        const collections = commonData.getCollections(user);
        const newCollection = {
            title: title,
            userId: user,
            id: route.params.data.id,
            image: image.path,
        }
        commonData.editCollection(newCollection);
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

    //Handles cancelling.
    const handleCancel = () => {
        setImage(null)
        navigation.goBack();
    }
    return (
        <AppScreen>
            <Formik
                initialValues={{ title: '' }}
                onSubmit={(values, { resetForm }) => {
                    if (image != null) {
                        setImage(null), newCollection(values), resetForm(), navigation.navigate('CollectionsPage')
                    }
                    else {
                        alert("Please attach a collection picture!")
                    }
                }}
                validationSchema={schema}
            >
                {({ values, handleChange, handleSubmit, setFieldTouched, touched, errors }) => (
                    <View style={styles.container}>
                        <AppTextInput
                            placeholder="Enter new title"
                            onBlur={() => setFieldTouched("title")}
                            keyboardType="default"
                            onChangeText={handleChange("title")}
                            value={values.title}
                        />
                        {touched.title && errors.title ? (<Text style={styles.errorText}>{errors.title}</Text>) : null}
                        <TouchableOpacity onPress={openImagePickerAsync} style={styles.image}>
                            {image == null ? (<CollectionIcon name="camera" size={40} iconColor={AppColors.Black} />) : null}
                        </TouchableOpacity>
                        <View style={styles.afterImage}>
                            {image && <Image source={{ uri: image.path }} style={styles.collectionImage} />}
                            {image && <Button title="Delete Image" onPress={() => setImage(null)} color={AppColors.Red} />}
                        </View>
                        <Button title="Update Collection" onPress={
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
    errorText: {
        color: 'red'
    },
    afterImage: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: '5%'
    },
    collectionImage: {
        height: 150,
        width: 150,
        borderRadius: 5
    },
    container: {
        width: '80%',
        marginLeft: '10%'
    },
    button: {
        width: '80%',
        marginLeft: '10%',
        marginTop: '5%',
    }
})

export default EditCollectionScreen;