import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants';

const Profile = ({ navigation }) => {
    return (
        <ImageBackground
            source={require("../../assets/images/bg.png")}
            resizeMode="stretch"
            style={{ flex: 1 }}
        >
            <ScrollView>
                <View style={styles.container}>
                    <Image
                        source={require('../../assets/images/ons.jpg')}
                        style={styles.profileImage}
                    />
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>Ons</Text>
                        <Text style={styles.userBio}>Web Developer</Text>
                        <Text style={styles.userLocation}>Tunisia, Tunis</Text>
                        <Text style={styles.userBio}>I am a web developer with strong problem-solving skills and proven experience in creating and developing a web-based application. I'm currently learning to develop a mobile application using React Native.</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('CreateCV')}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Create CV</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    profileImage: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 3,
        borderColor: 'white',
        marginBottom: 10,
        alignSelf: 'center',
        marginTop: 30
    },
    userInfo: {
        flex: 2 / 3,
        alignItems: 'center',
        padding: 20,
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
        textAlign: 'center',
    },
    userLocation: {
        fontSize: 16,
        color: 'gray',
    },
    button: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 45,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    buttonText: {
        color: COLORS.tertiary,
        textAlign: 'center',
    },
});

export default Profile;
