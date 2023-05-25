import React, { useState } from 'react';
import { StyleSheet, Text, Keyboard, View, Button, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFocusEffect } from '@react-navigation/native';

import RegisterBottomBar from '../components/RegisterBottomBar.js';
import AppTextInput from "../components/AppTextInput.js";
import LoginAppScreen from '../components/LoginAppScreen.js';
import DataManager from '../config/DataManager.js';
import AppColors from '../config/AppColors.js';

//Schema for login credentials.
const schema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required().min(4).max(8),
});

//Checks if the user exists in the data.
const validateUser = (users, { username, password }) => {
    let userExists = users.filter((user) => user.username === username && user.password === password).length > 0
    return userExists;
};

//Creates an instance of the DataManager, allows the user to use DataManager functions.
const createUser = (users, { username }) => {
    let commonData = DataManager.getInstance();
    let userId = getUser(users, { username }).userId;
    commonData.setUserId(userId);
}

//Returns the user object containing a specific username.
const getUser = (users, { username }) => {
    return users.find((user) => user.username == username);
}

//Returns all users in the data.
const getUsers = () => {
    let commonData = DataManager.getInstance();
    return commonData.getUsers();
}

//Returns the login screen.
function LoginScreen({ navigation }) {
    //Returns a list of all users.
    const [users, setUsers] = useState(getUsers())
    //When the screen is focused, retrieve all users.
    useFocusEffect(
        React.useCallback(() => {
            setUsers(getUsers())
            return () => { }
        }, [])
    );
    return (
        <LoginAppScreen style={styles.container}>
            <KeyboardAwareScrollView enableOnAndroid={true}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <View style={styles.top}>
                            <Text style={styles.name}>Memorise</Text>
                        </View>
                        <Formik
                            initialValues={{ username: '', password: '', }}
                            onSubmit={(values, { resetForm }) => {
                                if (validateUser(users, values)) {
                                    createUser(users, values);
                                    resetForm();
                                    navigation.navigate("TabNavigation", { screen: 'AccountPage', params: getUser(users, values) });
                                }
                                else {
                                    resetForm();
                                    alert("Invalid credentials!");
                                }
                            }}
                            validationSchema={schema}
                        >
                            {({ values, handleChange, handleSubmit, setFieldTouched, touched, errors }) => (
                                <View style={styles.form}>
                                    <AppTextInput placeholder="Username"
                                        onBlur={() => setFieldTouched("username")}
                                        keyboardType="default"
                                        onChangeText={handleChange("username")}
                                        value={values.username}
                                    />
                                    <AppTextInput
                                        placeholder="Password"
                                        onBlur={() => setFieldTouched("password")}
                                        secureTextEntry={true}
                                        onChangeText={handleChange("password")}
                                        value={values.password}
                                    />
                                    {touched.password && errors.password ? (<Text style={styles.errorText}>{errors.password}</Text>) : null}
                                    <View style={styles.loginButton}>
                                        <Button title="Log in" onPress={handleSubmit} />
                                    </View>
                                </View>
                            )}
                        </Formik>
                        <View>
                            <RegisterBottomBar onPress={() => navigation.navigate("RegistrationScreen")} style={styles.bottomButton} />
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>
        </LoginAppScreen >
    );
}

const styles = StyleSheet.create({
    form: {
        flex: 4,
        marginBottom: '5%',
        marginTop: 0,
        width: '80%',
        marginLeft: '10%'
    },
    container: {
        backgroundColor: AppColors.White,
        flexDirection: 'column',
        flex: 1
    },
    name: {
        backgroundColor: AppColors.PrimaryColor,
        width: '50%',
        textAlign: 'center',
        borderRadius: 5,
        fontSize: 30,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlignVertical: 'center'
    },
    top: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 0
    },
    errorText: {
        color: AppColors.Red,
        fontSize: 15
    },
    loginButton: {
        marginTop: '5%',
        marginBottom: 0
    },
    bottomButton: {
        width: '80%',
        marginLeft: '10%',
    }
});

export default LoginScreen;