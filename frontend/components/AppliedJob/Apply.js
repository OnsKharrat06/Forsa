import React from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground } from 'react-native';


const Apply = () => {
    return (
        <ImageBackground
            source={require("../../assets/images/bg.png")}
            resizeMode="stretch"
            style={{ flex: 1 }}
        >
            <View style={styles.container}>
                <Text>Applied Jobs</Text>
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

export default Apply;