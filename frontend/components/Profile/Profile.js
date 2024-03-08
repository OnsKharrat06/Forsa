import React from 'react';
import { View, Text, Image, StyleSheet,ImageBackground } from 'react-native';

const Profile = () => {
    return (
        <ImageBackground
            source={require("../../assets/images/bg.png")}
            resizeMode="stretch"
            style={{ flex: 1 }}
        >
            <View style={styles.container}>
                <Image
                    source={require('../../assets/images/ons.jpg')}
                    style={styles.profileImage}
                />
                <View style={styles.userInfo}>
                    <Text style={styles.userName}>Ons</Text>
                    <Text style={styles.userBio}>Web Developer</Text>
                    <Text style={styles.userLocation}>Tunisia, Tunis</Text>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    userInfo: {
        alignItems: 'center',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    userBio: {
        fontSize: 18,
        color: 'gray',
        marginBottom: 5,
    },
    userLocation: {
        fontSize: 16,
        color: 'gray',
    },
});

export default Profile;
