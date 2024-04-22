import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';


const Match = () => {
    return (
        <ImageBackground
            source={require("../../assets/images/bg.png")}
            resizeMode="stretch"
            style={{ flex: 1 }}
        >
            <View style={styles.container}>
                <Text>Coming soon !!</Text>
            </View>
        </ImageBackground >
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
});

export default Match;