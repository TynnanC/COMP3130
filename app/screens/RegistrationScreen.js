import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from '@react-navigation/native';

import AppTextInput from "../components/AppTextInput.js";
import LoginAppScreen from '../components/LoginAppScreen.js';
import DataManager from '../config/DataManager.js';
import AppColors from '../config/AppColors.js';
import CollectionIcon from '../components/CollectionIcon.js';
import CancelRegistrationBottomBar from '../components/CancelRegistrationBottomBar.js';

//Retrieves all of the users in the data.
const getUsers = () => {
    let commonData = DataManager.getInstance();
    return commonData.getUsers();
}

//Schema for account registration details.
const schema = Yup.object().shape({
    username: Yup.string().required('Required'),
    password: Yup.string().required().min(4, 'Password is too short!').max(8, 'Password is too long!'),
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid Email').required('Require'),
});

//Checks if the username already exists.
const checkUsername = (users, { username }) => {
    let usernameCheck = users.filter((user) => user.username === username).length > 0
    return usernameCheck;
}

//Returns the registration screen.
function RegistrationScreen({ navigation }) {
    const [users, setUsers] = useState(getUsers());
    const [image, setImage] = useState(null);

    //Sets the users when the screen is focused.
    useFocusEffect(
        React.useCallback(() => {
            setUsers(getUsers())
            return () => {
            }
        }, [])
    )

    //Creates a new user object.
    const newUser = (values) => {
        let commonData = DataManager.getInstance();
        let users = commonData.getUsers();
        const newUser = {
            userId: users.length + 1,
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.username,
            email: values.email,
            password: values.password,
            profileImage: image.path,
        }
        commonData.newUser(newUser);
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
    return (
        <LoginAppScreen style={styles.container}>
            <KeyboardAwareScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Formik
                        initialValues={{ username: '', password: '', firstName: '', lastName: '', email: '', password: '' }}
                        onSubmit={(values, { resetForm }) => {
                            if (image == null) {
                                alert("Must select a profile image!")
                            }
                            else if (checkUsername(users, values) == true) {
                                alert("That Username is already taken!")
                                resetForm()
                                setImage(null)
                            }
                            else {
                                newUser(values),
                                    resetForm(),
                                    alert("Successful account creation, you can now log in!")
                                navigation.navigate('LoginScreen')
                            }
                        }}
                        validationSchema={schema}>
                        {({ values, handleChange, handleSubmit, setFieldTouched, touched, errors }) => (
                            <View style={styles.form}>
                                <AppTextInput
                                    placeholder="First Name"
                                    onBlur={() => setFieldTouched("firstName")}
                                    keyboardType="default"
                                    onChangeText={handleChange("firstName")}
                                    value={values.firstName}
                                />
                                {touched.firstName && errors.firstName ? (<Text style={styles.errorText}>{errors.firstName}</Text>) : null}
                                <AppTextInput
                                    placeholder="Last Name"
                                    onBlur={() => setFieldTouched("lastName")}
                                    keyboardType="default"
                                    onChangeText={handleChange("lastName")}
                                    value={values.lastName}
                                />
                                {touched.lastName && errors.lastName ? (<Text style={styles.errorText}>{errors.lastName}</Text>) : null}
                                <AppTextInput
                                    placeholder="Email"
                                    onBlur={() => setFieldTouched("email")}
                                    keyboardType="email-address"
                                    onChangeText={handleChange("email")}
                                    value={values.email}
                                />
                                {touched.email && errors.email ? (<Text style={styles.errorText}>{errors.email}</Text>) : null}
                                <AppTextInput
                                    placeholder="Username"
                                    onBlur={() => setFieldTouched("username")}
                                    keyboardType="default"
                                    onChangeText={handleChange("username")}
                                    value={values.username}
                                />
                                {touched.username && errors.username ? (<Text style={styles.errorText}>{errors.username}</Text>) : null}
                                <AppTextInput
                                    placeholder="Password"
                                    onBlur={() => setFieldTouched("password")}
                                    secureTextEntry={true}
                                    onChangeText={handleChange("password")}
                                    value={values.password}
                                />
                                {touched.password && errors.password ? (<Text style={styles.errorText}>{errors.password}</Text>) : null}
                                <TouchableOpacity onPress={openImagePickerAsync} style={styles.image}>
                                    {image == null && <CollectionIcon name="camera" size={40} iconColor={AppColors.Black} />}
                                </TouchableOpacity>
                                <View style={styles.afterImage}>
                                    {image && <Image source={{ uri: image.path }} style={styles.profile} />}
                                    {image && <Button title="Delete Image" onPress={() => setImage(null)} color='#ff002f' />}
                                </View>
                                <Button title="Create Account" onPress={handleSubmit} />
                            </View>
                        )}
                    </Formik>
                </TouchableWithoutFeedback>
                <CancelRegistrationBottomBar onPress={() => navigation.navigate("LoginScreen")} />
            </KeyboardAwareScrollView>
        </LoginAppScreen>
    );
}

const styles = StyleSheet.create({
    form: {
        flex: 4,
        padding: '10%',
        marginBottom: 0,
    },

    container: {
        backgroundColor: AppColors.White,
        flexDirection: 'column',
        flex: 1,
    },
    name: {
        backgroundColor: AppColors.PrimaryColor,
        width: '30%',
        textAlign: 'center',
        borderRadius: 5,
        fontSize: 20,
        textAlignVertical: 'center'
    },
    image: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginTop: '5%',
        marginBottom: 0
    },
    afterImage: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: '5%',
    },
    errorText: {
        color: 'red'
    },
    profile: {
        borderRadius: 5,
        height: 150,
        width: 150,
    }
});

export default RegistrationScreen;