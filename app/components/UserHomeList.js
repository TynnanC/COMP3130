import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

import AppColors from '../config/AppColors';

function UserHomeList({ profileImage, firstName, lastName, username, email }) {
    //Returns the list that displays the users details.
    return (
        <>
            <View style={styles.image}>
                {isFinite(profileImage) ? <Image source={profileImage} style={styles.profileImage} /> : <Image source={{ uri: profileImage }} style={styles.profileImage} />}
            </View>
            <View style={styles.main}>
                <Text style={styles.text}>Welcome {username}!</Text>
            </View>
            <View style={styles.sub}>
                <Text><Text style={styles.textEffect}>First Name:</Text> {firstName}</Text>
            </View>
            <View style={styles.sub}>
                <Text><Text style={styles.textEffect}>Last Name:</Text> {lastName}</Text>
            </View>
            <View style={styles.sub}>
                <Text><Text style={styles.textEffect}>Email:</Text> {email}</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 5,
        marginTop: '5%'
    },
    image: {
        flexDirection: "column",
        alignItems: "center",
        marginBottom: '5%'
    },
    main: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: AppColors.SecondaryDull,
        borderRadius: 20,
        marginBottom: '10%',
        padding: 10,
    },
    text: {
        fontWeight: 'bold'
    },
    sub: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: "center",
        backgroundColor: AppColors.Grey,
        borderRadius: 20,
        marginBottom: '10%',
        padding: 10,
    },
    textEffect: {
        fontWeight: 'bold'
    }
});

export default UserHomeList;