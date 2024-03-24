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
            <ImageBackground source={require('../../assets/images/profilebg.png')} style={styles.header} />
                <Image
                    source={require('../../assets/images/ons.jpg')}
                    style={styles.profileImage}
                />
                <View style={styles.userInfo}>
                    <Text style={styles.userName}>Ons</Text>
                    <Text style={styles.userBio}>Web Developer</Text>
                    <Text style={styles.userLocation}>Tunisia, Tunis</Text>
                    <Text style={styles.userBio}>I am a web developer with strong problem solving skills and proven experience in creating and developing a web based application. I'm currently learning to develop a mobile application using React Native.</Text>
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
    header:{
        height:200,
        resizeMode: "cover",
      },
    profileImage: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:130
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
